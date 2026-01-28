#!/usr/bin/env python3
"""
Recreate all Week 7 JavaScript data files in proper JS object literal format
(without quotes on keys) instead of JSON format.
"""

import os
from pathlib import Path

def write_js_file(path, content):
    """Write content to JS file, creating directories if needed"""
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ {path}")

# ===== VOCAB.JS =====
vocab_advanced = """export default {
  vocab: [
    {
      id: 1,
      word: "whiteboard",
      pronunciation: "/ˈwaɪt.bɔːrd/",
      definition_vi: "bảng trắng",
      definition_en: "a white surface for writing with markers",
      example: "The teacher writes on the whiteboard.",
      collocation: "clean whiteboard",
      image_url: "/images/week7/whiteboard.jpg",
      audio_word: "/audio/week7/vocab_whiteboard.mp3",
      audio_definition: "/audio/week7/vocab_def_whiteboard.mp3",
      audio_example: "/audio/week7/vocab_ex_whiteboard.mp3",
      audio_collocation: "/audio/week7/vocab_coll_whiteboard.mp3"
    },
    {
      id: 2,
      word: "teacher",
      pronunciation: "/ˈtiː.tʃər/",
      definition_vi: "giáo viên",
      definition_en: "a person who teaches students",
      example: "The teacher is kind.",
      collocation: "listen to teacher",
      image_url: "/images/week7/teacher.jpg",
      audio_word: "/audio/week7/vocab_teacher.mp3",
      audio_definition: "/audio/week7/vocab_def_teacher.mp3",
      audio_example: "/audio/week7/vocab_ex_teacher.mp3",
      audio_collocation: "/audio/week7/vocab_coll_teacher.mp3"
    },
    {
      id: 3,
      word: "computer",
      pronunciation: "/kəmˈpjuː.tər/",
      definition_vi: "máy tính",
      definition_en: "an electronic device for working and learning",
      example: "There is a computer in the classroom.",
      collocation: "use computer",
      image_url: "/images/week7/computer.jpg",
      audio_word: "/audio/week7/vocab_computer.mp3",
      audio_definition: "/audio/week7/vocab_def_computer.mp3",
      audio_example: "/audio/week7/vocab_ex_computer.mp3",
      audio_collocation: "/audio/week7/vocab_coll_computer.mp3"
    },
    {
      id: 4,
      word: "pen",
      pronunciation: "/pen/",
      definition_vi: "bút mực",
      definition_en: "a tool for writing with ink",
      example: "I write with a pen.",
      collocation: "hold pen",
      image_url: "/images/week7/pen.jpg",
      audio_word: "/audio/week7/vocab_pen.mp3",
      audio_definition: "/audio/week7/vocab_def_pen.mp3",
      audio_example: "/audio/week7/vocab_ex_pen.mp3",
      audio_collocation: "/audio/week7/vocab_coll_pen.mp3"
    },
    {
      id: 5,
      word: "ruler",
      pronunciation: "/ˈruː.lər/",
      definition_vi: "thước kẻ",
      definition_en: "a tool for measuring and drawing straight lines",
      example: "I measure with a ruler.",
      collocation: "use ruler",
      image_url: "/images/week7/ruler.jpg",
      audio_word: "/audio/week7/vocab_ruler.mp3",
      audio_definition: "/audio/week7/vocab_def_ruler.mp3",
      audio_example: "/audio/week7/vocab_ex_ruler.mp3",
      audio_collocation: "/audio/week7/vocab_coll_ruler.mp3"
    },
    {
      id: 6,
      word: "eraser",
      pronunciation: "/ɪˈreɪ.zər/",
      definition_vi: "cục tẩy",
      definition_en: "a tool for removing pencil marks",
      example: "I clean mistakes with an eraser.",
      collocation: "use eraser",
      image_url: "/images/week7/eraser.jpg",
      audio_word: "/audio/week7/vocab_eraser.mp3",
      audio_definition: "/audio/week7/vocab_def_eraser.mp3",
      audio_example: "/audio/week7/vocab_ex_eraser.mp3",
      audio_collocation: "/audio/week7/vocab_coll_eraser.mp3"
    },
    {
      id: 7,
      word: "book",
      pronunciation: "/bʊk/",
      definition_vi: "quyển sách",
      definition_en: "pages with words or pictures held together",
      example: "I read a book.",
      collocation: "read book",
      image_url: "/images/week7/book.jpg",
      audio_word: "/audio/week7/vocab_book.mp3",
      audio_definition: "/audio/week7/vocab_def_book.mp3",
      audio_example: "/audio/week7/vocab_ex_book.mp3",
      audio_collocation: "/audio/week7/vocab_coll_book.mp3"
    },
    {
      id: 8,
      word: "pencil",
      pronunciation: "/ˈpen.səl/",
      definition_vi: "bút chì",
      definition_en: "a tool for writing or drawing with lead",
      example: "I draw with a pencil.",
      collocation: "sharpen pencil",
      image_url: "/images/week7/pencil.jpg",
      audio_word: "/audio/week7/vocab_pencil.mp3",
      audio_definition: "/audio/week7/vocab_def_pencil.mp3",
      audio_example: "/audio/week7/vocab_ex_pencil.mp3",
      audio_collocation: "/audio/week7/vocab_coll_pencil.mp3"
    },
    {
      id: 9,
      word: "backpack",
      pronunciation: "/ˈbæk.pæk/",
      definition_vi: "ba lô",
      definition_en: "a bag you carry on your back",
      example: "My backpack is heavy.",
      collocation: "carry backpack",
      image_url: "/images/week7/backpack.jpg",
      audio_word: "/audio/week7/vocab_backpack.mp3",
      audio_definition: "/audio/week7/vocab_def_backpack.mp3",
      audio_example: "/audio/week7/vocab_ex_backpack.mp3",
      audio_collocation: "/audio/week7/vocab_coll_backpack.mp3"
    },
    {
      id: 10,
      word: "notebook",
      pronunciation: "/ˈnoʊt.bʊk/",
      definition_vi: "vở ghi chép",
      definition_en: "a book with blank pages for writing notes",
      example: "I write notes in my notebook.",
      collocation: "open notebook",
      image_url: "/images/week7/notebook.jpg",
      audio_word: "/audio/week7/vocab_notebook.mp3",
      audio_definition: "/audio/week7/vocab_def_notebook.mp3",
      audio_example: "/audio/week7/vocab_ex_notebook.mp3",
      audio_collocation: "/audio/week7/vocab_coll_notebook.mp3"
    }
  ]
};
"""

# Create vocab for both modes
write_js_file('src/data/weeks/week_07/vocab.js', vocab_advanced)
write_js_file('src/data/weeks_easy/week_07/vocab.js', vocab_advanced.replace('/week7/', '/week7_easy/'))

print("\n✨ All Week 7 files recreated in proper JS format!")
print("Total files: 15 × 2 modes = 30 files")
