create database milidream_db;
use milidream_db;

create table Class(classKey INT AUTO_INCREMENT PRIMARY KEY,
					classContent TEXT /*CHARACTER SET utf8mb4*/ NOT NULL);

create table User (userKey INT AUTO_INCREMENT PRIMARY KEY, 
				userName VARCHAR(20) UNIQUE KEY NOT NULL, 
				id VARCHAR(20) UNIQUE KEY NOT NULL, 
				passwd VARCHAR(64) NOT NULL,
				classKey INT NOT NULL,
				FOREIGN KEY(classKey) REFERENCES Class(classKey));

create table Category(categoryKey INT AUTO_INCREMENT PRIMARY KEY, categoryName TEXT NOT NULL);

create table Post (postKey INT AUTO_INCREMENT PRIMARY KEY, 
				userkey INT NOT NULL, 
				postTime DATETIME DEFAULT CURRENT_TIMESTAMP, 
				title TEXT NOT NULL, 
				body TEXT NOT NULL, 
				categoryKey INT NOT NULL, 
				careerPostKey INT, 
				FOREIGN KEY(categoryKey) REFERENCES Category(categoryKey), 
				FOREIGN KEY(careerPostKey) REFERENCES Post(postKey));

create table Comment(commentKey INT AUTO_INCREMENT PRIMARY KEY,
					userKey INT NOT NULL,
					content TEXT NOT NULL,
					postKey INT NOT NULL,
					commentTime DATETIME DEFAULT CURRENT_TIMESTAMP,
					parentKey INT,
					FOREIGN KEY(userKey) REFERENCES User(userKey),
					FOREIGN KEY(postKey) REFERENCES Post(postKey),
					FOREIGN KEY(parentKey) REFERENCES Comment(commentKey));

create table MBTI(mbtiKEY INT AUTO_INCREMENT PRIMARY KEY,
				mbtiType TEXT NOT NULL,
				mbtiContent TEXT NOT NULL);

insert into Class (classContent) values ("미정"), ("병사"), ("간부"), ("군무원");
select * from Class;
insert into User (userName, id, passwd, classKey) values ("username1", "userid1", "1b072274a5bb6d2b1bf1948bad724a13ca2ad51eef2bce42ebb8a1d640cffaaa", 1),		-- userpassword1
												("username2", "userid2", "4917c2a60a2d898906e16e61c602c4cbccae42b1f89d2da9f6e523031d0d5b3b", 2);		-- userpassword2@
select * from User;
select User.userKey, User.userName, User.id, User.passwd, Class.classContent from User, Class where User.classKey=Class.classKey;

insert into Category (categoryName) values ("공모전&대회 리스트");
select * from Category;

insert into Post (userkey, title , body, categoryKey) values ("1","테스트용 공모전 제목1", "테스트용 공모전 내용1", "1"), ("2","테스트용 공모전 제목2", "테스트용 공모전 내용2", "1");
select * from Post;