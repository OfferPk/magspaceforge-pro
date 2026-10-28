/**
 * MagSpaceForge Pro v1.0.0 — ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2
 * 10-Point Normative Spacecraft Magnetic Cleanliness & Attitude Control Auditor
 */

import {
  calculateGeomagneticField,
  calculateMagneticCleanliness,
  calculateMTQCoilPhysics,
  calculateAttitudeActuation
} from "./magspace-engine.js";

/**
 * Executes 10-point normative compliance audit
 * @param {object} config Spacecraft mission configuration
 * @returns {object} Audit results with rule-by-rule verdicts and overall score
 */
export function auditMagneticCompliance(config) {
  const geomag = calculateGeomagneticField(config.orbitAltitudeKm, config.orbitInclinationDeg / 2.0);
  const cleanliness = calculateMagneticCleanliness(config);
  const mtqPhysics = calculateMTQCoilPhysics(config.mtqSpecs);
  const actuation = calculateAttitudeActuation(config, geomag, mtqPhysics);

  const totalDipole = cleanliness.residualDipoleAm2.total;
  const bStray = cleanliness.bStraySensorNanotesla;
  const rBoom = cleanliness.magnetometerBoomLengthM;
  const aspectRatio = mtqPhysics.aspectRatio;
  const pCoil = mtqPhysics.coilPowerW;
  const pCoilPerMass = pCoil / Math.max(1.0, config.spacecraftMassKg);
  const authMargin = actuation.controlAuthorityMarginPct;
  const desatMin = actuation.desaturationTimeMin;
  const desatOrbits = desatMin / actuation.orbitPeriodMin;
  const detumbleOrbits = actuation.detumbleOrbits;
  const bMagNt = geomag.bMagnitudeNanotesla;

  // Unshielded components distance check
  const unshieldedNear = cleanliness.componentReports.filter(
    (c) => !c.shielded && c.distanceToSensorM < 1.5
  );

  const rules = [
    {
      id: "ECSS-MAG-01",
      standard: "ECSS-E-ST-20-07C Cl. 5.3",
      title: "Spacecraft Residual Magnetic Dipole Limit",
      criterion: "Total residual dipole magnitude M_res <= 0.100 A*m^2",
      measured: `M_res = ${totalDipole.toFixed(4)} A*m^2`,
      passed: totalDipole <= 0.100
    },
    {
      id: "ECSS-MAG-02",
      standard: "ECSS-E-ST-20-07C Cl. 5.3.4",
      title: "Magnetometer Sensor Stray Field Isolation",
      criterion: "Stray magnetic field at boom sensor B_stray <= 10.0 nT",
      measured: `B_stray = ${bStray.toFixed(2)} nT`,
      passed: bStray <= 10.0
    },
    {
      id: "ECSS-MAG-03",
      standard: "NASA-HDBK-4008 Cl. 4.2",
      title: "Magnetometer Boom Separation Geometry",
      criterion: "Deployable boom length R_boom >= 1.20 m",
      measured: `R_boom = ${rBoom.toFixed(2)} m`,
      passed: rBoom >= 1.20
    },
    {
      id: "ECSS-MAG-04",
      standard: "ECSS-E-ST-60-30C Cl. 6.3.1",
      title: "Torquerod Aspect Ratio & Core Permeability",
      criterion: "Core aspect ratio L/D >= 15.0 (mu_eff >= 35.0)",
      measured: `L/D = ${aspectRatio.toFixed(1)}, mu_eff = ${mtqPhysics.effectivePermeabilityMuEff}`,
      passed: aspectRatio >= 15.0 && mtqPhysics.effectivePermeabilityMuEff >= 35.0
    },
    {
      id: "ECSS-MAG-05",
      standard: "ECSS-E-ST-60-30C Cl. 6.3.3",
      title: "MTQ Coil Thermal & Power Dissipation",
      criterion: "Steady-state power P_coil <= 15.0 W (SmallSat) or P_coil/Mass <= 0.06 W/kg",
      measured: `P_coil = ${pCoil.toFixed(2)} W (${pCoilPerMass.toFixed(3)} W/kg)`,
      passed: pCoil <= 15.0 || pCoilPerMass <= 0.060
    },
    {
      id: "ECSS-MAG-06",
      standard: "ECSS-E-ST-60-30C Cl. 6.4.2",
      title: "MTQ Control Authority over Disturbance Torques",
      criterion: "Control authority margin >= 500% (Torque_actuator >= 5x Torque_dist)",
      measured: `Margin = ${authMargin.toFixed(1)}% (Tau_max = ${(actuation.maxMagneticTorqueNm * 1e6).toFixed(1)} uNm)`,
      passed: authMargin >= 500.0
    },
    {
      id: "ECSS-MAG-07",
      standard: "ECSS-E-ST-60-30C Cl. 6.4.4",
      title: "Reaction Wheel Momentum Desaturation Time",
      criterion: "Wheel momentum dumping time T_desat <= 45.0 min (or <= 4.0 orbits in MEO)",
      measured: `T_desat = ${desatMin.toFixed(1)} min (${desatOrbits.toFixed(2)} orbits)`,
      passed: desatMin <= 45.0 || desatOrbits <= 4.0
    },
    {
      id: "ECSS-MAG-08",
      standard: "ECSS-E-ST-60-30C Cl. 6.5.1",
      title: "B-Dot Rate Detumbling Convergence",
      criterion: "95% kinetic tip-off damping achieved in <= 2.0 orbits",
      measured: `T_detumble = ${detumbleOrbits.toFixed(2)} orbits (${(actuation.detumbleTimeSec / 60.0).toFixed(1)} min)`,
      passed: detumbleOrbits <= 2.00
    },
    {
      id: "ECSS-MAG-09",
      standard: "ECSS-E-ST-60-30C Cl. 5.2",
      title: "Geomagnetic Orbit Field Accessibility",
      criterion: "Orbit magnetic field magnitude B_mag >= 500.0 nT",
      measured: `B_mag = ${bMagNt.toFixed(1)} nT @ ${config.orbitAltitudeKm} km`,
      passed: bMagNt >= 500.0
    },
    {
      id: "ECSS-MAG-10",
      standard: "ECSS-E-ST-20-07C Cl. 5.4.1",
      title: "Unshielded Magnetic Component Clearance",
      criterion: "All unshielded components separated >= 1.50 m from sensor",
      measured: unshieldedNear.length === 0
        ? "All unshielded components >= 1.50 m distance"
        : `${unshieldedNear.length} unshielded component(s) < 1.50 m`,
      passed: unshieldedNear.length === 0
    }
  ];

  const passCount = rules.filter((r) => r.passed).length;
  const allPassed = passCount === rules.length;

  return {
    timestamp: new Date().toISOString(),
    standardReference: "ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2",
    missionName: config.name,
    rulesChecked: rules.length,
    rulesPassed: passCount,
    compliancePercentage: (passCount / rules.length) * 100.0,
    overallVerdict: allPassed ? "ECSS_MAGNETIC_CLEAN_PASS" : "NON_COMPLIANT_WARNING",
    rules,
    telemetrySummary: {
      totalDipoleAm2: totalDipole,
      bStraySensorNanotesla: bStray,
      mtqMomentAm2: mtqPhysics.magneticMomentAm2,
      mtqPowerW: pCoil,
      desaturationTimeMin: desatMin,
      detumbleOrbits,
      geomagFieldNanotesla: bMagNt
    }
  };
}
