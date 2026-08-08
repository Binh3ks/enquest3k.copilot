export default {
  "title": "Relay Race & Speed Science Bar Models",
  "problems": [
    {
      "id": 1,
      "question_en": "Leo ran his relay lap in 12 seconds. Maya ran her lap 2 seconds faster than Leo. How long did Maya take?",
      "question_vi": "Leo chạy vòng tiếp sức trong 12 giây. Maya chạy nhanh hơn Leo 2 giây. Maya mất bao nhiêu thời gian?",
      "svg_image": "/images/week37/barmodel_w37_adv_p1.svg",
      "bar_model": {
        "bars": [
          {
            "label": "Leo",
            "value": 12,
            "unit": "s"
          },
          {
            "label": "Maya",
            "value": 10,
            "unit": "s"
          }
        ]
      },
      "solution": "12 - 2 = 10 seconds"
    },
    {
      "id": 2,
      "question_en": "A relay team covers a total distance of 400 metres across 4 equal laps. How long is each lap?",
      "question_vi": "Một đội tiếp sức chạy tổng quãng đường 400 mét qua 4 vòng bằng nhau. Mỗi vòng dài bao nhiêu mét?",
      "svg_image": "/images/week37/barmodel_w37_adv_p2.svg",
      "bar_model": {
        "bars": [
          {
            "label": "Total Distance",
            "value": 400,
            "unit": "m",
            "parts": 4
          }
        ]
      },
      "solution": "400 / 4 = 100 metres"
    }
  ]
};
