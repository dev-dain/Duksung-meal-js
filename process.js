const fs = require('fs');

function changeMsg(meal) {
  const msg = '학식이 없는 날이거나 홈페이지에 등록되지 않았습니다.\n';
  return (meal.length < 2) ? msg : meal;
}

let mealObj;

fs.readFile('./meal.json', 'utf8', (err, data) => {
  if (err) throw err;
  mealObj = JSON.parse(data);
  
  mealObj[0].meal = '\n*상시메뉴\n'.concat(changeMsg(mealObj[0].meal)); 
  for (let i = 1; i < mealObj.length; i++) {
    mealObj[i].student = '\n*학생식당\n'.concat(changeMsg(mealObj[i].student));
    mealObj[i].staff = '\n*교직원식당\n'.concat(changeMsg(mealObj[i].staff));
  }

  fs.writeFile('./meal.json', JSON.stringify(mealObj), (err) => {
    if (err) throw err;
    console.log(new Date());
    console.log('OK');
  });
});
