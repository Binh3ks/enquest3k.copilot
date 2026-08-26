// Calibration Adapter for Cambridge Speaking Part 1 Find Differences Hotspots
import w33Calib from '../../docs/week33_hotspot_calibration.json';
import w34Calib from '../../docs/week34_hotspot_calibration.json';
import w35Calib from '../../docs/week35_hotspot_calibration.json';

const CALIBRATION_REGISTRY = {
  33: w33Calib,
  34: w34Calib,
  35: w35Calib
};

export function getCalibratedCentroids(weekNumber) {
  const week = parseInt(weekNumber, 10);
  const data = CALIBRATION_REGISTRY[week] || CALIBRATION_REGISTRY[33];
  if (!data || !data.centroids) {
    throw new Error(`[DEV-003 Violation] No hotspot calibration file found for week ${weekNumber}`);
  }
  return data.centroids;
}

export default { getCalibratedCentroids };
