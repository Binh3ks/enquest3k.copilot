import React from 'react';

const WorksheetGenerator = ({ weekData }) => {
  if (!weekData) return null;
  const { weekId, weekTitle_en, stations } = weekData;

  // Dùng SPAN với display block để thay thế DIV bên trong các thành phần text
  const HandLine = ({ w = "100%" }) => (
    <span style={{ 
      width: w, 
      display: 'inline-block', 
      borderBottom: '2px dotted #94a3b8', 
      height: '1.2em',
      marginLeft: '8px'
    }}></span>
  );

  return (
    <div className="hidden print:block bg-white text-black p-12 max-w-[210mm] mx-auto font-serif text-[13px] leading-relaxed">
      {/* Header Section - Dùng DIV thay vì P */}
      <div className="flex justify-between items-center border-b-4 border-black pb-6 mb-10">
        <div className="w-1/2">
          <div className="text-3xl font-black uppercase font-sans tracking-tight leading-none mb-2">ENGQUEST PRODUCTION</div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase font-sans">
            <span>Academic Level: A1/A2</span>
            <span className="w-1 h-1 bg-black rounded-full"></span>
            <span>Week {weekId}</span>
          </div>
        </div>
        <div className="w-1/2 text-right">
          <div className="flex items-center justify-end font-sans font-black uppercase text-xs">
            Student Name: <HandLine w="200px" />
          </div>
          <div className="text-gray-400 text-[10px] font-bold uppercase mt-2">Topic: {weekTitle_en}</div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Section 1: Reading */}
        <section>
          <div className="font-sans font-black uppercase bg-black text-white px-3 py-1 mb-4 inline-block italic">1. Reading & Analysis</div>
          <div className="grid grid-cols-2 gap-10">
            <div className="p-6 bg-slate-50 border-2 border-slate-100 rounded-[35px] italic text-[11px] shadow-sm leading-loose">
              {stations?.read_explore?.content_en}
            </div>
            <div className="space-y-6">
              {stations?.read_explore?.comprehension_questions?.slice(0,3).map((q, i) => (
                <div key={i} className="flex flex-col">
                  <div className="font-bold text-indigo-900">{i+1}. {q.question_en}</div>
                  <HandLine />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Vocabulary Mastery */}
        <section>
          <div className="font-sans font-black uppercase bg-black text-white px-3 py-1 mb-4 inline-block italic">2. Vocabulary Handwriting</div>
          <table className="w-full border-collapse border-2 border-black">
            <thead className="bg-slate-100 font-sans text-[11px] uppercase border-b-2 border-black">
              <tr>
                <th className="border border-black p-3">Target Word</th>
                <th className="border border-black p-3">Linguistic Meaning</th>
                <th className="border border-black p-3 w-[45%]">Drill Practice (x3)</th>
              </tr>
            </thead>
            <tbody>
              {stations?.new_words?.vocab?.slice(0, 6).map((v, i) => (
                <tr key={i}>
                  <td className="border border-black p-4 font-black text-indigo-900 text-lg text-center">{v.word}</td>
                  <td className="border border-black p-4 italic text-slate-500 text-sm text-center">{v.definition_vi}</td>
                  <td className="border border-black p-2">
                    <HandLine /><HandLine /><HandLine />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 3: Writing Page */}
        <div className="force-break-before pt-10">
          <div className="font-sans font-black uppercase bg-black text-white px-3 py-1 mb-6 inline-block italic">3. Creative Mindmap Draft</div>
          <div className="p-8 bg-slate-50 border-4 border-dashed border-slate-300 rounded-[50px] mb-8 relative">
            <div className="absolute -top-3 left-10 bg-white px-3 font-black text-slate-400 text-[10px] uppercase">Linguistic Stimulus</div>
            <div className="italic text-2xl font-serif text-slate-800">"{stations?.writing?.prompt_en}"</div>
          </div>
          <div className="space-y-10">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="border-b-2 border-slate-200 h-8 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorksheetGenerator;
