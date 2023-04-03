'use strict';

const express = require('express');
const app = express();

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', 'https://api20.tomkrok1.repl.co');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'What is worse than raining cats and dogs?',
    'response': 'Hailing taxis'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  }
];

app.get('/jokebook/categories', function (req, res) {
  res.type('text');
  //res.send(getCategories());
  res.json(categories);
  
});

app.get('/jokebook/joke/:category', function (req, res) {
  if(req.params['category'] === 'funnyJoke' || req.params['category'] === 'lameJoke') {
    res.json(getJokes(req.params['category']));
  } else {
    res.status(400).json({'error': 'no category listed for ' + req.params['category']});
  }
});

//function getCategories() {
//  let result = '';
//  for (let i = 0; i < categories.length; i++) {
//    result+= 'A possible category is ' +  categories[i] + '\n';
//    }
//  return result;
//}

function getJokes(category) {
  let number = 0;
  if (category === 'funnyJoke') {
    number = funnyJoke.length;
    return funnyJoke[Math.floor(Math.random() * number)];
  } else {
    number = lameJoke.length;
    return lameJoke[Math.floor(Math.random() * number)];
  }
}

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT);