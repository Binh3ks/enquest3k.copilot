// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Mind Map Station — Easy Mode

const mindMapContent = {
  centerStems: [
    {
      text: "I had an accident when ___.",
      audio: "/audio/week33_easy/mindmap_stem_a3k7m.mp3"
    },
    {
      text: "I ___ my knee on ___.",
      audio: "/audio/week33_easy/mindmap_stem_b6p2v.mp3"
    },
    {
      text: "I ___ down and ___ a ___.",
      audio: "/audio/week33_easy/mindmap_stem_c9w4j.mp3"
    },
    {
      text: "My ___ ___ a lot.",
      audio: "/audio/week33_easy/mindmap_stem_d2f8d.mp3"
    },
    {
      text: "The nurse ___ a ___ ___ on my ___.",
      audio: "/audio/week33_easy/mindmap_stem_e5h3c.mp3"
    },
    {
      text: "I learned: always ___ ___.",
      audio: "/audio/week33_easy/mindmap_stem_f7s1x.mp3"
    }
  ],
  branchLabels: {
    "I had an accident when ___.": [
      { text: "I ran in the corridor", audio: "/audio/week33_easy/mindmap_branch_a1m2p.mp3" },
      { text: "I was late for class", audio: "/audio/week33_easy/mindmap_branch_a2n7q.mp3" },
      { text: "I slipped on the wet floor", audio: "/audio/week33_easy/mindmap_branch_a3w8j.mp3" },
      { text: "I played too fast", audio: "/audio/week33_easy/mindmap_branch_a4h4c.mp3" },
      { text: "I did not look where I walked", audio: "/audio/week33_easy/mindmap_branch_a5s6x.mp3" },
      { text: "I ran to catch the ball", audio: "/audio/week33_easy/mindmap_branch_a6k9w.mp3" }
    ],
    "I ___ my knee on ___.": [
      { text: "hit / the table", audio: "/audio/week33_easy/mindmap_branch_b1p3r.mp3" },
      { text: "bumped / the wall", audio: "/audio/week33_easy/mindmap_branch_b2q8b.mp3" },
      { text: "hurt / a chair", audio: "/audio/week33_easy/mindmap_branch_b3v1d.mp3" },
      { text: "scraped / the floor", audio: "/audio/week33_easy/mindmap_branch_b4x4y.mp3" },
      { text: "hit / the corner", audio: "/audio/week33_easy/mindmap_branch_b5m6t.mp3" },
      { text: "banged / the door", audio: "/audio/week33_easy/mindmap_branch_b6n2k.mp3" }
    ],
    "I ___ down and ___ a ___.": [
      { text: "fell / broke / cup", audio: "/audio/week33_easy/mindmap_branch_c1f7v.mp3" },
      { text: "slipped / broke / plate", audio: "/audio/week33_easy/mindmap_branch_c2h5c.mp3" },
      { text: "tripped / broke / glass", audio: "/audio/week33_easy/mindmap_branch_c3s3x.mp3" },
      { text: "fell / hurt / knee", audio: "/audio/week33_easy/mindmap_branch_c4k2w.mp3" },
      { text: "slipped / tore / paper", audio: "/audio/week33_easy/mindmap_branch_c5m9p.mp3" },
      { text: "fell / bit / tongue", audio: "/audio/week33_easy/mindmap_branch_c6n4j.mp3" }
    ],
    "My ___ ___ a lot.": [
      { text: "knee hurt", audio: "/audio/week33_easy/mindmap_branch_d1p8m.mp3" },
      { text: "arm hurt", audio: "/audio/week33_easy/mindmap_branch_d2q2r.mp3" },
      { text: "head hurt", audio: "/audio/week33_easy/mindmap_branch_d3v5d.mp3" },
      { text: "hand hurt", audio: "/audio/week33_easy/mindmap_branch_d4x7y.mp3" },
      { text: "tongue hurt", audio: "/audio/week33_easy/mindmap_branch_d5m1t.mp3" },
      { text: "finger hurt", audio: "/audio/week33_easy/mindmap_branch_d6n5k.mp3" }
    ],
    "The nurse ___ a ___ ___ on my ___.": [
      { text: "put / cold pack / knee", audio: "/audio/week33_easy/mindmap_branch_e1f4v.mp3" },
      { text: "gave / bandage / arm", audio: "/audio/week33_easy/mindmap_branch_e2h8c.mp3" },
      { text: "cleaned / cut / knee", audio: "/audio/week33_easy/mindmap_branch_e3s9x.mp3" },
      { text: "checked / swelling / head", audio: "/audio/week33_easy/mindmap_branch_e4k3w.mp3" },
      { text: "gave / ice pack / arm", audio: "/audio/week33_easy/mindmap_branch_e5m2p.mp3" },
      { text: "sat with / hurt boy / nurse room", audio: "/audio/week33_easy/mindmap_branch_e6n1j.mp3" }
    ],
    "I learned: always ___ ___.": [
      { text: "walk carefully", audio: "/audio/week33_easy/mindmap_branch_f1p6m.mp3" },
      { text: "look where I go", audio: "/audio/week33_easy/mindmap_branch_f2q3r.mp3" },
      { text: "tell the truth", audio: "/audio/week33_easy/mindmap_branch_f3v8d.mp3" },
      { text: "be careful at school", audio: "/audio/week33_easy/mindmap_branch_f4x2y.mp3" },
      { text: "listen to the teacher", audio: "/audio/week33_easy/mindmap_branch_f5m4t.mp3" },
      { text: "not run in corridors", audio: "/audio/week33_easy/mindmap_branch_f6n7k.mp3" }
    ]
  }
};

export default mindMapContent;
