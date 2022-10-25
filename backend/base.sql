drop database IF EXISTS milidream_db;
create database milidream_db;
use milidream_db;


create table Class(classKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					classContent TEXT /*CHARACTER SET utf8mb4*/ NOT NULL);

create table User (userKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				userName VARCHAR(20) UNIQUE KEY NOT NULL, 
				id VARCHAR(20) UNIQUE KEY NOT NULL, 
				passwd VARCHAR(64) NOT NULL,
				imgUrl VARCHAR(200),
				enlistment DATE,
				belong TEXT,
				servant VARCHAR(2),
				introduce TEXT,
				classKey INT NOT NULL,
				FOREIGN KEY(classKey) REFERENCES Class(classKey));

create table Category(categoryKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY, categoryName TEXT NOT NULL);

create table Post (
	postKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userKey INT,
	postTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	title TEXT NOT NULL,
	body TEXT NOT NULL,
	categoryKey INT NOT NULL,
	viewCount INT NOT NULL DEFAULT 0,
	FOREIGN KEY(userKey) REFERENCES User(userKey) ON UPDATE RESTRICT ON DELETE SET NULL,
	FOREIGN KEY(categoryKey) REFERENCES Category(categoryKey) ON UPDATE RESTRICT ON DELETE CASCADE
);

create table CareerPost(
	careerPostKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	competitionKey INT NOT NULL,
	recruitKey INT NOT NULL,
	FOREIGN KEY(competitionKey) REFERENCES Post(postKey) ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY(recruitKey) REFERENCES Post(postKey) ON UPDATE RESTRICT ON DELETE CASCADE
);

create table Recommenders(
	recommenderKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	postKey INT NOT NULL,
	userKey INT NOT NULL,
	FOREIGN KEY(postKey) REFERENCES Post(postKey) ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY(userKey) REFERENCES User(userKey) ON UPDATE RESTRICT ON DELETE CASCADE
);

create table Comment(
	commentKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userKey INT,
	body TEXT NOT NULL,
	postKey INT NOT NULL,
	commentTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	parentKey INT,
	FOREIGN KEY(userKey) REFERENCES User(userKey) ON UPDATE RESTRICT ON DELETE SET NULL,
	FOREIGN KEY(postKey) REFERENCES Post(postKey) ON UPDATE RESTRICT ON DELETE CASCADE
);

create table Objectives(
	objectiveKey INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userKey INT NOT NULL,
	title TEXT NOT NULL,
	progress VARCHAR(5) NOT NULL,
	explanation  TEXT NOT NULL,
	FOREIGN KEY(userKey) REFERENCES User(userKey) ON UPDATE RESTRICT ON DELETE CASCADE
);

-- FOREIGN KEY(parentKey) REFERENCES Comment(commentKey) ON UPDATE RESTRICT ON DELETE CASCADE

insert into Class (classContent) values ("미정"), ("병사"), ("간부"), ("군무원");

select * from Class;
insert into User (userName, id, passwd, classKey) values ("username1", "userid1", "1b072274a5bb6d2b1bf1948bad724a13ca2ad51eef2bce42ebb8a1d640cffaaa", 1),		-- userpassword1
												("username2", "userid2", "4917c2a60a2d898906e16e61c602c4cbccae42b1f89d2da9f6e523031d0d5b3b", 2);		-- userpassword2@
select * from User;
select User.userKey, User.userName, User.id, User.passwd, Class.classContent from User, Class where User.classKey=Class.classKey;

insert into Category (categoryName) values ("공모전&대회 리스트"), ("사람모집게시글"), ("코딩");
select * from Category;

insert into Post (userkey, title , body, categoryKey) values ("1","테스트용 공모전 제목1", "테스트용 공모전 내용1", "1"), ("2","테스트용 공모전 제목2", "테스트용 공모전 내용2", "1");
select * from Post;

insert into Comment(userKey, body, postKey, parentKey, commentTime) values (1, "HIHI", 1, NULL, "2022-10-09  10:47:36 "), (2, "HELLO", 1, 1, "2022-10-09  10:48:21 "), (2, "BYE", 1, NULL, "2022-10-09 10:52:13 ");
insert into Comment(userKey, body, postKey, parentKey, commentTime) values (1, "HIHI2", 2, NULL, "2022-10-09 15:06:09"), (2, "HELLO2", 2, 1, "2022-10-09 15:36:43"), (2, "BYE2", 1, NULL, "2022-10-09 16:13:41");


insert into Objectives(userKey, title, progress, explanation) values (1, "목표 테스트", "진행중", "목표 테스트 설명");
select * from Objectives;
