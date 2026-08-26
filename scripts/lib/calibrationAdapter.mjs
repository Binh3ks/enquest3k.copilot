import fs from 'fs';
import path from 'path';

export function getCalibratedCentroids(weekNumber, rootDir = process.cwd()) {
  const week = parseInt(weekNumber, 10);
  const calibPath = path.join(rootDir, `docs/week${week}_hotspot_calibration.json`);
  if (!fs.existsSync(calibPath)) {
    throw new Error(`[DEV-003 Violation] Hotspot calibration file not found: ${calibPath}`);
  }
  const calibData = JSON.parse(fs.readFileSync(calibPath, 'utf8'));
  if (!calibData.centroids || !Array.isArray(calibData.centroids)) {
    throw new Error(`[DEV-003 Violation] Malformed centroids in ${calibPath}`);
  }
  return calibData.centroids;
}

export default { getCalibratedCentroids };
