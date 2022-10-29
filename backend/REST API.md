# REST API

1. [로그인 관련](#로그인-관련)
	1. [POST /accounts/account](#post-accountsaccount)
	2. [DELETE /accounts/account](#delete-accountsaccount)
	3. [GET /accounts/signup-token](#get-accountssignup-token)
	4. [POST /accounts/sign](#post-accountssign)
	5. [DELETE /accounts/sign](#delete-accountssign)
	6. [POST /accounts/attempt](#post-accountsattempt)
2. [User 관련](#user-관련)
	1. [GET /user](#get-user)
	2. [GET /user/:userId](#get-useruserid)
	3. [PUT /user/:userId](#put-useruserid)
3. [게시글 관련](#게시글-관련)
	1. [GET /board](#get-board)
	2. [POST /board](#post-board)
	3. [GET /board/query](#get-boardquery)
	4. [GET /board/tags](#get-boardtags)
4. [게시글 각각](#게시글-각각)
	1. [GET /board/:boardId](#get-boardboardid)
	2. [PUT /board/:boardId](#put-boardboardid)
	3. [DELETE /board/:boardId](#delete-boardboardid)
4. [게시글 추천 기능](#게시글-추천-기능)
	1. [GET /board/:boardId/recommend](#get-boardboardidrecommend)
	2. [POST /board/:boardId/recommend](#post-boardboardidrecommend)
	3. [DELETE /board/:boardId/recommend](#delete-boardboardidrecommend)
5. [댓글](#댓글)
	1. [POST /comment](#post-comment)
	2. [PUT /comment/:commentId](#put-commentcommentid)
	3. [DELETE /comment/:commentId](#delete-commentcommentid)
6. [이미지](#이미지)
	1. []
7. [목표](#목표)
	1. [GET /objective](#get-objective)
	2. [POST /objective](#post-objective)
	3. [GET /objective/:objectiveId](#get-objectiveobjectiveid)
	4. [PUT /objective/:objectiveId](#put-objectiveobjectiveid)
	5. [DELETE /objective/:objectiveId](#delete-objectiveobjectiveid)


# 로그인 관련

이 섹션의 password는 해시값으로 바뀔 수 있음

## GET /accounts/sign

로그인 된 회원 정보를 가져옵니다.

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| userKey | number | user들을 구분하는 key, id가 아님에 주의 |
| userId | string | 아이디 |
| userName | string | 닉네임 |
| userClass | number | 클래스 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 401 | JSON |  |

## POST /accounts/sign

로그인

- 성공시 로그인 세션처리가 완료

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| id | O | string | 입력한 id |
| password | O | string | 입력한 password |

### Return

로그인 성공 시에만 반환

| 키 | 타입 | 설명 |
| --- | --- | --- |
| userKey | number | user들을 구분하는 key, id가 아님에 주의 |
| userId | string | 아이디 |
| userName | string | 닉네임 |
| classKey | number | 클래스 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 401 | TEXT | Unauthorized |

## DELETE /accounts/sign

로그아웃

- 세션 있을 경우, 삭제

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400 | JSON |  |

## POST /accounts/account

회원가입

> 회원가입 후 자동으로 로그인 되게? 안 되게?
안되게 해뒀습니다.
> 

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| userId | O | string | 입력한 id |
| password | O | string | 입력한 패스워드 |
| userName | O | string | 입력한 유저 이름 |
| userClass | O | number | class를 지칭하는 숫자 |
| token | O | string | 회원가입 토큰 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400 | JSON |  |

## DELETE /accounts/account

회원탈퇴

### Behavior

로그인 되어 있는 계정을 회원탈퇴합니다.

회원탈퇴 되면 로그아웃됩니다.

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400, 401 | JSON |  |

## GET /accounts/signup-token

약관 동의시 발급하는 회원가입 토큰

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| token | string | 16글자 랜덤생성, 회원가입api 요청시 사용 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |

## POST /accounts/attempt

id, username 등 조건을 충족하는지를 점검한다.

- 입력된 값만 검증해서 응답

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| userId | X | string? | 입력한 id |
| userName | X | string? | 입력한 유저 이름 |
| token | O | string |  |
- [id, username] 중 하나는 존재해야 함

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400 | JSON |  |

# User 관련

## GET /user

redirect /user/[signed userId]

## GET /user/:userId

user의 정보를 얻어온다. password는 얻어오지 않는다.

### Path Variable

| 변수명 | 타입 | 설명 |
| --- | --- | --- |
| userId | int | user들을 구분하는 key, id가 아님에 주의 |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| userName | string | 유저가 설정한 이름/닉네임 |
| id | string | 유저가 로그인할 때 사용하는 id |
| classType | string | [미정, 병사, 간부, 군무원] 중 하나 |

## PUT /user/:userId

User의 password 등 정보를 바꾼다.

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| userId | int | user들을 구분하는 key, 로그인할 때 사용하는 id가 아님에 주의 |

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| new_password | O | string | 유저가 입력한 새로운 password |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |

# 게시글 관련

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
	// recommenders: number[];
	recommenderCount: number;
	comments: [comment](https://www.notion.so/Rest-API-doc-b4f6105d8f8647188d50a927a9e5e938)[];
	recruitPosts: board[];
}

type board_detail = board & {
	didRecommend: boolean;
}

type category = {
	categoryKey: number;
	categoryName: string;
}
```

## GET /board

postboard의 모든 게시글**(대회 게시판, 인원 모집 게시판은 제외)**을 가져옴

### Query Parameter

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| categoryKey | X | int | 게시글을 구분하는 카테고리, 주어지지 않는다면 모든 게시글을 반환함 |
- Query Parameter에 게시글 쪽수를 받아서 필요한 만큼만 반환하는 것도 고려해볼만 함

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boards | board[] | 게시글 목록 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400 | JSON |  |

## POST /board

로그인 된 사용자만 가능

postboard에 게시글을 작성

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| categoryKey | O | int | 게시글을 구분하는 카테고리 |
| title | O | string | 게시글의 제목 |
| body | O | string | 게시글의 내용 |
| careerPostKey | X | int | 사람모집 게시글일 경우, 대회 게시글에 해당하는 게시글의 Key |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| postKey | int | 올린 게시글의 Key값을 반환함 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400, 401 | JSON |  |

## GET /board/query

query에 해당하는 게시글을 가져옴

### Query Parameter

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| title | X | string | 검색하고 싶은 제목, 똑같진 않더라도 포함되면 결과를 반환해줌 |
| userName | X | string | 게시글을 작성한 사용자 |
| content | X | string | 제목, 게시글 내용을 포함하여 검색 |
| tag | X | string | 해당 태그 내에서 검색 |
- 최소한 하나 이상은 있어야 함

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boards | board[] | 게시글 목록 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400 | JSON |  |

## GET /board/category

모든 카테고리들을 가져옴

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| category | category[] | 카테고리 목록 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400 | JSON |  |

# 게시글 각각

## GET /board/:boardId

로그인 되어 있어야 합니다.

boardId가 id인 게시글을 가져옴, viewCount도 올린다.

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 key |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| board | board_detail | 게시글, 댓글은 시간순으로 정렬되어있음 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400, 401 | JSON |  |

## PUT /board/:boardId

로그인이 되어 있어야 합니다.

boardId인 게시글을 수정

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 id |

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| title | O | string | 게시글의 제목 |
| body | O | string | 게시글의 내용 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400, 401 | JSON |  |

## DELETE /board/:boardId

로그인이 되어 있어야 합니다.

boardId인 게시글을 삭제

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 id |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400, 401 | JSON |  |

# 게시글 추천 기능

## GET /board/:boardId/recommend

boardId인 게시글에 대응하는 추천인을 조회합니다.

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 id |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| recommenderList | int[] | 게시글을 추천한 userKey를 리스트로 반환함 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400 | JSON |  |

## POST /board/:boardId/recommend

로그인 되어 있는 상태여야 합니다.

boardId인 게시글에 대응하는 추천인을 추가합니다.

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 Key |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| recommendCount | int | 현재 추천수를 반환함 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400, 401 | JSON |  |

## DELETE /board/:boardId/recommend

로그인되어 있는 상태여야 합니다.

boardId인 게시글에 대응하는 추천인을 삭제합니다.

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| boardId | int | board를 구분하는 Key |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| recommendCount | int | 현재 추천수를 반환함 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400, 401 | JSON |  |

# 댓글

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

## POST /comment

로그인 되어 있어야 함

postKey인 게시글에 댓글 추가

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| postKey | O | int | 게시글의 Key |
| body | O | string | 댓글 내용 |
| parentKey | X | int | 답글일 경우 무슨 코멘트에 대한 답글인지, 그 코멘트의 Key |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| comment | childcomment | 올린 댓글을 반환

childComments 필드는 없는 childcomment type임에 유의 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400, 401 | JSON |  |

## PUT /comment/:commentId

로그인 되어 있어야 함

commentId인 댓글을 수정

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| commentId | int | comment를 구분하는 id |

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| body | O | string | 댓글 내용 |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400, 401 | JSON |  |

## DELETE /comment/:commentId

로그인 되어 있어야 함

commentId인 댓글을 삭제

### Path Parameters

| 키 | 타입 | 설명 |
| --- | --- | --- |
| commentKey | int | comment를 구분하는 id |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | NULL |  |
| 실패 | 400, 401 | JSON |  |

# 이미지

## POST /image/upload

파일을 올립니다.

Content-Type: multipart/form-data

```html
<form action="/api/image/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="img" />
</form>
```

### JSON Body Parameters

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| img | O | file | 이미지 파일 |

### Return

| 키 | 타입 | 설명 |
| --- | --- | --- |
| path | string | 파일을 올린 경로를 반환합니다. |

### Status Code

|  | Status Code | 형식 | 설명 |
| --- | --- | --- | --- |
| 성공 | 200 | JSON |  |
| 실패 | 400 | JSON |  |

# 목표

## GET /objective

로그인되어 있어야 합니다.

본인의 모든 목표를 가져옵니다.

## POST /objective

로그인되어 있어야 합니다.

목표를 생성합니다.

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| title | O | string |  |
| progress | O | string |  |
| explain | O | string |  |

## GET /objective/:objectiveId

objectiveId에 해당하는 목표만 반환합니다.

## PUT /objective/:objectiveId

로그인되어 있어야 합니다.

objectiveId에 해당하는 목표의 progress를 수정합니다.

| 키 | 필수인가? | 타입 | 설명 |
| --- | --- | --- | --- |
| title | O | string |  |
| progress | O | string |  |
| explain | O | string |  |

## DELETE /objective/:objectiveId

로그인되어 있어야 합니다.

objectiveId에 해당하는 목표를 삭제합니다.