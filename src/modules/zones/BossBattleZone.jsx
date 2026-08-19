import React, { useState } from 'react';
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
import OpenClozeCompleter from '../../components/cambridge/OpenClozeCompleter';
import FindDifferencesInteractive from '../../components/cambridge/FindDifferencesInteractive';
import InformationExchangeP2 from '../../components/cambridge/InformationExchangeP2';
import ChoiceGrid from '../../components/common/ChoiceGrid';
import { Shield, Trophy, CheckCircle2, RotateCcw, Award, PlayCircle, Star, Sparkles } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';

export default function BossBattleZone({ data, weekNumber = 33 }) {
  const userShields = useUserStore((state) => state.userShields || 0);
  const rotaryConfig = getBossRotaryConfig(weekNumber);
  const bossData = data?.bossBattle || {};

  const [hasStarted, setHasStarted] = useState(false);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [earnedShields, setEarnedShields] = useState([]);
  const [examFinished, setExamFinished] = useState(false);

  // Available tasks mapped from rotary config
  const isFullMock = rotaryConfig.cycleNumber === 5 || rotaryConfig.cycleNumber === 0;

  // Build task list for current week
  const currentTasks = React.useMemo(() => {
    if (isFullMock) {
      return [
        { id: 'list_p1', name: 'Listening P1: Draw Lines', category: 'Listening' },
        { id: 'list_p2', name: 'Listening P2: Secret Notes', category: 'Listening' },
        { id: 'list_p3', name: 'Listening P3: Item Hunt', category: 'Listening' },
        { id: 'list_p5', name: 'Listening P5: Magic Color', category: 'Listening' },
        { id: 'rw_p1', name: 'Reading P1: Word Bank', category: 'Reading' },
        { id: 'rw_p2', name: 'Reading P2: Dialogue A-H', category: 'Reading' },
        { id: 'rw_p4', name: 'Reading P4: Text Cloze', category: 'Reading' },
        { id: 'rw_p5', name: 'Reading P5: Story Detective', category: 'Reading' },
        { id: 'rw_p6', name: 'Reading P6: Open Cloze', category: 'Reading' },
        { id: 'spk_p1', name: 'Speaking P1: Find Diff', category: 'Speaking' },
        { id: 'spk_p2', name: 'Speaking P2: Ask & Answer', category: 'Speaking' },
      ];
    }

    if (rotaryConfig.cycleNumber === 1) {
      return [
        { id: 'list_p1', name: 'Listening Part 1: Draw Lines', shieldName: 'Shield 1 (Listening P1)' },
        { id: 'list_p2', name: 'Listening Part 2: Note Completion', shieldName: 'Shield 2 (Listening P2)' },
        { id: 'list_p3', name: 'Listening Part 3: Matching A-H', shieldName: 'Shield 3 (Listening P3)' },
      ];
    }

    if (rotaryConfig.cycleNumber === 2) {
      return [
        { id: 'list_p5', name: 'Listening Part 5: Color & Write', shieldName: 'Shield 5 (Listening P5)' },
        { id: 'rw_p1', name: 'Reading Part 1: Word Bank Match', shieldName: 'Shield 6 (R&W P1)' },
        { id: 'rw_p6', name: 'Reading Part 6: Open Cloze', shieldName: 'Shield 11 (R&W P6)' },
      ];
    }

    if (rotaryConfig.cycleNumber === 3) {
      return [
        { id: 'rw_p2', name: 'Reading Part 2: Dialogue A-H', shieldName: 'Shield 7 (R&W P2)' },
        { id: 'rw_p4', name: 'Reading Part 4: 10-Gap Cloze', shieldName: 'Shield 9 (R&W P4)' },
        { id: 'rw_p5', name: 'Reading Part 5: Story Detective', shieldName: 'Shield 10 (R&W P5)' },
      ];
    }

    // Cycle 4
    return [
      { id: 'spk_p1', name: 'Speaking Part 1: Find Differences', shieldName: 'Shield 13 (Speaking P1)' },
      { id: 'spk_p2', name: 'Speaking Part 2: Ask & Answer (Cue Card)', shieldName: 'Shield 14 (Speaking P2)' },
    ];
  }, [rotaryConfig, isFullMock]);

  const currentTask = currentTasks[activeTaskIndex] || currentTasks[0];

  const handleTaskComplete = (taskId) => {
    if (!earnedShields.includes(taskId)) {
      setEarnedShields(prev => [...prev, taskId]);
    }

    // Track quest: mark boss_listening after first task, shadowing after all tasks
    if (activeTaskIndex === 0) {
      useDailyQuestStore.getState().completeQuest(weekNumber, 'boss_listening');
    }

    if (activeTaskIndex + 1 < currentTasks.length) {
      setActiveTaskIndex(prev => prev + 1);
    } else {
      setExamFinished(true);
      useDailyQuestStore.getState().completeQuest(weekNumber, 'shadowing');
      useDailyQuestStore.getState().completeQuest(weekNumber, 'weekly_review');
    }
  };

  if (!hasStarted) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
        {/* Dual Progress Bar Indicator (EPIC-4: Cambridge Mastery vs Knowledge Bar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-purple-900/90 text-white rounded-2xl border border-purple-500/40 shadow-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-amber-300 flex items-center gap-1">
                🛡️ CAMBRIDGE MASTERY BAR
              </span>
              <span>85% (A2 Flyers)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="p-3.5 bg-emerald-900/90 text-white rounded-2xl border border-emerald-500/40 shadow-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-emerald-300 flex items-center gap-1">
                🌍 CLIL KNOWLEDGE BAR
              </span>
              <span>90% (Science & Society)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
        </div>

        <BossIntro
          rotaryConfig={rotaryConfig}
          onStartBattle={() => setHasStarted(true)}
          userShields={userShields}
        />
        
        {/* Comeback Shield Indicator */}
        <div className="flex items-center justify-center p-3 border-t border-slate-200">
           <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
             <Shield className="text-amber-500" size={16} /> 
             You have {userShields} Comeback Shields available to boost your score!
           </div>
        </div>
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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Exam Header Status Bar with Exit Button */}
      <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-purple-500/40 text-white flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setHasStarted(false);
              setActiveTaskIndex(0);
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow"
          >
            ← Exit Battle
          </button>
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <Shield size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-amber-300">
                Boss Battle • Task {activeTaskIndex + 1}/{currentTasks.length}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-400">
                ({rotaryConfig.cycleName})
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white">{currentTask.name}</h3>
          </div>
        </div>

        {/* Task Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {currentTasks.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTaskIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTaskIndex === idx
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300'
                  : earnedShields.includes(t.id)
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {earnedShields.includes(t.id) && <CheckCircle2 size={12} className="text-emerald-400" />}
              Task {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Task Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl min-h-[480px]">
        {/* LISTENING P1 */}
        {currentTask.id === 'list_p1' && bossData.listening?.p1 && (
          <SVGLineMatcher
            listeningData={bossData.listening.p1}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('list_p1')}
          />
        )}

        {/* LISTENING P2 */}
        {currentTask.id === 'list_p2' && (
          <NotepadNoteCompleter
            data={bossData.listening?.p2}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('list_p2')}
          />
        )}

        {/* LISTENING P3 */}
        {currentTask.id === 'list_p3' && bossData.listening?.p3 && (
          <VisualMatchingAH
            matchingData={bossData.listening.p3}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('list_p3')}
          />
        )}

        {/* LISTENING P5 */}
        {currentTask.id === 'list_p5' && bossData.listening?.p5 && (
          <SVGColorAndWrite
            data={bossData.listening.p5}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('list_p5')}
          />
        )}

        {/* R&W P1 */}
        {currentTask.id === 'rw_p1' && bossData.readingWriting?.p1 && (
          <WordBankMatchingGrid
            data={bossData.readingWriting.p1}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('rw_p1')}
          />
        )}

        {/* R&W P2 */}
        {currentTask.id === 'rw_p2' && bossData.readingWriting?.p2 && (
          <DialogueAHCompleter
            data={bossData.readingWriting.p2}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('rw_p2')}
          />
        )}

        {/* R&W P4 */}
        {currentTask.id === 'rw_p4' && bossData.readingWriting?.p4 && (
          <InlineTextClozeDropdown
            data={bossData.readingWriting.p4}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('rw_p4')}
          />
        )}

        {/* R&W P5 */}
        {currentTask.id === 'rw_p5' && bossData.readingWriting?.p5 && (
          <TextExtractionCompleter
            data={bossData.readingWriting.p5}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('rw_p5')}
          />
        )}

        {/* R&W P6 */}
        {currentTask.id === 'rw_p6' && bossData.readingWriting?.p6 && (
          <OpenClozeCompleter
            data={bossData.readingWriting.p6}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('rw_p6')}
          />
        )}

        {/* SPEAKING P1 */}
        {currentTask.id === 'spk_p1' && bossData.speaking?.p1_findDiff && (
          <FindDifferencesInteractive
            speakingData={bossData.speaking.p1_findDiff}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('spk_p1')}
          />
        )}

        {/* SPEAKING P2 */}
        {currentTask.id === 'spk_p2' && bossData.speaking?.p2_cueCard && (
          <InformationExchangeP2
            cueCardData={bossData.speaking.p2_cueCard}
            weekNumber={weekNumber}
            onComplete={() => handleTaskComplete('spk_p2')}
          />
        )}
      </div>
    </div>
  );
}
