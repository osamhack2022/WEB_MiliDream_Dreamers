import mariadb from 'mariadb';
import dbInfo from '../config/tmpdbconfig';


export default async function () {
	const pool = mariadb.createPool({ //이 부분을 다른 곳으로 옮겨야 하나
		host: dbInfo.DB_HOST,
		port: dbInfo.DB_PORT,
		user: dbInfo.DB_USER,
		password: dbInfo.DB_PASS,
		connectionLimit: 5,
	});

	return {
		getConnection: async function (callback) {
			return pool.getConnection(callback);
		},
		end: async function (callback) {
			return pool.end();
		}
		/*
		정확하지 않음, 사용하지 않아도 된다고 하는 내용도.. 추가 조사 후 수정
		relase()를 굳이 여기서 메소드로 안보내줘도 connection 함수 콜백 두번째 인수로 사용 가능한 것 같음
		이 경우 relase는 지우기
		*/
		//  release() 함수는 Pool이 아닌 PoolConnection에 대해 호출해줘야 합니다.
		//  커넥션 가져다가 쓴 후 각 커넥션 사용 후 release() 함수 호출 -> 풀 사용 종료 시 end() 함수 호출
		// }
	};
}
