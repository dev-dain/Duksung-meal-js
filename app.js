const express = require('express');
const fs = require('fs');
const app = express();

let meal;
fs.readFile('./meal.json', 'utf8', (err, data) => {
  if (err) throw err;
  meal = JSON.parse(data);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/keyboard', (req, res) => {
  const data = { 'type': 'text' }
  res.json(data);
});

app.post('/message', (req, res) => {
  const day = new Date();
  const today = day.getDay();
  const yoil = day.toString().slice(0, 3).toUpperCase();

  const question = req.body.userRequest.utterance;
  const goMain = '처음으로';
  const goBack = '뒤로가기';
  const selectDay = '요일지정';
  let data;

  if (question === '오늘') {
    if (yoil === 'SUN' || yoil === 'SAT') {
      data = {
        'version': '2.0',
        'template': {
          'outputs': [{
            'simpleText': {
              'text': '오늘은 주말입니다. :)'
            }
          }],
          'quickReplies': [{
            'label': goMain,
            'action': 'message',
            'messageText': goMain
          }]
        }
      }
    } else {
      data = {
        'version': '2.0',
        'template': {
          'outputs': [{
            'simpleText': {
              'text': `${meal[today].day} ${meal[today].student} ${meal[today].staff}`
            }
          }],
          'quickReplies': [{
            'label': goMain,
            'action': 'message',
            'messageText': goMain
          }]
        }
      }
    }
  } else if (question === '내일') {
    if (yoil === 'FRI' || yoil === 'SAT') {
      data = {
        'version': '2.0',
        'template': {
          'outputs': [{
            'simpleText': {
              'text': '내일은 주말입니다. :)'
            }
          }],
          'quickReplies': [{
            'label': goMain,
            'action': 'message',
            'messageText': goMain
          }]
        }
      }
    } else {
      data = {
        'version': '2.0',
        'template': {
          'outputs': [{
            'simpleText': {
              'text': `${meal[today + 1].day} ${meal[today + 1].student} ${meal[today + 1].staff}`
            }
          }],
          'quickReplies': [{
            'label': goMain,
            'action': 'message',
            'messageText': goMain
          }]
        }
      }
    }
  } else if (question === selectDay || question === goBack) {
    data = {
      'version': '2.0',
      'template': {
        'outputs': [{
          'simpleText': {
            'text': '요일을 선택하세요.'
          }
        }],
        'quickReplies': [{
          'label': '월',
          'action': 'message',
          'messageText': '월'
        }, {
          'label': '화',
          'action': 'message',
          'messageText': '화'
        }, {
          'label': '수',
          'action': 'message',
          'messageText': '수'
        }, {
          'label': '목',
          'action': 'message',
          'messageText': '목'
        }, {
          'label': '금',
          'action': 'message',
          'messageText': '금'
        }]
      }
    }
  } else if (question === '상시메뉴') {
    data = {
      'version': '2.0',
      'template': {
        'outputs': [{
          'simpleText': {
            'text': `${meal[0].meal}`
          }
        }],
        'quickReplies': [{
          'label': goMain,
          'action': 'message',
          'messageText': goMain
        }]
      }
    }
  } else if (question === '월' || question === '화' || question === '수' ||
            question === '목' || question === '금') {
    const dayObj = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5 };
    data = {
      'version': '2.0',
      'template': {
        'outputs': [{
          'simpleText': {
            'text': `${meal[dayObj[question]].day} ${meal[dayObj[question]].student} ${meal[dayObj[question]].staff}`
          }
        }],
        'quickReplies': [{
          'label': goBack,
          'action': 'message',
          'messageText': goBack
        }, {
	  'label': goMain,
	  'action': 'message',
	  'messageText': goMain
	}]
      }
    }
  } else {
    data = {
      'version': '2.0',
      'template': {
        'outputs': [{
          'simpleText': {
            'text': '개발 중이거나 오류입니다.\n' +
                    '개발자에게 문의해 주세요. \n' +
                    '이메일 : dev.dain.k@gmail.com'
          }
        }],
        'quickReplies': [{
          'label': goMain,
          'action': 'message',
          'messageText': goMain
        }]
      }
    }
  } 
  res.json(data);
});

app.listen(3000, () => console.log('node on 3000'));
