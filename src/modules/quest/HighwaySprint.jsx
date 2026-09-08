/**
 * HighwaySprint.jsx — Forwarding export for HighwaySprintCanvas
 * Ensures 100% backward-compatibility for all existing routes and callers.
 */

import React from 'react';
import HighwaySprintCanvas from './HighwaySprintCanvas';

export default function HighwaySprint(props) {
  return <HighwaySprintCanvas {...props} />;
}
