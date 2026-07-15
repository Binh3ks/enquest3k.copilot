import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen } from 'lucide-react';
import { getAllWords, getBankStats } from '../utils/wordMemoryBank';
import { getWeekTitle } from '../data/weeks/metadata';

const STATUS_LABELS = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700' },
  learning: { label: 'Learning', color: 'bg-amber-100 text-amber-700' },
  reviewing: { label: 'Reviewing', color: 'bg-purple-100 text-purple-700' },
  mastered: { label: 'Mastered', color: 'bg-emerald-100 text-emerald-700' },
};

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'mastered', label: 'Mastered' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'learning', label: 'Learning' },
  { key: 'new', label: 'New' },
];

export default function WordTreasury() {
  const navigate = useNavigate();
  const [allWords] = useState(() => getAllWords());
  const [stats] = useState(() => getBankStats());
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let words = allWords;
    if (statusFilter !== 'all') {
      words = words.filter((w) => w.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      words = words.filter((w) => w.word.toLowerCase().includes(q) || (w.meaning || '').toLowerCase().includes(q));
    }
    // Group by week
    const groups = {};
    words.forEach((w) => {
      const week = w.week_number || 0;
      if (!groups[week]) groups[week] = [];
      groups[week].push(w);
    });
    // Sort weeks descending
    return Object.entries(groups)
      .map(([week, words]) => ({ week: parseInt(week), words }))
      .sort((a, b) => b.week - a.week);
  }, [allWords, statusFilter, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800">📖 Word Treasury</h1>
            <p className="text-[11px] font-semibold text-slate-400">Your personal vocabulary collection</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: stats.total, color: 'bg-slate-500' },
            { label: 'Mastered', value: stats.mastered, color: 'bg-emerald-500' },
            { label: 'Reviewing', value: stats.reviewing, color: 'bg-purple-500' },
            { label: 'Learning', value: stats.learning + stats.new, color: 'bg-amber-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
              <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-2`} />
              <div className="text-2xl font-black text-slate-800">{s.value}</div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all whitespace-nowrap ${
                statusFilter === tab.key
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-emerald-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Word list by week */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-sm font-bold text-slate-400">
              {allWords.length === 0 ? 'No words yet. Start learning to build your treasury!' : 'No words match your filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(({ week, words }) => (
              <div key={week} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-700">
                    Week {week}: {getWeekTitle(week)}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400">{words.length} words</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {words.map((w) => (
                    <div key={w.word_id} className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-bold text-slate-800">{w.word}</span>
                        {w.meaning && (
                          <span className="text-[11px] text-slate-400 ml-2">{w.meaning}</span>
                        )}
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                        STATUS_LABELS[w.status]?.color || 'bg-slate-100 text-slate-500'
                      }`}>
                        {STATUS_LABELS[w.status]?.label || w.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        {allWords.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-xs font-semibold text-emerald-700">
              🏆 {stats.mastered} words mastered out of {stats.total} — keep going!
            </p>
          </div>
        )}

        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-[10px] font-semibold text-slate-400">
            Complete weekly reviews to mark words as mastered. Each mastered word brings you closer to your goals!
          </p>
        </div>
      </div>
    </div>
  );
}
