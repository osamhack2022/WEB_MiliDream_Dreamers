import mariadb from 'mariadb';

export default async function () {
	const pool = mariadb.createPool({ //이 부분을 다른 곳으로 옮겨야 하나
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		connectionLimit: 5,
	});

	return {
		getConnection: async function (callback) {
			return pool.getConnection(callback);
		},
		end: async function (callback) {
			return pool.end();
		}
		//  커넥션 가져다가 쓴 후 각 커넥션 사용 후 release() 함수 호출 -> 풀 사용 종료 시 end() 함수 호출
	};
}
