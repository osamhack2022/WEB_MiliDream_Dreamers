## backend 실행

```
$ cd backend
$ npm install
$ npm start
```

## MariaDB 실행

```
$ sudo apt update
$ sudo apt install mariadb-server=1:10.3.34-0ubuntu0.20.04.1
$ mariadb -V
mariadb  Ver 15.1 Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2

$ sudo service mysql start
$ sudo service mysql status

$ sudo mysql_secure_installation

$ sudo mysql -u root -p

MariaDB [(none)]> CREATE USER 'test'@'%' IDENTIFIED BY 'osam2022!@';
MariaDB [(none)]> GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, INDEX, ALTER, CREATE TEMPORARY TABLES, CREATE VIEW, EVENT, TRIGGER, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EXECUTE ON  *.* TO 'test'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
MariaDB [(none)]> flush privileges;
MariaDB [(none)]> exit;

$ sudo service mysql restart

$ sudo mysql -u test -p < backend/base.sql
```

마지막 명령어를 실행하기 전 `milidream_db`라는 데이터베이스가 있어도 실행하면 됩니다.

## Direcotry Structure

```
📂 backend
    📂src
    ├── 📂api
    |   ├── 📂middlewares
    |   |   └── 📄index.js
    |   ├── 📂routes
    |   └── 📄index.js
    ├── 📂conifg
    |   └── 📄index.js
    ├── 📂loaders
    |   ├──📄event.js
    |   ├──📄express.js
    |   ├──📄index.js
    |   ├──📄logger.js
	|	└──📄mariadb.js
    ├── 📂models
    ├── 📂services
    ├── 📂subscribers
    └── 📄app.js
    📄 .eslintrc.js
    📄 .prettierrc.json
    📄 package.json
    📄 README.md
```

## DB 구성
### Class

사용자를 구분하는 이름을 저장합니다.

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| classKey | INT | class들을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| classContent | TEXT | class명을 저장함 | NOT NULL |

### User

사용자들을 저장합니다. (Class 테이블은 없으나 key에 따른 구분명만 담는 테이블로 간주)

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| userKey | INT | 사람들을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| userName | VARCHAR(20) CHARACTER SET utf-8 | 사람들이 가입할 때 정하는 이름 | 익명을 지향한다면 사라질 수도 있음
UNIQUE KEY, NOT NULL |
| id | VARCHAR(20) | 로그인할 때 사용하는 id | UNIQUE KEY, NOT NULL |
| passwd | VARCHAR(64) | 로그인할 때 사용하는 password | 보안을 위해 SHA-256을 사용하여 hash로 저장, salt를 추가할 수 있음
NOT NULL |
| classkey(←Class) | INT | 밀리패스API 등으로 인증 후에 병인지 간부인지 등을 구분 | 밀리패스API를 사용하지 않을 수도 있고, 구분하는 필드가 필요없을 수도 있음
NOT NULL, DEFAULT 0, FOREIGN KEY |

### Category

게시글들을 구분하는 카테고리명을 key에 연결하는 테이블

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| categoryKey | INT | 카테고리를 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| categoryName | TEXT | 카테고리 이름 | NOT NULL |

### Post

작성한 게시글들을 저장합니다.

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| postKey | INT | 게시글들을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| userKey(←User) | INT | 작성한 게시자를 표시 | NOT NULL, FOREIGN KEY |
| postTime | DATETIME | 작성한 시간 저장 | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| title | TEXT | 게시글 제목 | NOT NULL |
| body | TEXT | 게시글에 작성한 글을 저장 | NOT NULL |
| imageURL | VARCHAR(200) | 서버에 저장된 이미지의 경로 저장 |  |
| categoryKey(←Category) | INT | 카테고리 저장 | NOT NULL, FOREIGN KEY |
| viewCount | INT | 게시글 조회수 저장 | NOT NULL, DEFAULT 0 |

### CareerPost

대회 게시 글과 사람 구하는 글을 이어주는 테이블

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| careerPostKey | INT | 각각을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| competitionKey(←Post) | INT | 대회 게시글을 저장 | NOT NULL, FOREIGN KEY |
| recruitKey(←Post) | INT | 사람 구하는 게시글을 저장 | NOT NULL, FOREIGN KEY |

### Recommenders

게시글에 따른 추천인을 저장합니다.

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| recommenderKey | INT | 각각을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| postKey(←Post) | INT | 추천한 게시글 | NOT NULL, FOREIGN KEY |
| userKey(←User) | INT | 추천한 사람 | NOT NULL, FOREIGN KEY |

### Comment

게시글에 달린 댓글들을 저장합니다.

| 이름 | 타입 | 설명 | 비고 |
| --- | --- | --- | --- |
| commentKey | INT | 댓글들을 구분함 | NOT NULL, AUTO_INCREMENT, PRIMARY KEY |
| userKey(←User) | INT | 댓글을 단 작성자를 표시 | NOT NULL, FOREIGN KEY |
| body | TEXT | 댓글 내용을 저장 | NOT NULL |
| postKey(←Post) | INT | 댓글이 달린 게시글을 표시 | NOT NULL, FOREIGN KEY |
| commentTime | DATETIME | 댓글이 달린 시간을 표시 | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| parentKey(←Comment) | INT | 답글인 경우 무엇에 대한 답글인지 댓글 표시 | FOREIGN KEY |

# REST API
## 로그인 관련

이 섹션의 password는 해시값으로 바뀔 수 있음

### POST /accounts/account

회원가입

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| id | O | string | 입력한 id |
	| passwd | O | string | 입력한 패스워드 |
	| username | O | string | 입력한 유저 이름 |
	| classType | O | string | [”미정”, “병사”, “간부”, “군무원”] 중 하나 |
	| token | O | string | 회원가입 토큰 |

- Behavior

	회원가입합니다.

- Return (type: application/json)

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| success | Boolean | 성공 여부 |

- Status Code

	201 회원가입 성공

	400 회원가입 실패

### DELETE /accounts/account

회원탈퇴

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| id | O | string | 입력한 id |

- Behavior

	회원탈퇴합니다. 해당 아이디로 로그인 된 세션 필요.

- Status Code

	204 성공적으로 회원탈퇴 됨

### GET /accounts/signup-token

약관 동의시 발급하는 회원가입 토큰

- Query Parameter

	없음

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| token | string | 16글자 랜덤생성, 회원가입api 요청시 사용 |

### POST /accounts/sign

로그인

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| id | O | string | 입력한 id |
	| password | O | string | 입력한 password |

- Behavior

	성공시 로그인 세션처리가 완료

- Return (type: application/json)

	로그인 성공 시에만 반환

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| userKey | number | user들을 구분하는 key, id가 아님에 주의 |
	| userId | string | 아이디 |
	| userName | string | 닉네임 |
	| classKey | number | 클래스 |

- Status Code

	200 로그인 성공

	401 로그인 실패

### DELETE /accounts/sign

로그아웃

- Behavior

	세션 있을 경우, 삭제

- Status Code

	204 성공

### POST /accounts/attempt

id, username 등 조건을 충족하는지를 점검한다.

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| id | X | string? | 입력한 id |
	| username | X | string? | 입력한 유저 이름 |
	| token | O | string |  |
	- [id, username] 중 하나는 존재해야 함

- Behavior

	입력된 값만 검증해서 응답

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

- Status Code

	200 모든 값이 유효함

	400 값이 유효하지 않음

	401 회원가입 토큰이 유효하지 않음

## User 관련

### GET /user/:userId

user의 정보를 얻어온다. password는 얻어오지 않는다.

- Path Variable

	| 변수명 | 타입 | 설명 |
	| --- | --- | --- |
	| userId | int | user들을 구분하는 key, id가 아님에 주의 |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| userName | string | 유저가 설정한 이름/닉네임 |
	| id | string | 유저가 로그인할 때 사용하는 id |
	| classType | string | [미정, 병사, 간부, 군무원] 중 하나 |

### PUT /user/:userId

User의 password 등 정보를 바꾼다.

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| userId | int | user들을 구분하는 key, 로그인할 때 사용하는 id가 아님에 주의 |

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| new_password | O | string | 유저가 입력한 새로운 password |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

## 게시글 관련

```tsx
type board = {
	postKey: number;
	userKey: number;
	categoryKey: number;
	categoryName: string;
	postTime: string;
	title: string;
	body: string;
	viewCount: number;
	recommenders: number[];
	comments: [comment](https://www.notion.so/Rest-API-doc-b4f6105d8f8647188d50a927a9e5e938)[];
	recruitPosts: board[];
}
```

### GET /board

postboard의 모든 게시글**(대회 게시판, 인원 모집 게시판은 제외)**을 가져옴

- Query Parameter

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| categoryKey | X | int | 게시글을 구분하는 카테고리, 주어지지 않는다면 모든 게시글을 반환함 |
	- Query Parameter에 게시글 쪽수를 받아서 필요한 만큼만 반환하는 것도 고려해볼만 함

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boards | board[] | 게시글 목록 |

- Expected Behavior

	- categoryKey가 주어지지 않는 경우 - Ok
	- categoryKey가 정수인 경우 - Ok
	- cateogryKey가 정수가 아닌 경우 - Ok

### POST /board

postboard에 게시글을 작성

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| categoryKey | O | int | 게시글을 구분하는 카테고리 |
	| title | O | string | 게시글의 제목 |
	| body | O | string | 게시글의 내용 |
	| userKey | O | int | 게시글을 쓴 사람의 ID |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| postKey | int | 올린 게시글의 Key값을 반환함 |

- Expected Behavior

	- 필수인 JSON Body가 안 오면 - Error
	- 

### GET /board/query

query에 해당하는 게시글을 가져옴

- Query Parameter

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| title | X | string | 검색하고 싶은 제목, 똑같진 않더라도 포함되면 결과를 반환해줌 |
	| username | X | string | 게시글을 작성한 사용자 |
	| content | X | string | 제목, 게시글 내용을 포함하여 검색 |
	| tag | X | string | 해당 태그 내에서 검색 |
	- 최소한 하나 이상은 있어야 함

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boards | postboard[] | 게시글 목록 |

### GET /board/tags

모든 태그들을 가져옴

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| tags | string[] | 태그 목록 |

## 게시글 각각

### GET /board/:boardId

boardid가 id인 게시글을 가져옴, viewCount도 올린다.

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 key |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| board | board | 게시글, 댓글은 시간순으로 정렬되어있음 |

### PUT /board/:boardId

boardId인 게시글을 수정

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 id |

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| title | O | string | 게시글의 제목 |
	| body | O | string | 게시글의 내용 |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

### DELETE /board/:boardId

id인 게시글을 삭제

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 id |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

## 게시글 추천 기능

### GET /board/:boardId/recommend

boardId인 게시글에 대응하는 추천인을 조회합니다. 특정 사용자가 있는지만 조회할 수도 있습니다.

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 id |

- Query Parameter

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| userKey | X | int | User을 구분하는 Key |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| recommenderList | int[] | userKey가 주어지지 않은 경우 반환함, 게시글을 추천한 userKey를 리스트로 반환함 |
	| didRecommend | bool | userKey가 주어진 경우 반환함, userKey가 추천했는지 안 했는지 반환 |

### POST /board/:boardId/recommend

boardId인 게시글에 대응하는 추천인을 추가합니다.

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 Key |

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| userKey | O | int | 유저의 Key |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| recommendCount | int | 현재 추천수를 반환함 |

### DELETE /board/:boardId/recommend

boardId인 게시글에 대응하는 추천인을 삭제합니다.

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| boardId | int | board를 구분하는 Key |

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| userKey | O | int | 유저의 Id |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| recommendCount | int | 현재 추천수를 반환함 |

## 댓글

```tsx
type childcomment = {
	commentKey: number;
	userKey: number;
	commentTime: string;
	body: string;
}

type comment = childcomment & {
	childComments: childcomment[];
}
```

### POST /comment

Id가 boardId인 게시글에 댓글 추가

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| userKey | O | int | 유저의 Key |
	| postKey | O | int | 게시글의 Key |
	| body | O | string | 댓글 내용 |
	| parentKey | X | int | 답글일 경우 무슨 코멘트에 대한 답글인지, 그 코멘트의 Key |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

### PUT /comment/:commentId

id인 댓글을 수정

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| commentId | int | comment를 구분하는 id |

- JSON Body Parameters

	| 키 | 필수인가? | 타입 | 설명 |
	| --- | --- | --- | --- |
	| body | O | string | 댓글 내용 |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |

## DELETE /comment/:commentId

id인 댓글을 삭제

- Path Parameters

	| 키 | 타입 | 설명 |
	| --- | --- | --- |
	| commentKey | int | comment를 구분하는 id |

- Return

	| 키 | 타입 | 설명 |
	| --- | --- | --- |