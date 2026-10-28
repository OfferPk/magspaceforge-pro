# MagSpaceForge Pro v1.0.0

### Spacecraft Magnetic Cleanliness, IGRF-13 Geomagnetic Field & Magnetic Torquer Attitude Actuation Studio

**Standards**: ECSS-E-ST-60-30C • ECSS-E-ST-20-07C Rev. 2 • NASA-HDBK-4008 • IAGA IGRF-13

---

## Overview

**MagSpaceForge Pro** is a professional, air-gapped engineering studio and compliance auditor designed for satellite AOCS/GNC systems engineers, EMC cleanroom technicians, and mission architects. It provides automated residual dipole budgeting, boom sensor stray field modeling, torquerod core demagnetization physics, reaction wheel momentum desaturation dynamics, and B-dot detumbling simulation.

---

## Key Features

* **IGRF-13 Orbit Geomagnetic Field Modeling**: Calculates radial, tangential, and total field vectors across LEO, MEO, and GEO orbits.  
* **Component Magnetic Dipole Budgeting**: Allocates permanent and induced dipoles across reaction wheels, battery relays, RF amplifiers, and solar array drives.  
* **1/R³ Sensor Stray Field Attenuation**: Computes magnetic contamination at deployable boom sensors to ensure compliance with the \$\\le 10.0\\text{ nT}\$ ECSS limit.  
* **Ferromagnetic Torquerod Physics**: Implements Osborn cylindrical demagnetization factor (\$N\_d\$), effective permeability (\$\\mu\_{eff}\$), and temperature-corrected copper coil resistance.  
* **Reaction Wheel Desaturation & B-Dot Waveforms**: Interactive SVG telemetry showing exponential angular rate dissipation \$\\omega(t)\$, commanded magnetic moment \$M(t)\$, and wheel momentum relief.  
* **10-Point Normative ECSS Auditor**: Automated verification matrix with live status badges and XML manifest generator.

---

## Directory Structure

magspace\_project/

├── build/

│   └── magspace-forge-pro-v1.0.0.zip

├── documentation/

│   ├── ECSS\_E\_ST\_60\_30C\_SPECIFICATION.md

│   ├── ECSS\_MAGNETIC\_COMPLIANCE\_MATRIX.md

│   ├── EXECUTIVE\_SUMMARY.md

│   └── README.md

├── screenshots/

│   ├── magspace-architecture-diagram.svg

│   ├── magspace-studio-preview.svg

│   └── magspace-studio-screenshot.png

└── source-code/

    ├── index.html

    ├── magspace-auditor.js

    ├── magspace-engine.js

    ├── magspace\_cli.py

    ├── package.json

    └── test\_runner.py

---

## Quickstart & CLI Usage

### Running the Interactive Web Studio

Open `source-code/index.html` in any modern web browser (no local server or external internet required; full offline fallback CSS is embedded).

### Running Automated Test Suites

cd source-code

python3 test\_runner.py

### Using the Python CLI

\# List available mission presets

python3 magspace\_cli.py list-presets

\# Run 10-point ECSS compliance audit

python3 magspace\_cli.py audit \--preset falcon9\_rideshare\_smallsat

\# Export ECSS XML Manifest

python3 magspace\_cli.py export-xml \--preset falcon9\_rideshare\_smallsat

---

## License

MIT License. Developed autonomously by the Digital Product Factory.