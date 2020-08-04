const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const mealObj = [];
/*
function changeMsg(meal) {
  const msg = '\n학식이 없는 날이거나 홈페이지에 등록되지 않았습니다.';
  return (meal.length < 2) ? msg : meal;
}
*/
(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.duksung.ac.kr/diet/schedule.do?menuId=1151');
  const content = await page.content();
  const $ = cheerio.load(content);

  const dayList = $("#schedule-table > thead > tr > th");
  dayList.each((index, list) => {
    if ($(list).find('br').length) {
      $(list).find('br').replaceWith('\n');
    }
    const day = $(list).text();
    mealObj.push({ day });
  });
  mealObj.shift();

  const mealList = $("#schedule-table > tbody > tr > td");
  mealList.each((index, list) => {
    if ($(list).find('br').length) {
      $(list).find('br').replaceWith('\n');
    }
    const meal = $(list).text();
    if (index < 5) {
      mealObj[index].student = meal;
    } else if (index === 10) {
      mealObj.unshift({ meal });
    } else {
      mealObj[index % 5].staff = meal;
    }
  });
/*
  mealObj[0].meal = changeMsg(mealObj[0].meal); 
  for (let i = 1; i < mealObj.length; i++) {
    mealObj[i].student = changeMsg(mealObj[i].student);
    mealObj[i].staff = changeMsg(mealObj[i].staff);
  }
*/
  fs.writeFile('./meal.json', JSON.stringify(mealObj), (err) => {
    if (err) throw err;
    console.log('OK');
  });

  await browser.close();
})();
