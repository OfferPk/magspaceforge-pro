

`MAG`

# 

MagSpaceForge Pro

`v1.0.0` `ECSS-E-ST-60-30C & 20-07C Rev.2`  
Spacecraft Magnetic Cleanliness, IGRF-13 Geomagnetic Field & Magnetic Torquer (MTQ) Attitude Actuation Studio  
MISSION PRESET: Falcon 9 Rideshare ESPA SmallSat (500 km SSO, 180 kg) LEO Broadband Mega-Constellation Bus (1,150 km Walker, 450 kg) MEO Navigation & Geodesy Platform (20,200 km, 2,200 kg) Inject MAG-03 Stray Overdipole Reset Spacecraft Export ECSS XML

`Magnetic cleanliness nominal. DISMISS`

`Residual Dipole M_res`

`0.0430 A·m²`

`ECSS Limit: ≤ 0.100 A·m²`

`Boom Sensor Stray Field`

`1.91 nT`

`Boom Length: 1.65 m (≤ 10.0 nT)`

`MTQ Magnetic Moment`

`11.16 A·m²`

`Power: 5.74 W (μ_eff = 48.4)`

`B-Dot Detumbling Rate`

`0.48 Orbits`

`RW Desat: 34.5 min (≤ 45m)`

`ECSS-E-ST-60-30C Audit`

`10 / 10 PASS`

`ECSS CLEANROOM CERTIFIED`

## 

`1. Mission & MTQ Actuator Specs`

`ECSS-60-30C / 20-07C`

---

Orbit Altitude (km) `500 km`

Spacecraft Dry Mass (kg) `180 kg`

Magnetometer Boom Length (m) `1.65 m`

LV Tip-Off Rate ω\_0 (deg/s) `8.5 deg/s`

Reaction Wheel Momentum H\_rw (N·m·s) `0.60 Nms`

Torquerod Core Length (m) `0.32 m`

Torquerod Core Diameter (mm) `16.0 mm`

Coil Turns N (Copper Wire) `2400 turns`

Coil Operating Temp (°C) `35.0 °C`

## 

`2. Orbital B-Dot Kinetic Rate Damping & MTQ Actuation Waveform`

Real-time simulation of tip-off rate dissipation ω(t), commanded MTQ dipole moment M(t), and reaction wheel desaturation relief  
`Tip-off Rate ω(t) (°/s) Commanded Dipole M (A·m²) RW Desat Relief (%)`  
---

`GEOMAGNETIC ENVIRONMENT`  
`Orbit Altitude:500.0 km`  
`Field Magnitude |B|:39,326.7 nT`  
`Radial / Tangential:-28.5 / 27.1 μT`  
`Orbit Period:94.5 min`

`TORQUEROD COIL (ECSS-60-30C)`  
`Aspect Ratio L/D:20.0 (Nd = 0.0206)`  
`Effective Permeability:48.4 μ_eff`  
`Coil Resistance:25.10 Ω @ 35°C`  
`Coil Electrical Power:5.74 W (0.478 A)`

`ATTITUDE ACTUATION & DESAT`  
`Max Magnetic Torque:438.9 μN·m`  
`Disturbance Torque:1.69 μN·m`  
`Control Authority Margin:+25,859.0%`  
`RW Desaturation Time:34.5 min (0.36 orb)`

## 

`3. Spacecraft Magnetic Cleanliness & Subsystem Component Dipole Matrix`

ECSS-E-ST-20-07C Rev. 2 component-level dipole allocation, Mu-metal shielding verification, and stray field decay along deployable boom  
`CLEANROOM COMPLIANT: M_res ≤ 0.100 A·m²`

---

| `Component ID` | `Subsystem Hardware` | `Subsystem` | `Dipole (A·m²)` | `Distance to Boom (m)` | `Stray at Sensor (nT)` | `Mu-Metal Shielding` | `Cleanliness State` | `Action`   |
| :---- | :---- | :---- | ----: | ----: | ----: | :---- | :---- | ----- |

## 

`4. 10-Point ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2 Normative Auditor`

Automated verification across residual dipole limits, boom sensor stray field, torquerod core permeability, MTQ thermal power, and B-dot detumbling  
`10 / 10 RULES VERIFIED (100%)`

---

| `Rule ID` | `ECSS Clause` | `Verification Requirement` | `Measured Telemetry` | `Verdict`   |
| :---- | :---- | :---- | :---- | ----- |

### 

`ECSS-E-ST-60-30C Magnetic Cleanliness & MTQ Manifest (XML Export)`

Copy XML Close

---

