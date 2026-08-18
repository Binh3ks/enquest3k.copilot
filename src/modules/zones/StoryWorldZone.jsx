import React, { useState } from 'react';
import GearIndicator from '../../components/zones/GearIndicator';
import CLILExplorer from '../../components/cambridge/CLILExplorer';
import InlineTextClozeDropdown from '../../components/cambridge/InlineTextClozeDropdown';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { BookOpen, Sparkles, Volume2, Globe, FileText, CheckCircle2, ChevronRight, PlayCircle, Shield } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

export default function StoryWorldZone({ data, weekNumber = 33, onCompleteGear }) {
  const storyData = data?.storyWorld || {};
  const [currentGear, setCurrentGear] = useState(1);
  const [completedGears, setCompletedGears] = useState([1]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [highlightMode, setHighlightMode] = useState('vocab');

  const scenes = storyData.storyScenes || [];
  const clilArticle = storyData.clilArticle || null;
  const interactiveStory = storyData.interactiveStory || null;
  const grammarRegex = storyData.grammarRegex || [];

  const currentScene = scenes[activeFrameIndex] || null;

  const handleNextGear = (targetGear) => {
    setCurrentGear(targetGear);
    if (!completedGears.includes(targetGear)) {
      setCompletedGears(prev => [...prev, targetGear]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 4-Gear Continuous Gradient Indicator */}
      <GearIndicator
        currentGear={currentGear}
        onSelectGear={setCurrentGear}
        completedGears={completedGears}
      />

      {/* GEAR 1: DISCOVERY & 3D WEBTOON EXPLORATION */}
      {currentGear === 1 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-blue-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 1 • Discovery Stage
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                📖 3D Pixar Webtoon Story: Scene Explorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore the weekly story, tap any word to listen and see definitions without any exam pressure!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(2)}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Next: Practice CLIL Science <ChevronRight size={16} />
            </button>
          </div>

          {/* 3D Webtoon Scene Viewer */}
          {scenes.length > 0 && currentScene && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
              {/* Scene Image Container */}
              <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 shadow-inner border border-slate-200">
                <img
                  src={currentScene.image_url || `/images/week${weekNumber}/scene_${activeFrameIndex + 1}.png`}
                  alt={currentScene.en || `Scene ${activeFrameIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/scenes/default_story.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-amber-300 rounded-full text-xs font-black">
                  Scene {activeFrameIndex + 1} of {scenes.length}
                </div>
                <button
                  type="button"
                  onClick={() => speakText(currentScene.en || currentScene.text || '')}
                  className="absolute bottom-3 right-3 p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 font-black text-xs"
                >
                  <Volume2 size={18} /> Listen to Scene
                </button>
              </div>

              {/* Scene Narrative with Hover Dictionary */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-2">
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {renderParsedText(currentScene.en || currentScene.text || '', 'blue', null, false, highlightMode, grammarRegex)}
                </div>
                {currentScene.vi && (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 italic">
                    {currentScene.vi}
                  </p>
                )}
              </div>

              {/* Scene Navigation Carousel */}
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  disabled={activeFrameIndex === 0}
                  onClick={() => setActiveFrameIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-black transition"
                >
                  ◀ Previous Scene
                </button>
                <div className="flex items-center gap-1.5">
                  {scenes.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveFrameIndex(sIdx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeFrameIndex === sIdx ? 'bg-blue-600 scale-125 ring-2 ring-blue-300' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  disabled={activeFrameIndex === scenes.length - 1}
                  onClick={() => setActiveFrameIndex(prev => Math.min(scenes.length - 1, prev + 1))}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-black transition shadow-md"
                >
                  Next Scene ▶
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GEAR 2: PRACTICE — CLIL SCIENCE KNOWLEDGE EXPLORER */}
      {currentGear === 2 && clilArticle && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 2 • Practice Stage
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                🌍 CLIL Knowledge Explorer: Science & Friction
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore the real science behind corridor safety with sentence translation and comprehension.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(3)}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Next: Interactive Story Gap-Fill <ChevronRight size={16} />
            </button>
          </div>

          <CLILExplorer
            clilData={clilArticle}
            highlightMode={highlightMode}
            setHighlightMode={setHighlightMode}
            targetGrammarRegex={grammarRegex}
          />
        </div>
      )}

      {/* GEAR 3: CHALLENGE — INTERACTIVE STORY GAP-FILL (CAMBRIDGE R&W P4 PROTO) */}
      {currentGear === 3 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-purple-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-black uppercase tracking-wider">
                Gear 3 • Challenge Stage
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                📝 Interactive Story Gap-Fill: Full Context Assembly
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Test your lexical recall without word hints. Match correct phrase chunks in narrative sequence!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNextGear(4)}
              className="px-5 py-3 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              Ready for Boss Battle 🏆 <ChevronRight size={16} />
            </button>
          </div>

          {interactiveStory && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="text-purple-600" size={20} />
                {interactiveStory.title || "Interactive Story Gap-Fill"}
              </h3>
              <InlineTextClozeDropdown
                data={interactiveStory}
                weekNumber={weekNumber}
                onComplete={() => {
                  if (!completedGears.includes(3)) {
                    setCompletedGears(prev => [...prev, 3]);
                  }
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* GEAR 4: BOSS BATTLE CALLOUT */}
      {currentGear === 4 && (
        <div className="p-8 bg-gradient-to-br from-rose-900 via-purple-950 to-slate-950 text-white rounded-3xl border-2 border-rose-500/50 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/30 border border-rose-400/50 text-rose-300 flex items-center justify-center text-3xl mx-auto shadow-lg">
            👑
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-black text-amber-300">Story World Mastered!</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You have completed all 3 Discovery, Practice, and Challenge gears. You are now equipped with full vocabulary and contextual science knowledge to conquer the Cambridge Boss Battle!
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onCompleteGear) onCompleteGear(4);
            }}
            className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <Shield size={18} /> Proceed to Boss Battle Zone
          </button>
        </div>
      )}
    </div>
  );
}
