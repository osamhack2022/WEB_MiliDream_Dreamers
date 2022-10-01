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

마지막 명령어를 실행하기 전 `milidream_db`라는 데이터베이스가 있으면 안됩니다!

만약 있다면 `drop database milidream_db;`

위 명령어를 실행하면 다음과 같이 뜨면 됩니다.
```
classKey        classContent
1       미정
2       병사
3       간부
4       군무원
userKey userName        id      passwd  classKey
1       username1       userid1 1b072274a5bb6d2b1bf1948bad724a13ca2ad51eef2bce42ebb8a1d640cffaaa        1
2       username2       userid2 4917c2a60a2d898906e16e61c602c4cbccae42b1f89d2da9f6e523031d0d5b3b        2
userKey userName        id      passwd  classContent
1       username1       userid1 1b072274a5bb6d2b1bf1948bad724a13ca2ad51eef2bce42ebb8a1d640cffaaa        미정
2       username2       userid2 4917c2a60a2d898906e16e61c602c4cbccae42b1f89d2da9f6e523031d0d5b3b        병사
```

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