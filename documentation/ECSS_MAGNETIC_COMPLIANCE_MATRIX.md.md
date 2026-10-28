# ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2 Compliance Verification Matrix

| Rule ID | Regulatory Standard | Verification Clause | Normative Requirement | Algorithmic Implementation | Default Verification Value | Verdict |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ECSS-MAG-01** | ECSS-E-ST-20-07C Rev. 2 | Clause 5.3 | Spacecraft Residual Magnetic Dipole Limit | \$M\_{res} \= \\sqrt{M\_x^2 \+ M\_y^2 \+ M\_z^2} \\le 0.100\\text{ A}\\cdot\\text{m}^2\$ | 0.0430 A·m² | **PASS** |
| **ECSS-MAG-02** | ECSS-E-ST-20-07C Rev. 2 | Clause 5.3.4 | Magnetometer Sensor Stray Field Isolation | \$B\_{stray} \= \\frac{\\mu\_0}{4\\pi R^3} \\cdot 2M\_{res} \\le 10.0\\text{ nT}\$ | 1.91 nT | **PASS** |
| **ECSS-MAG-03** | NASA-HDBK-4008 | Clause 4.2 | Magnetometer Deployable Boom Geometry | \$R\_{boom} \\ge 1.20\\text{ m}\$ deployable standoff distance | 1.65 m | **PASS** |
| **ECSS-MAG-04** | ECSS-E-ST-60-30C | Clause 6.3.1 | Torquerod Core Aspect Ratio & Permeability | \$L/D \\ge 15.0\$ and effective rod permeability \$\\mu\_{eff} \\ge 35.0\$ | \$L/D \= 20.0\$, \$\\mu\_{eff} \= 48.4\$ | **PASS** |
| **ECSS-MAG-05** | ECSS-E-ST-60-30C | Clause 6.3.3 | MTQ Coil Thermal & Electrical Power | \$P\_{coil} \\le 15.0\\text{ W}\$ (SmallSat) or \$P\_{coil}/M\_{sc} \\le 0.060\\text{ W/kg}\$ | 5.74 W (0.032 W/kg) | **PASS** |
| **ECSS-MAG-06** | ECSS-E-ST-60-30C | Clause 6.4.2 | MTQ Disturbance Control Authority Margin | \$\\frac{\\tau\_{max} \- \\tau\_{dist}}{\\tau\_{dist}} \\ge 500.0%\$ (\$5\\times\$ over peak magnetic disturbance) | \+25,859.0% | **PASS** |
| **ECSS-MAG-07** | ECSS-E-ST-60-30C | Clause 6.4.4 | Reaction Wheel Momentum Desaturation Time | \$T\_{desat} \= \\frac{H\_{rw}}{\\bar{\\tau}\_{desat}} \\le 45.0\\text{ min}\$ (or \$\\le 4.0\\text{ orbits in MEO}\$) | 34.5 min (0.36 orb) | **PASS** |
| **ECSS-MAG-08** | ECSS-E-ST-60-30C | Clause 6.5.1 | B-Dot Tip-Off Rate Detumbling Damping | 95% tip-off angular rate reduction in \$T\_{detumble} \\le 2.0\\text{ orbits}\$ | 0.48 orbits (45.1 min) | **PASS** |
| **ECSS-MAG-09** | ECSS-E-ST-60-30C | Clause 5.2 | Geomagnetic Orbit Field Accessibility | Ambient magnetic field \$ | \\vec{B}\_{orbit} | \\ge 500.0\\text{ nT}\$ for viable actuation |
| **ECSS-MAG-10** | ECSS-E-ST-20-07C Rev. 2 | Clause 5.4.1 | Unshielded Component Sensor Separation | All unshielded magnetic components located at distance \$R \\ge 1.50\\text{ m}\$ | 100% compliant | **PASS** |

