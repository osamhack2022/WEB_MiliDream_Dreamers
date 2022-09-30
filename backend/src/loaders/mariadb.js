import mariadb from 'mariadb';
import dbInfo from '../config/tmpdbconfig';


export default function () {
	const pool = mariadb.createPool({ //이 부분을 다른 곳으로 옮겨야 하나
		host: dbInfo.DB_HOST,
		port: dbInfo.DB_PORT,
		user: dbInfo.DB_USER,
		password: dbInfo.DB_PASS,
		connectionLimit: 5,
	});

	return {
		getConnection: function (callback) {
			pool.getConnection(callback);
		},
		end: function (callback) {
			pool.end(); // pool에서는 end 대신 release를 쓴다고 함 사실이라면 제거
		},
		release: function (callback) {
			pool.release(); // pool을 사용하면 반드시 release ,
			/*
			정확하지 않음, 사용하지 않아도 된다고 하는 내용도.. 추가 조사 후 수정
			relase()를 굳이 여기서 메소드로 안보내줘도 connection 함수 콜백 두번째 인수로 사용 가능한 것 같음
			이 경우 relase는 지우기
			*/
		}
	};
}
