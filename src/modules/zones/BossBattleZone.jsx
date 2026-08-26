import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import getBossRotaryConfig from '../../config/bossRotarySchedule';
import BossIntro from '../../components/zones/BossIntro';
import SVGLineMatcher from '../../components/cambridge/SVGLineMatcher';
import NotepadNoteCompleter from '../../components/common/NotepadNoteCompleter';
import VisualMatchingAH from '../../components/cambridge/VisualMatchingAH';
import SVGColorAndWrite from '../../components/cambridge/SVGColorAndWrite';
import WordBankMatchingGrid from '../../components/cambridge/WordBankMatchingGrid';
import DialogueAHCompleter from '../../components/cambridge/DialogueAHCompleter';
import InlineTextClozeDropdown from '../../components/cambridge/InlineTextClozeDropdown';
import TextExtractionCompleter from '../../components/cambridge/TextExtractionCompleter';
import MultipleChoice3Pic from '../../components/cambridge/MultipleChoice3Pic';
import OpenClozeCompleter from '../../components/cambridge/OpenClozeCompleter';
import RWPart3ClozeWithTitle from '../../components/cambridge/RWPart3ClozeWithTitle';
import PictureStoryContinuation from '../../components/cambridge/PictureStoryContinuation';
import FindDifferencesInteractive from '../../components/cambridge/FindDifferencesInteractive';
import InformationExchangeP2 from '../../components/cambridge/InformationExchangeP2';
import PersonalQuestionsCompleter from '../../components/cambridge/PersonalQuestionsCompleter';
import ChoiceGrid from '../../components/common/ChoiceGrid';
import { Shield, Trophy, CheckCircle2, RotateCcw, Award, PlayCircle, Star, Sparkles } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';

export default function BossBattleZone({ data, weekNumber, forcedStation = null, hideStationTabs = false }) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const location = useLocation();
  const activeWeek = weekNumber || (routeParams?.weekId ? parseInt(routeParams.weekId) : null) || data?.weekNumber || data?.week || data?.rawWeekData?.weekNumber || null;

  const userShields = useUserStore((state) => state.userShields || 0);
  const rotaryConfig = getBossRotaryConfig(activeWeek || 1);
  const bossData = React.useMemo(() => {
    const hasCustomListening = data?.bossBattle?.listening?.p1 || data?.bossBattle?.listening?.p2;
    const hasCustomRW = data?.bossBattle?.readingWriting?.p1 || data?.bossBattle?.readingWriting?.p2;
    if (hasCustomListening || hasCustomRW) return data.bossBattle;

    return {
      listening: {
        p1: data?.listening_hub?.listening_p1 || data?.listeningHubData?.listening_p1 || data?.bossBattle?.listening?.p1,
        p2: data?.listening_hub?.listening_p2 || data?.listening_hub?.listening_p2_notes || data?.listeningHubData?.listening_p2 || data?.bossBattle?.listening?.p2,
        p3: data?.listening_hub?.listening_p3 || data?.listeningHubData?.listening_p3 || data?.bossBattle?.listening?.p3,
        p4: data?.listening_hub?.listening_p4 || data?.listeningHubData?.listening_p4 || data?.listening_hub?.listening_p4_questions || data?.bossBattle?.listening?.p4,
        p5: data?.listening_hub?.listening_p5 || data?.listeningHubData?.listening_p5 || data?.bossBattle?.listening?.p5
      },
      readingWriting: {
        p1: data?.reading_hub?.rw_part_1 || data?.writing_hub?.rw_part_1 || data?.readingHubData?.rw_part_1 || data?.writingHubData?.rw_part_1 || data?.bossBattle?.readingWriting?.p1,
        p2: data?.reading_hub?.rw_part_2 || data?.writing_hub?.rw_part_2 || data?.readingHubData?.rw_part_2 || data?.writingHubData?.rw_part_2 || data?.bossBattle?.readingWriting?.p2,
        p3: data?.reading_hub?.rw_part_3 || data?.writing_hub?.rw_part_3 || data?.readingHubData?.rw_part_3 || data?.writingHubData?.rw_part_3 || data?.bossBattle?.readingWriting?.p3,
        p4: data?.reading_hub?.rw_part_4 || data?.writing_hub?.rw_part_4 || data?.reading_hub?.rw_part4 || data?.writing_hub?.rw_part4 || data?.readingHubData?.rw_part_4 || data?.writingHubData?.rw_part_4 || data?.bossBattle?.readingWriting?.p4,
        p5: data?.reading_hub?.rw_part_5 || data?.writing_hub?.rw_part_5 || data?.reading_hub?.rw_part5 || data?.writing_hub?.rw_part5 || data?.readingHubData?.rw_part_5 || data?.writingHubData?.rw_part_5 || data?.bossBattle?.readingWriting?.p5,
        p6: data?.reading_hub?.rw_part_6 || data?.writing_hub?.rw_part_6 || data?.reading_hub?.rw_part6 || data?.writing_hub?.rw_part6 || data?.readingHubData?.rw_part_6 || data?.writingHubData?.rw_part_6 || data?.bossBattle?.readingWriting?.p6
      },
      speaking: {
        p1_findDiff: data?.speaking_hub?.find_differences || data?.speakingHubData?.find_differences || data?.bossBattle?.speaking?.p1_findDiff,
        p2_cueCard: data?.speaking_hub?.info_exchange_cards || data?.speakingHubData?.info_exchange_cards || data?.bossBattle?.speaking?.p2_cueCard,
        p3_pictureStory: data?.speaking_hub?.picture_story || data?.speakingHubData?.picture_story || data?.bossBattle?.speaking?.p3_pictureStory,
        p4_personalQs: data?.speaking_hub?.personal_questions || data?.speakingHubData?.personal_questions || data?.bossBattle?.speaking?.p4_personalQs
      }
    };
  }, [data]);

  // Parse URL query params reactively with useLocation
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const rawPartParam = searchParams.get('part') || searchParams.get('part_id') || searchParams.get('task') || searchParams.get('taskId');
  const qaNonce = searchParams.get('qa_nonce');

  const requestedTaskId = React.useMemo(() => {
    if (!rawPartParam) return null;
    const p = rawPartParam.toLowerCase().trim();
    if (p === '1' || p === 'l1' || p === 'list_p1' || p === 'listening_p1') return 'list_p1';
    if (p === '2' || p === 'l2' || p === 'list_p2' || p === 'listening_p2') return 'list_p2';
    if (p === '3' || p === 'l3' || p === 'list_p3' || p === 'listening_p3') return 'list_p3';
    if (p === '4' || p === 'l4' || p === 'list_p4' || p === 'listening_p4') return 'list_p4';
    if (p === '5' || p === 'l5' || p === 'list_p5' || p === 'listening_p5') return 'list_p5';
    if (p === 'r1' || p === 'rw_p1' || p === 'reading_p1') return 'rw_p1';
    if (p === 'r2' || p === 'rw_p2' || p === 'reading_p2') return 'rw_p2';
    if (p === 'r3' || p === 'rw_p3' || p === 'reading_p3') return 'rw_p3';
    if (p === 'r4' || p === 'rw_p4' || p === 'reading_p4') return 'rw_p4';
    if (p === 'r5' || p === 'rw_p5' || p === 'reading_p5') return 'rw_p5';
    if (p === 'r6' || p === 'rw_p6' || p === 'reading_p6') return 'rw_p6';
    if (p === 's1' || p === 'spk_p1' || p === 'speaking_p1') return 'spk_p1';
    if (p === 's2' || p === 'spk_p2' || p === 'speaking_p2') return 'spk_p2';
    if (p === 's3' || p === 'spk_p3' || p === 'speaking_p3') return 'spk_p3';
    if (p === 's4' || p === 'spk_p4' || p === 'speaking_p4') return 'spk_p4';
    return rawPartParam;
  }, [rawPartParam]);

  // Available tasks mapped from rotary config
  const isFullMock = rotaryConfig.cycleNumber === 5 || rotaryConfig.cycleNumber === 0;

  // Build task list for current week
  const currentTasks = React.useMemo(() => {
    let tasks = [];
    if (isFullMock) {
      tasks = [
        { id: 'list_p1', name: 'Listening P1: Draw Lines', category: 'Listening' },
        { id: 'list_p2', name: 'Listening P2: Secret Notes', category: 'Listening' },
        { id: 'list_p3', name: 'Listening P3: Item Hunt', category: 'Listening' },
        { id: 'list_p4', name: 'Listening P4: 3-Picture Quiz', category: 'Listening' },
        { id: 'list_p5', name: 'Listening P5: Magic Color', category: 'Listening' },
        { id: 'rw_p1', name: 'Reading P1: Word Bank', category: 'Reading' },
        { id: 'rw_p2', name: 'Reading P2: Dialogue A-H', category: 'Reading' },
        { id: 'rw_p3', name: 'Reading P3: Cloze Story & Title', category: 'Reading' },
        { id: 'rw_p4', name: 'Reading P4: Text Cloze', category: 'Reading' },
        { id: 'rw_p5', name: 'Reading P5: Story Detective', category: 'Reading' },
        { id: 'rw_p6', name: 'Reading P6: Open Cloze', category: 'Reading' },
        { id: 'spk_p1', name: 'Speaking P1: Find Diff', category: 'Speaking' },
        { id: 'spk_p2', name: 'Speaking P2: Ask & Answer', category: 'Speaking' },
        { id: 'spk_p3', name: 'Speaking P3: Picture Story', category: 'Speaking' },
      ];
    } else if (rotaryConfig.cycleNumber === 1) {
      tasks = [
        { id: 'list_p1', name: 'Listening Part 1: Draw Lines', shieldName: 'Shield 1 (Listening P1)' },
        { id: 'list_p2', name: 'Listening Part 2: Note Completion', shieldName: 'Shield 2 (Listening P2)' },
        { id: 'list_p3', name: 'Listening Part 3: Matching A-H', shieldName: 'Shield 3 (Listening P3)' },
      ];
    } else if (rotaryConfig.cycleNumber === 2) {
      tasks = [
        { id: 'list_p4', name: 'Listening Part 4: 3-Picture Quiz', shieldName: 'Shield 4 (Listening P4)' },
        { id: 'rw_p1', name: 'Reading Part 1: Word Bank Match', shieldName: 'Shield 6 (R&W P1)' },
        { id: 'spk_p1', name: 'Speaking Part 1: Find Differences', shieldName: 'Shield 13 (Speaking P1)' },
      ];
    } else if (rotaryConfig.cycleNumber === 3) {
      tasks = [
        { id: 'rw_p2', name: 'Reading Part 2: Dialogue A-H', shieldName: 'Shield 7 (R&W P2)' },
        { id: 'rw_p3', name: 'Reading Part 3: Cloze Story & Title', shieldName: 'Shield 8 (R&W P3)' },
        { id: 'rw_p4', name: 'Reading Part 4: 10-Gap Cloze', shieldName: 'Shield 9 (R&W P4)' },
        { id: 'rw_p5', name: 'Reading Part 5: Story Detective', shieldName: 'Shield 10 (R&W P5)' },
      ];
    } else {
      // Cycle 4
      tasks = [
        { id: 'rw_p6', name: 'Reading Part 6: Open Cloze', shieldName: 'Shield 11 (R&W P6)' },
        { id: 'spk_p2', name: 'Speaking Part 2: Ask & Answer (Cue Card)', shieldName: 'Shield 14 (Speaking P2)' },
        { id: 'spk_p3', name: 'Speaking Part 3: Picture Story', shieldName: 'Shield 15 (Speaking P3)' },
      ];
    }

    // If a specific task was requested via URL and is not in current rotary tasks, append it
    if (requestedTaskId && !tasks.some(t => t.id === requestedTaskId)) {
      const taskLabels = {
        list_p1: 'Listening Part 1: Draw Lines',
        list_p2: 'Listening Part 2: Note Completion',
        list_p3: 'Listening Part 3: Matching A-H',
        list_p4: 'Listening Part 4: 3-Picture Quiz',
        list_p5: 'Listening Part 5: Magic Color & Write',
        rw_p1: 'Reading Part 1: Word Bank Match',
        rw_p2: 'Reading Part 2: Dialogue A-H',
        rw_p3: 'Reading Part 3: Cloze Story & Title',
        rw_p4: 'Reading Part 4: Text Cloze Dropdown',
        rw_p5: 'Reading Part 5: Text Extraction',
        rw_p6: 'Reading Part 6: Open Cloze',
        spk_p1: 'Speaking Part 1: Find Differences',
        spk_p2: 'Speaking Part 2: Info Exchange',
        spk_p3: 'Speaking Part 3: Picture Story',
        spk_p4: 'Speaking Part 4: Personal Questions'
      };
      tasks.push({
        id: requestedTaskId,
        name: taskLabels[requestedTaskId] || requestedTaskId,
        shieldName: `Direct Part (${requestedTaskId})`
      });
    }

    return tasks;
  }, [rotaryConfig, isFullMock, requestedTaskId]);

  const initialIndex = React.useMemo(() => {
    if (requestedTaskId) {
      const foundIdx = currentTasks.findIndex(t => t.id === requestedTaskId);
      if (foundIdx !== -1) return foundIdx;
    }
    if (forcedStation === 'rw_boss' || forcedStation === 'reading_boss' || forcedStation === 'boss_reading') return 1;
    if (forcedStation === 'review' || forcedStation === 'weekly_review' || forcedStation === 'speaking_boss') return 2;
    return 0;
  }, [forcedStation, requestedTaskId, currentTasks]);

  const [hasStarted, setHasStarted] = useState(() => {
    return Boolean(qaNonce || requestedTaskId);
  });
  const [activeTaskIndex, setActiveTaskIndex] = useState(initialIndex);
  const [earnedShields, setEarnedShields] = useState([]);
  const [examFinished, setExamFinished] = useState(false);

  // Sync active task index if forcedStation or requestedTaskId changes
  React.useEffect(() => {
    if (requestedTaskId) {
      const foundIdx = currentTasks.findIndex(t => t.id === requestedTaskId);
      if (foundIdx !== -1) {
        setActiveTaskIndex(foundIdx);
        setHasStarted(true);
        return;
      }
    }
    if (forcedStation === 'rw_boss' || forcedStation === 'reading_boss' || forcedStation === 'boss_reading') {
      setActiveTaskIndex(1);
    } else if (forcedStation === 'review' || forcedStation === 'weekly_review' || forcedStation === 'speaking_boss') {
      setActiveTaskIndex(2);
    } else if (forcedStation === 'listening_boss' || forcedStation === 'boss_listening') {
      setActiveTaskIndex(0);
    }
  }, [forcedStation, requestedTaskId, currentTasks]);

  // QA Hook for Victory Screen verification
  React.useEffect(() => {
    window.__triggerBossVictory = (customShields) => {
      setHasStarted(true);
      setExamFinished(true);
      if (customShields && Array.isArray(customShields)) {
        setEarnedShields(customShields);
      } else {
        setEarnedShields(['Shield 1 (Listening P1)', 'Shield 2 (Listening P2)', 'Shield 3 (Listening P3)']);
      }
    };
    return () => {
      delete window.__triggerBossVictory;
    };
  }, []);

  const currentTask = currentTasks[activeTaskIndex] || currentTasks[0];

  const handleTaskComplete = (taskId) => {
    if (!earnedShields.includes(taskId)) {
      setEarnedShields(prev => [...prev, taskId]);
    }

    // Track quest: mark boss_listening after task 1, boss_reading after task 2, weekly_review after all tasks
    if (activeWeek) {
      if (activeTaskIndex === 0) {
        useDailyQuestStore.getState().completeQuest(activeWeek, 'boss_listening');
      } else if (activeTaskIndex === 1) {
        useDailyQuestStore.getState().completeQuest(activeWeek, 'boss_reading');
      }
    }

    if (activeTaskIndex + 1 < currentTasks.length) {
      setActiveTaskIndex(prev => prev + 1);
    } else {
      setExamFinished(true);
      if (activeWeek) {
        useDailyQuestStore.getState().completeQuest(activeWeek, 'weekly_review');
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="w-full max-w-5xl mx-auto font-sans">
        <BossIntro
          rotaryConfig={rotaryConfig}
          onStartBattle={() => setHasStarted(true)}
          userShields={userShields}
          currentTask={currentTask}
        />
      </div>
    );
  }

  if (examFinished) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-2 border-amber-400 text-white rounded-3xl text-center space-y-6 shadow-2xl animate-in zoom-in-95">
        <Trophy size={64} className="mx-auto text-amber-400 animate-bounce" />
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-500/30 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
            Official Cambridge A2 Flyers Result
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200">
            🏆 BOSS BATTLE VICTORY!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            You successfully tackled all Cambridge Exam Tasks for Cycle {rotaryConfig.cycleNumber}!
          </p>
        </div>

        {/* Shield Rewards */}
        <div className="flex items-center justify-center gap-3 py-4 flex-wrap">
          {earnedShields.map((sh, idx) => (
            <div key={idx} className="p-3 bg-purple-900/60 border border-purple-400/50 rounded-2xl flex items-center gap-2 shadow-lg">
              <Shield className="text-amber-400" size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase font-black text-purple-300">Shield Earned</div>
                <div className="text-xs font-black text-white">{sh}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setExamFinished(false);
            setHasStarted(false);
            setActiveTaskIndex(0);
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-xl inline-flex items-center gap-2"
        >
          <RotateCcw size={16} /> Return to Boss Hub
        </button>
      </div>
    );
  }

  const activeTaskId = requestedTaskId || currentTask?.id;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 animate-in fade-in duration-200 font-sans">
      {/* Task Content Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-md min-h-[360px]">
        {/* LISTENING P1 */}
        {activeTaskId === 'list_p1' && (
          <SVGLineMatcher
            customData={bossData.listening?.p1}
            listeningData={bossData.listening?.p1}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p1')}
          />
        )}

        {/* LISTENING P2 */}
        {activeTaskId === 'list_p2' && (
          <NotepadNoteCompleter
            customData={bossData.listening?.p2}
            data={bossData.listening?.p2}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p2')}
          />
        )}

        {/* LISTENING P3 */}
        {activeTaskId === 'list_p3' && (
          <VisualMatchingAH
            customData={bossData.listening?.p3}
            matchingData={bossData.listening?.p3}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p3')}
          />
        )}

        {/* LISTENING P4 */}
        {activeTaskId === 'list_p4' && (
          <MultipleChoice3Pic
            customData={bossData.listening?.p4}
            data={bossData.listening?.p4}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p4')}
          />
        )}

        {/* LISTENING P5 */}
        {activeTaskId === 'list_p5' && (
          <SVGColorAndWrite
            customData={bossData.listening?.p5}
            data={bossData.listening?.p5}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('list_p5')}
          />
        )}

        {/* R&W P1 */}
        {activeTaskId === 'rw_p1' && (
          <WordBankMatchingGrid
            customData={bossData.readingWriting?.p1}
            data={bossData.readingWriting?.p1}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p1')}
          />
        )}

        {/* R&W P2 */}
        {activeTaskId === 'rw_p2' && (
          <DialogueAHCompleter
            customData={bossData.readingWriting?.p2}
            data={bossData.readingWriting?.p2}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p2')}
          />
        )}

        {/* R&W P3 */}
        {activeTaskId === 'rw_p3' && (
          <RWPart3ClozeWithTitle
            customData={bossData.readingWriting?.p3}
            data={bossData.readingWriting?.p3}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p3')}
          />
        )}

        {/* R&W P4 */}
        {activeTaskId === 'rw_p4' && (
          <InlineTextClozeDropdown
            customData={bossData.readingWriting?.p4}
            data={bossData.readingWriting?.p4}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p4')}
          />
        )}

        {/* R&W P5 */}
        {activeTaskId === 'rw_p5' && (
          <TextExtractionCompleter
            customData={bossData.readingWriting?.p5}
            data={bossData.readingWriting?.p5}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p5')}
          />
        )}

        {/* R&W P6 */}
        {activeTaskId === 'rw_p6' && (
          <OpenClozeCompleter
            customData={bossData.readingWriting?.p6}
            data={bossData.readingWriting?.p6}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('rw_p6')}
          />
        )}

        {/* SPEAKING P1 */}
        {activeTaskId === 'spk_p1' && (
          <FindDifferencesInteractive
            customData={bossData.speaking?.p1_findDiff}
            data={bossData.speaking?.p1_findDiff}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p1')}
          />
        )}

        {/* SPEAKING P2 */}
        {activeTaskId === 'spk_p2' && (
          <InformationExchangeP2
            customData={bossData.speaking?.p2_cueCard}
            data={bossData.speaking?.p2_cueCard}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p2')}
          />
        )}

        {/* SPEAKING P3 */}
        {activeTaskId === 'spk_p3' && (
          <PictureStoryContinuation
            customData={bossData.speaking?.p3_pictureStory}
            data={bossData.speaking?.p3_pictureStory}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p3')}
          />
        )}

        {/* SPEAKING P4 */}
        {(activeTaskId === 'spk_p4' || activeTaskId === 'personal_questions' || forcedStation === 'personal_qs') && (
          <PersonalQuestionsCompleter
            customData={bossData.speaking?.p4_personalQs}
            data={bossData.speaking?.p4_personalQs}
            weekNumber={activeWeek}
            onComplete={() => handleTaskComplete('spk_p4')}
          />
        )}
      </div>
    </div>
  );
}
