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
  const data = {'type': 'text'}
  res.json(data);
});

app.post('/message', (req, res) => {
  const day = new Date();
  const today = day.getDay();
  const yoil = day.toString().slice(0,3).toUpperCase();
  
  const question = req.body.userRequest.utterance;
  const goMain = '처음으로';
  const goBack = '뒤로 가기';
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
  }
  res.json(data);
});

app.listen(3000, () => console.log('node on 3000'));
