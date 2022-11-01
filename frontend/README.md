# Mili Dream frontend | Next.js

## frontend 실행
먼저, clone한 git repogitory 안에서 frontend 폴더로 들어갑니다.  
이후, 실행 명령을 내려주면 됩니다.  

```bash
$ cd frontend
$ npm install
$ npm run dev
# or
$ yarn install
$ yarn dev
```

이후 브라우저에서 [http://localhost:3000](http://localhost:3000) 이 주소로 들어가면 프로젝트를 볼 수 있습니다.

## [API routes](https://nextjs.org/docs/api-routes/introduction)
만약, 백엔드 서버를 함께 실행시키고, .env 파일에 백엔드 서버 주소값을 알맞게 넣은 상태라면 프론트엔드의 url로 백엔드 API에 접근이 가능합니다.   

`http://localhost:3000/api/`이 이후에 [백엔드 API 명세서](https://github.com/osamhack2022/WEB_MiliDream_Dreamers/wiki/Backend-%EC%84%A4%EB%AA%85-%EB%B0%8F-API-%EB%AA%85%EC%84%B8%EC%84%9C)를 참고하여 추가적인 route를 붙여 백엔드에 query를 날릴 수 있습니다.  
