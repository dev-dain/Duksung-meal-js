
# Duksung-meal-js
덕성여대 학식알리미 코드 저장소  
---
## Warning
- 기존에 매일매일 메뉴가 달라지던 방식과 달리 학생회관에 업체들이 입점하여 매일 같은 메뉴를 준비하고 있습니다.
  - 따라서, 덕성여대 학식알리미는 *2022년 2월*을 기점으로 완전히 종료되었으며, 코드 저장소는 업데이트되지 않습니다.  
---
## 설명
- **덕성여자대학교 학식알리미 카카오톡 챗봇** 소스 코드를 관리합니다.  
- Node.js로 만든 챗봇입니다. Python django로 만든 챗봇의 소스 코드는 [여기](https://github.com/dev-dain/Duksung-meal-for-kakao)에 있습니다.  
- 이 코드는 MIT 라이선스 하에 사용 가능합니다.  
- [카카오톡 채널 바로가기](https://pf.kakao.com/_qQnHC)  

구 버전  
![image](https://user-images.githubusercontent.com/43867665/126763274-1b1b837f-1b27-4a95-bfca-35fc751351d9.png)    
최근  
![image](https://user-images.githubusercontent.com/43867665/126763335-9ffd5e14-4ea0-4f02-9f68-27c830c5f44c.png)   

---
## 개발환경 & 모듈
- Ubuntu 18.04.5 (Amazon EC2 t2.micro)
- nginx/1.14.0 (ubuntu) 
- Node 14.7.0
- npm 6.14.7 
- express 4.17.1
- cheerio 1.0.0
- puppeteer 5.3.0

---
## 설치 및 사용 방법
```
git init
git remote add origin https://github.com/dev-dain/Duksung-meal-js
git pull origin master
npm install
node crawl.js
node process.js
node app.js
```
**Tip** 크론탭을 사용하여 crawl.js, process.js를 한 번에 묶고, app.js를 실행시키면 좋다.

---
## 파일
- app.js
  - 카카오톡 챗봇 빌더와 상응해, 사용자가 어떤 버튼을 누르거나 키보드를 누를 때 분기를 나눠주는 역할을 함
- crawl.js
  - puppeteer를 사용해 학교 홈페이지에서 학식 테이블 정보를 가져와 meal.json이라는 파일에 저장함
  - 실질적으로 학식 크롤링을 담당하는 파일로, 매주마다 최소 1회는 실행하는 것이 좋음
- process.js
  - crawl.js의 결과로 나온 meal.json 파일을 가공해 상시메뉴, 학생식당, 교직원식당 메뉴라는 pre-text를 붙여줌
