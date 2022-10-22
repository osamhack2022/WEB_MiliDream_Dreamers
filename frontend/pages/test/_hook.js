import React, { useContext, useState } from "react";

function getNewKey(db) {
	if (db.length === 0) return 1;
	return db[db.length - 1].userKey + 1;
}

const myContext = React.createContext();
export const useMyContext = () => useContext(myContext);
export const MyContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(true);
	const [post, setPost] = useState([]);
	const [careerPost, setCareerPost] = useState([]);
	const [db, setdb] = useState([]);
	const getPostFromAPI = async () => {
		const response = await fetch("/api/board");
		if (response.ok) {
			const data = await response.json();
			setPost(data.boards);
		} else {
			const data = await response.json();
			console.log("post error,", data);
		}

		const careerResponse = await fetch("/api/board?categoryKey=1");
		if (careerResponse.ok) {
			const data = await careerResponse.json();
			setCareerPost(data.boards);
		} else {
			const data = await careerResponse.json();
			console.log("post error,", data);
		}
	};
	const getUserFromAPI = async () => {
		if (!userLoading) return;
		const response = await fetch("/api/accounts/sign");
		if (response.ok) {
			const data = await response.json();
			console.log("data:", data);
			setUser(data);
			setUserLoading(false);
		} else {
			setUserLoading(false);
		}
	};
	const addUser = ({ userId, password, userName, userClass }) => {
		const userKey = getNewKey(db);
		setdb([...db, { userId, password, userName, userClass, userKey }]);
		setUser({ userId, password, userName, userClass, userKey });
	};
	const deleteUser = (user) => {
		const newDB = db.filter((u) => u !== user);
		setdb(newDB);
	};

	return (
		<myContext.Provider
			value={{
				user,
				setUser,
				addUser,
				deleteUser,
				post,
				getPostFromAPI,
				careerPost,
				getUserFromAPI,
				userLoading,
			}}
		>
			{children}
		</myContext.Provider>
	);
};
