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
    |   |	├── 📄accounts.js
    |   |	├── 📄board.js
    |   |	├── 📄comment.js
    |   |	├── 📄image.js
    |   |	├── 📄index.js
    |   |	└── 📄user.js
    |   └── 📄index.js
    ├── 📂conifg
    |   ├── 📄account.js
    |   └── 📄index.js
    ├── 📂loaders
    |   ├──📄event.js
    |   ├──📄express.js
    |   ├──📄index.js
    |   ├──📄logger.js
	|	├──📄mariadb.js
	|	├──📄multer.js
	|	└──📄passport.js
    ├── 📂models
	|	├──📄Account.js
	|	├──📄Comment.js
	|	├──📄Post.js
	|	├──📄Recommend.js
	|	└──📄User.js
    ├── 📂services
	|	├──📄accounts.js
	|	├──📄board.js
	|	├──📄comment.js
	|	├──📄recommend.js
	|	└──📄user.js
    └── 📄app.js
    📄 .env.example
    📄 .eslintrc.js
    📄 .prettierrc.json
    📄 base.sql
    📄 package.json
    📄 README.md
```

# DB Schema
[DB Schema](DB%20Schema.md) 참고

# REST API
[REST API](REST%20API.md) 참고