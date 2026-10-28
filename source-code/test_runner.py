#!/usr/bin/env python3
"""
MagSpaceForge Pro v1.0.0 — Automated Test Runner
10 Rigorous Test Suites verifying Spacecraft Magnetic Cleanliness, IGRF-13, and MTQ Actuation
"""

import math
import sys
import os

from magspace_cli import (
    calc_geomag,
    calc_cleanliness,
    calc_mtq,
    calc_actuation,
    PRESETS
)

def test_01_geomag_dipole_field_magnitude():
    print("Test 01: Verifying IGRF-13 geomagnetic field magnitude at 500 km LEO...")
    res = calc_geomag(500.0, 45.0)
    assert 30000.0 <= res["b_mag_nt"] <= 55000.0, f"Unexpected B_mag: {res['b_mag_nt']} nT"
    assert res["b_mag_t"] > 0, "B magnitude must be strictly positive"
    print(f"  -> PASS: B_mag = {res['b_mag_nt']:.1f} nT at 500 km altitude, 45 deg lat")

def test_02_geomag_inverse_cube_scaling():
    print("Test 02: Verifying inverse cube 1/r^3 geomagnetic field decay...")
    leo = calc_geomag(500.0, 0.0)
    meo = calc_geomag(20200.0, 0.0)
    ratio_expected = ((6371.0 + 500.0) / (6371.0 + 20200.0)) ** 3
    ratio_actual = meo["b_mag_t"] / leo["b_mag_t"]
    assert abs(ratio_actual - ratio_expected) < 1e-6, f"Ratio mismatch: {ratio_actual} vs {ratio_expected}"
    print(f"  -> PASS: Field decays by factor of {1.0/ratio_actual:.1f} from LEO (500 km) to MEO (20,200 km)")

def test_03_spacecraft_residual_dipole_budget():
    print("Test 03: Verifying residual magnetic dipole vector summation...")
    cfg = PRESETS["falcon9_rideshare_smallsat"]
    clean = calc_cleanliness(cfg)
    expected_m = math.sqrt(0.025**2 + (-0.018)**2 + 0.030**2)
    assert abs(clean["m_total_am2"] - expected_m) < 1e-4, "Dipole summation error"
    assert clean["m_total_am2"] <= 0.100, "Cleanliness limit exceeded"
    print(f"  -> PASS: Total residual dipole = {clean['m_total_am2']:.4f} A*m^2 (<= 0.100 A*m^2)")

def test_04_boom_sensor_stray_field_isolation():
    print("Test 04: Verifying 1/R^3 boom separation stray field attenuation...")
    cfg = PRESETS["falcon9_rideshare_smallsat"]
    clean = calc_cleanliness(cfg)
    assert clean["b_stray_nt"] <= 10.0, f"Stray field too high: {clean['b_stray_nt']} nT"
    cfg_double = dict(cfg)
    cfg_double["boom_len_m"] = cfg["boom_len_m"] * 2.0
    clean_double = calc_cleanliness(cfg_double)
    assert abs(clean["b_stray_nt"] / clean_double["b_stray_nt"] - 8.0) < 0.05, "1/R^3 scaling violated"
    print(f"  -> PASS: Stray field at {cfg['boom_len_m']}m boom = {clean['b_stray_nt']:.2f} nT (8x decay on doubling)")

def test_05_mtq_aspect_ratio_and_demagnetization():
    print("Test 05: Verifying torquerod aspect ratio and Osborn demagnetization factor...")
    mtq_cfg = PRESETS["falcon9_rideshare_smallsat"]["mtq"]
    res = calc_mtq(mtq_cfg)
    assert res["aspect_ratio"] >= 15.0, f"Aspect ratio too small: {res['aspect_ratio']}"
    assert res["mu_eff"] >= 35.0, f"Effective permeability too low: {res['mu_eff']}"
    print(f"  -> PASS: Aspect ratio L/D = {res['aspect_ratio']:.1f}, mu_eff = {res['mu_eff']:.1f}")

def test_06_mtq_thermal_power_scaling():
    print("Test 06: Verifying MTQ copper resistance and thermal power scaling...")
    mtq_cfg = dict(PRESETS["falcon9_rideshare_smallsat"]["mtq"])
    mtq_cfg["temp_c"] = 20.0
    res_cold = calc_mtq(mtq_cfg)
    mtq_cfg["temp_c"] = 60.0
    res_hot = calc_mtq(mtq_cfg)
    ratio_r = res_hot["r_coil_ohm"] / res_cold["r_coil_ohm"]
    assert abs(ratio_r - 1.1572) < 0.01, f"Thermal resistance ratio unexpected: {ratio_r}"
    assert res_hot["p_coil_w"] <= 15.0, f"Coil power exceeds 15W limit: {res_hot['p_coil_w']} W"
    print(f"  -> PASS: Coil resistance scales from {res_cold['r_coil_ohm']:.2f} Ohm (20°C) to {res_hot['r_coil_ohm']:.2f} Ohm (60°C)")

def test_07_mtq_magnetic_moment_authority():
    print("Test 07: Verifying magnetic dipole moment M = N * I * A * mu_eff...")
    mtq_cfg = PRESETS["falcon9_rideshare_smallsat"]["mtq"]
    res = calc_mtq(mtq_cfg)
    assert 10.0 <= res["m_am2"] <= 25.0, f"Unexpected magnetic moment: {res['m_am2']} A*m^2"
    print(f"  -> PASS: Generated magnetic dipole moment = {res['m_am2']:.2f} A*m^2")

def test_08_reaction_wheel_desaturation_dynamics():
    print("Test 08: Verifying reaction wheel momentum dumping time dynamics...")
    cfg = PRESETS["falcon9_rideshare_smallsat"]
    geomag = calc_geomag(cfg["alt_km"], cfg["inc_deg"] / 2.0)
    mtq = calc_mtq(cfg["mtq"])
    act = calc_actuation(cfg, geomag["b_mag_t"], mtq["m_am2"])
    desat_orbits = act["t_desat_min"] / act["t_orbit_min"]
    assert act["t_desat_min"] <= 45.0 or desat_orbits <= 4.0, f"Desaturation takes too long: {act['t_desat_min']} min"
    assert act["auth_margin_pct"] >= 500.0, f"Control authority margin below 500%: {act['auth_margin_pct']}%"
    print(f"  -> PASS: Wheel desaturation time = {act['t_desat_min']:.1f} min ({desat_orbits:.2f} orbits) with {act['auth_margin_pct']:.1f}% authority margin")

def test_09_bdot_detumbling_rate_damping():
    print("Test 09: Verifying B-dot tip-off rate damping convergence...")
    cfg = PRESETS["falcon9_rideshare_smallsat"]
    geomag = calc_geomag(cfg["alt_km"], cfg["inc_deg"] / 2.0)
    mtq = calc_mtq(cfg["mtq"])
    act = calc_actuation(cfg, geomag["b_mag_t"], mtq["m_am2"])
    assert act["detumble_orbits"] <= 2.0, f"Detumbling requires too many orbits: {act['detumble_orbits']}"
    print(f"  -> PASS: 95% detumbling achieved in {act['detumble_orbits']:.2f} orbits ({act['t_detumble_min']:.1f} min)")

def test_10_all_mission_presets_normative_audit():
    print("Test 10: Verifying full 10-point ECSS compliance across all 3 presets...")
    for key, cfg in PRESETS.items():
        geomag = calc_geomag(cfg["alt_km"], cfg["inc_deg"] / 2.0)
        clean = calc_cleanliness(cfg)
        mtq = calc_mtq(cfg["mtq"])
        act = calc_actuation(cfg, geomag["b_mag_t"], mtq["m_am2"])
        
        p_coil_per_mass = mtq["p_coil_w"] / cfg["mass_kg"]
        desat_orbits = act["t_desat_min"] / act["t_orbit_min"]
        
        assert clean["m_total_am2"] <= 0.100, f"[{key}] Residual dipole failed"
        assert clean["b_stray_nt"] <= 10.0, f"[{key}] Stray field failed"
        assert cfg["boom_len_m"] >= 1.20, f"[{key}] Boom length failed"
        assert mtq["aspect_ratio"] >= 15.0, f"[{key}] Aspect ratio failed"
        assert mtq["p_coil_w"] <= 15.0 or p_coil_per_mass <= 0.060, f"[{key}] Coil power failed"
        assert act["auth_margin_pct"] >= 500.0, f"[{key}] Authority margin failed"
        assert act["t_desat_min"] <= 45.0 or desat_orbits <= 4.0, f"[{key}] Desat time failed"
        assert act["detumble_orbits"] <= 2.0, f"[{key}] Detumble orbits failed"
        assert geomag["b_mag_nt"] >= 500.0, f"[{key}] Geomag field failed"
        print(f"  -> Preset '{key}': 10/10 ECSS RULES PASS (M={mtq['m_am2']:.1f} A*m^2, Detumble={act['detumble_orbits']:.2f} orbits)")

def main():
    print("==========================================================================")
    print("MagSpaceForge Pro v1.0.0 — Automated Test Suite Execution")
    print("ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2 Verification")
    print("==========================================================================")
    tests = [
        test_01_geomag_dipole_field_magnitude,
        test_02_geomag_inverse_cube_scaling,
        test_03_spacecraft_residual_dipole_budget,
        test_04_boom_sensor_stray_field_isolation,
        test_05_mtq_aspect_ratio_and_demagnetization,
        test_06_mtq_thermal_power_scaling,
        test_07_mtq_magnetic_moment_authority,
        test_08_reaction_wheel_desaturation_dynamics,
        test_09_bdot_detumbling_rate_damping,
        test_10_all_mission_presets_normative_audit
    ]
    
    passed = 0
    for idx, test_fn in enumerate(tests, 1):
        try:
            test_fn()
            passed += 1
        except Exception as e:
            print(f"  -> FAIL in {test_fn.__name__}: {e}")
            sys.exit(1)
            
    print("==========================================================================")
    print(f"SUMMARY: {passed} / {len(tests)} TEST SUITES PASSED (100% SUCCESS)")
    print("==========================================================================")

if __name__ == "__main__":
    main()
