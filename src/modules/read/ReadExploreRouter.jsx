import React from 'react';
import ReadingExplore from './ReadingExplore';
import TabbedReadExplore from '../../components/ReadExplore/TabbedReadExplore';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';

/**
 * ReadExploreRouter - W36+ dual-tab detection
 * For W36+, data has read_stem + read_social → TabbedReadExplore
 * For W1-W35, data has content_en flat → legacy ReadingExplore
 */
const ReadExploreRouter = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const { learningMode } = useUserStore();
  const currentWeek = parseInt(weekId);

  // W36+: detect dual-tab structure in the read.js export
  if (currentWeek >= 36 && data && (data.read_stem || data.read_social)) {
    return <TabbedReadExplore weekNumber={currentWeek} weekData={data} />;
  }

  // W1-W35: legacy single-tab reading
  return <ReadingExplore data={data} themeColor={themeColor} isVi={isVi} onToggleLang={onToggleLang} onReportProgress={onReportProgress} />;
};

export default ReadExploreRouter;
