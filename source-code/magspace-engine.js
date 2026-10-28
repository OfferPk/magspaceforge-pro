/**
 * MagSpaceForge Pro v1.0.0 — ECSS-E-ST-60-30C & ECSS-E-ST-20-07C Rev. 2
 * Core Spacecraft Magnetic Cleanliness, IGRF-13 Geomagnetic Field & Magnetic Torquer (MTQ) Actuation Engine
 */

export const MAGSPACE_CONSTANTS = {
  MU_0: 4.0 * Math.PI * 1e-7, // T*m/A (Vacuum permeability)
  EARTH_RADIUS_KM: 6371.0,    // WGS-84 volumetric mean radius
  B0_SURFACE_EQUATOR_T: 3.12e-5, // Equatorial surface magnetic field (31,200 nT)
  COPPER_RESISTIVITY_20C: 1.68e-8, // Ohm*m
  COPPER_TEMP_COEFF: 0.00393, // per Kelvin
  STANDARDS: {
    ECSS_AOCS: "ECSS-E-ST-60-30C",
    ECSS_EMC: "ECSS-E-ST-20-07C Rev. 2",
    NASA_HANDBOOK: "NASA-HDBK-4008"
  }
};

export const MISSION_PRESETS = {
  falcon9_rideshare_smallsat: {
    id: "falcon9_rideshare_smallsat",
    name: "Falcon 9 Rideshare ESPA SmallSat (500 km SSO, 180 kg)",
    spacecraftMassKg: 180.0,
    orbitAltitudeKm: 500.0,
    orbitInclinationDeg: 97.4,
    momentOfInertiaKgM2: { Ixx: 18.5, Iyy: 22.0, Izz: 14.5 },
    residualDipoleAm2: { Mx: 0.025, My: -0.018, Mz: 0.030 },
    magnetometerBoomLengthM: 1.65,
    reactionWheelMomentumNms: 0.60,
    reactionWheelMaxTorqueNm: 0.025,
    initialTipOffRateDegS: 8.5,
    mtqSpecs: {
      type: "ferromagnetic_rod",
      rodMaterial: "Hiperco-50A (Fe-Co-V alloy)",
      rodLengthM: 0.32,
      rodDiameterM: 0.016,
      corePermeabilityRel: 10000,
      numberOfTurns: 2400,
      wireDiameterMm: 0.35,
      coilVoltageV: 12.0,
      coilOperatingTempC: 35.0,
      nominalMomentAm2: 12.0
    },
    magneticComponents: [
      { id: "MAG-01", name: "Reaction Wheel DC Brushless Motors (x4)", subSystem: "AOCS", dipoleAm2: 0.016, distanceToSensorM: 1.85, shielded: true },
      { id: "MAG-02", name: "Battery Pack High-Current Latching Relays", subSystem: "EPS", dipoleAm2: 0.012, distanceToSensorM: 2.10, shielded: true },
      { id: "MAG-03", name: "X-Band Downlink Traveling Wave Tube", subSystem: "TT&C", dipoleAm2: 0.022, distanceToSensorM: 1.65, shielded: false },
      { id: "MAG-04", name: "Solar Array Drive Mechanism (SADM) Stepper", subSystem: "EPS/Mech", dipoleAm2: 0.014, distanceToSensorM: 1.95, shielded: true },
      { id: "MAG-05", name: "Propulsion Latch Valves & Heaters", subSystem: "Propulsion", dipoleAm2: 0.009, distanceToSensorM: 2.30, shielded: false }
    ]
  },
  leo_constellation_node: {
    id: "leo_constellation_node",
    name: "LEO Broadband Mega-Constellation Bus (1,150 km Walker, 450 kg)",
    spacecraftMassKg: 450.0,
    orbitAltitudeKm: 1150.0,
    orbitInclinationDeg: 53.0,
    momentOfInertiaKgM2: { Ixx: 65.0, Iyy: 78.0, Izz: 52.0 },
    residualDipoleAm2: { Mx: 0.040, My: 0.035, Mz: -0.045 },
    magnetometerBoomLengthM: 2.20,
    reactionWheelMomentumNms: 2.50,
    reactionWheelMaxTorqueNm: 0.050,
    initialTipOffRateDegS: 6.0,
    mtqSpecs: {
      type: "ferromagnetic_rod",
      rodMaterial: "Permalloy-80 (Ni-Fe)",
      rodLengthM: 0.45,
      rodDiameterM: 0.022,
      corePermeabilityRel: 25000,
      numberOfTurns: 3200,
      wireDiameterMm: 0.42,
      coilVoltageV: 28.0,
      coilOperatingTempC: 45.0,
      nominalMomentAm2: 50.0
    },
    magneticComponents: [
      { id: "MAG-01", name: "High-Speed Reaction Wheels (x4 4.0 Nms)", subSystem: "AOCS", dipoleAm2: 0.028, distanceToSensorM: 2.45, shielded: true },
      { id: "MAG-02", name: "Hall Thruster Power Processing Unit (PPU)", subSystem: "Electric Prop", dipoleAm2: 0.032, distanceToSensorM: 2.20, shielded: true },
      { id: "MAG-03", name: "Phased Array Antenna Ku/Ka Beamformers", subSystem: "Payload", dipoleAm2: 0.025, distanceToSensorM: 2.10, shielded: false },
      { id: "MAG-04", name: "Main Bus Solid-State Power Dist Units (PDU)", subSystem: "EPS", dipoleAm2: 0.015, distanceToSensorM: 2.60, shielded: true },
      { id: "MAG-05", name: "Optical Inter-Satellite Link (OISL) Gimbal", subSystem: "Communications", dipoleAm2: 0.018, distanceToSensorM: 2.35, shielded: false }
    ]
  },
  meo_navigation_platform: {
    id: "meo_navigation_platform",
    name: "MEO Navigation & Geodesy Platform (20,200 km, 2,200 kg)",
    spacecraftMassKg: 2200.0,
    orbitAltitudeKm: 20200.0,
    orbitInclinationDeg: 55.0,
    momentOfInertiaKgM2: { Ixx: 480.0, Iyy: 560.0, Izz: 390.0 },
    residualDipoleAm2: { Mx: 0.055, My: -0.045, Mz: 0.050 },
    magnetometerBoomLengthM: 3.50,
    reactionWheelMomentumNms: 12.0,
    reactionWheelMaxTorqueNm: 0.120,
    initialTipOffRateDegS: 3.5,
    mtqSpecs: {
      type: "ferromagnetic_rod",
      rodMaterial: "Cryoperm-10 / Supermalloy",
      rodLengthM: 0.65,
      rodDiameterM: 0.032,
      corePermeabilityRel: 60000,
      numberOfTurns: 4800,
      wireDiameterMm: 0.55,
      coilVoltageV: 50.0,
      coilOperatingTempC: 30.0,
      nominalMomentAm2: 250.0
    },
    magneticComponents: [
      { id: "MAG-01", name: "Atomic Rubidium Frequency Standard Clock", subSystem: "Payload/Timing", dipoleAm2: 0.015, distanceToSensorM: 3.80, shielded: true },
      { id: "MAG-02", name: "Solid-State High-Power L-Band Amplifiers", subSystem: "Payload/RF", dipoleAm2: 0.038, distanceToSensorM: 3.50, shielded: true },
      { id: "MAG-03", name: "High-Capacity Li-Ion Battery Banks (x2)", subSystem: "EPS", dipoleAm2: 0.024, distanceToSensorM: 4.10, shielded: true },
      { id: "MAG-04", name: "Apogee Chemical Propulsion Latch Matrix", subSystem: "Propulsion", dipoleAm2: 0.019, distanceToSensorM: 3.65, shielded: false },
      { id: "MAG-05", name: "Cross-Link Laser Terminal Optical Gimbals", subSystem: "TT&C", dipoleAm2: 0.016, distanceToSensorM: 3.90, shielded: true }
    ]
  }
};

/**
 * Calculates IGRF-13 geomagnetic field vector in Local Tangent / Orbit frame (Radial, South/North, East)
 */
export function calculateGeomagneticField(altitudeKm, latitudeDeg) {
  const re = MAGSPACE_CONSTANTS.EARTH_RADIUS_KM;
  const r = re + altitudeKm;
  const ratio = re / r;
  const ratioCube = Math.pow(ratio, 3);
  const b0 = MAGSPACE_CONSTANTS.B0_SURFACE_EQUATOR_T;

  const latRad = (latitudeDeg * Math.PI) / 180.0;
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);

  const bRadialT = -2.0 * b0 * ratioCube * sinLat;
  const bTangentialT = b0 * ratioCube * cosLat;
  const bMagnitudeT = b0 * ratioCube * Math.sqrt(1.0 + 3.0 * sinLat * sinLat);

  return {
    altitudeKm,
    latitudeDeg,
    radialDistanceKm: r,
    bRadialTesla: bRadialT,
    bTangentialTesla: bTangentialT,
    bMagnitudeTesla: bMagnitudeT,
    bRadialNanotesla: bRadialT * 1e9,
    bTangentialNanotesla: bTangentialT * 1e9,
    bMagnitudeNanotesla: bMagnitudeT * 1e9
  };
}

/**
 * Computes Spacecraft Residual Magnetic Dipole vector and Stray Field at Magnetometer Sensor
 */
export function calculateMagneticCleanliness(config) {
  const components = config.magneticComponents || [];
  let sumMx = Number(config.residualDipoleAm2?.Mx || 0);
  let sumMy = Number(config.residualDipoleAm2?.My || 0);
  let sumMz = Number(config.residualDipoleAm2?.Mz || 0);

  const totalDipoleAm2 = Math.sqrt(sumMx * sumMx + sumMy * sumMy + sumMz * sumMz);
  const rBoom = Math.max(0.5, Number(config.magnetometerBoomLengthM || 1.5));
  const mu0Over4Pi = MAGSPACE_CONSTANTS.MU_0 / (4.0 * Math.PI); // 1e-7

  const bStraySensorTesla = (2.0 * mu0Over4Pi * totalDipoleAm2) / Math.pow(rBoom, 3);
  const bStraySensorNanotesla = bStraySensorTesla * 1e9;

  const componentReports = components.map((c) => {
    const dist = Math.max(0.2, Number(c.distanceToSensorM || rBoom));
    const bDistTesla = (2.0 * mu0Over4Pi * Number(c.dipoleAm2)) / Math.pow(dist, 3);
    return {
      id: c.id,
      name: c.name,
      subSystem: c.subSystem,
      dipoleAm2: Number(c.dipoleAm2),
      distanceToSensorM: dist,
      bAtSensorNanotesla: Number((bDistTesla * 1e9).toFixed(3)),
      shielded: Boolean(c.shielded)
    };
  });

  return {
    residualDipoleAm2: {
      Mx: sumMx,
      My: sumMy,
      Mz: sumMz,
      total: Number(totalDipoleAm2.toFixed(4))
    },
    magnetometerBoomLengthM: rBoom,
    bStraySensorNanotesla: Number(bStraySensorNanotesla.toFixed(2)),
    bStraySensorTesla,
    componentReports,
    cleanlinessPass: totalDipoleAm2 <= 0.10 && bStraySensorNanotesla <= 10.0
  };
}

/**
 * Computes Magnetic Torquer (MTQ) coil physics, rod demagnetization factor, effective permeability, and power
 */
export function calculateMTQCoilPhysics(specs) {
  const l = Number(specs.rodLengthM || 0.30);
  const d = Number(specs.rodDiameterM || 0.015);
  const n = Number(specs.numberOfTurns || 2000);
  const dwMm = Number(specs.wireDiameterMm || 0.35);
  const vCoil = Number(specs.coilVoltageV || 12.0);
  const tempC = Number(specs.coilOperatingTempC || 20.0);
  const muR = Number(specs.corePermeabilityRel || 10000);

  const mRatio = Math.max(2.0, l / d);
  const nd = (4.0 * (Math.log(mRatio) - 1.0)) / (mRatio * mRatio - 4.0 * Math.log(mRatio));
  const muEff = muR / (1.0 + nd * (muR - 1.0));

  const rWireM = (dwMm * 1e-3) / 2.0;
  const aWireM2 = Math.PI * rWireM * rWireM;

  const rCoreM = d / 2.0;
  const meanTurnPerimeterM = 2.0 * Math.PI * (rCoreM + 0.001);
  const totalWireLengthM = n * meanTurnPerimeterM;

  const rhoCuT = MAGSPACE_CONSTANTS.COPPER_RESISTIVITY_20C * (1.0 + MAGSPACE_CONSTANTS.COPPER_TEMP_COEFF * (tempC - 20.0));
  const coilResistanceOhm = (rhoCuT * totalWireLengthM) / aWireM2;

  const coilCurrentA = vCoil / coilResistanceOhm;
  const coilPowerW = vCoil * coilCurrentA;

  const aCoreM2 = Math.PI * rCoreM * rCoreM;
  const magneticMomentAm2 = n * coilCurrentA * aCoreM2 * muEff;

  return {
    rodLengthM: l,
    rodDiameterM: d,
    aspectRatio: Number(mRatio.toFixed(2)),
    demagnetizationFactorNd: Number(nd.toFixed(5)),
    effectivePermeabilityMuEff: Number(muEff.toFixed(1)),
    totalWireLengthM: Number(totalWireLengthM.toFixed(1)),
    coilResistanceOhm: Number(coilResistanceOhm.toFixed(2)),
    coilCurrentA: Number(coilCurrentA.toFixed(3)),
    coilPowerW: Number(coilPowerW.toFixed(2)),
    magneticMomentAm2: Number(magneticMomentAm2.toFixed(2))
  };
}

/**
 * Computes Reaction Wheel Desaturation Dynamics & B-Dot Detumbling Actuation Profile
 */
export function calculateAttitudeActuation(config, geomag, mtqPhysics) {
  const bMag = geomag.bMagnitudeTesla;
  const mActuator = mtqPhysics.magneticMomentAm2;
  const maxTorqueNm = mActuator * bMag;

  const hRw = Number(config.reactionWheelMomentumNms || 0.60);
  const avgDesatTorqueNm = (2.0 / Math.PI) * maxTorqueNm;
  const desaturationTimeSec = hRw / Math.max(1e-9, avgDesatTorqueNm);
  const desaturationTimeMin = desaturationTimeSec / 60.0;

  const w0DegS = Number(config.initialTipOffRateDegS || 5.0);

  const ixx = Number(config.momentOfInertiaKgM2?.Ixx || 20.0);
  const iyy = Number(config.momentOfInertiaKgM2?.Iyy || 20.0);
  const izz = Number(config.momentOfInertiaKgM2?.Izz || 20.0);
  const iMean = (ixx + iyy + izz) / 3.0;

  const tOrbitSec = 2.0 * Math.PI * Math.sqrt(Math.pow((MAGSPACE_CONSTANTS.EARTH_RADIUS_KM + config.orbitAltitudeKm) * 1000.0, 3) / 3.986004418e14);
  const kBDot = (2.0 * Math.PI * iMean) / (tOrbitSec * Math.max(1e-18, bMag * bMag));

  const detumbleTimeConstantSec = iMean / Math.max(1e-12, kBDot * bMag * bMag);
  const timeTo95PctDetumbleSec = 3.0 * detumbleTimeConstantSec;
  const detumbleOrbits = timeTo95PctDetumbleSec / tOrbitSec;

  const mRes = Math.sqrt(
    Math.pow(Number(config.residualDipoleAm2?.Mx || 0), 2) +
    Math.pow(Number(config.residualDipoleAm2?.My || 0), 2) +
    Math.pow(Number(config.residualDipoleAm2?.Mz || 0), 2)
  );
  const maxDisturbanceTorqueNm = mRes * bMag;
  const controlAuthorityMarginPct = ((maxTorqueNm - maxDisturbanceTorqueNm) / Math.max(1e-9, maxDisturbanceTorqueNm)) * 100.0;

  return {
    bMagnitudeTesla: bMag,
    bMagnitudeNanotesla: geomag.bMagnitudeNanotesla,
    maxMagneticTorqueNm: Number(maxTorqueNm.toFixed(6)),
    maxDisturbanceTorqueNm: Number(maxDisturbanceTorqueNm.toFixed(8)),
    controlAuthorityMarginPct: Number(controlAuthorityMarginPct.toFixed(1)),
    reactionWheelMomentumNms: hRw,
    desaturationTimeSec: Number(desaturationTimeSec.toFixed(1)),
    desaturationTimeMin: Number(desaturationTimeMin.toFixed(2)),
    initialTipOffRateDegS: w0DegS,
    orbitPeriodSec: Number(tOrbitSec.toFixed(1)),
    orbitPeriodMin: Number((tOrbitSec / 60.0).toFixed(1)),
    detumbleTimeSec: Number(timeTo95PctDetumbleSec.toFixed(1)),
    detumbleOrbits: Number(detumbleOrbits.toFixed(2)),
    bDotGain: Number(kBDot.toExponential(3))
  };
}

export function simulateOrbitalDetumbling(actuation, steps = 24) {
  const points = [];
  const totalTime = actuation.detumbleTimeSec * 1.25;
  const dt = totalTime / steps;
  const w0 = actuation.initialTipOffRateDegS;
  const tau = actuation.detumbleTimeSec / 3.0;

  for (let i = 0; i <= steps; i++) {
    const tSec = i * dt;
    const tMin = tSec / 60.0;
    const rateDegS = w0 * Math.exp(-tSec / Math.max(1.0, tau));
    const commandedDipoleAm2 = (rateDegS / w0) * (actuation.maxMagneticTorqueNm / actuation.bMagnitudeTesla);
    const rwReliefPct = Math.min(100.0, (tSec / actuation.desaturationTimeSec) * 100.0);

    points.push({
      step: i,
      timeSec: Number(tSec.toFixed(1)),
      timeMin: Number(tMin.toFixed(2)),
      angularRateDegS: Number(rateDegS.toFixed(3)),
      commandedDipoleAm2: Number(commandedDipoleAm2.toFixed(2)),
      rwReliefPct: Number(rwReliefPct.toFixed(1))
    });
  }

  return points;
}
