const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const mealObj = [];

(async() => {
  try {
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

    fs.writeFile('./meal.json', JSON.stringify(mealObj), (err) => {
      if (err) throw err;
      console.log('OK');
    });
    console.log(new Date());
    await browser.close();
  } catch (err) {
    console.error(err); 
  }
})();
