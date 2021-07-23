
# Duksung-meal-js
덕성여대 학식알리미 코드 저장소  
---
**덕성여자대학교 학식알리미 카카오톡 챗봇** 소스 코드를 관리합니다.  
Node.js로 만든 챗봇입니다.  
이 코드는 MIT 라이선스 하에 사용 가능합니다.  

[카카오톡 채널 바로가기](https://pf.kakao.com/_qQnHC)  

---
## 사용 예시
![image](https://user-images.githubusercontent.com/43867665/126763274-1b1b837f-1b27-4a95-bfca-35fc751351d9.png)    
구 버전  
![image](https://user-images.githubusercontent.com/43867665/126763335-9ffd5e14-4ea0-4f02-9f68-27c830c5f44c.png)  
최근
- 기존에 매일매일 메뉴가 달라지던 방식과 달리 2020년을 기점으로 학생회관에 업체들이 입점하여 매일 같은 메뉴를 준비하고 있음  
-  따라서, 덕성여대 학식알리미는 *2022년 2월 종료될 예정* 

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
## 사용 방법
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
