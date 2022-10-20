import React, { useState } from "react";

const APIAvailable = true;

function getNewKey(db) {
	if (db.length === 0) return 1;
	return db[db.length - 1].userKey + 1;
}

export const myContext = React.createContext();
export const MyContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(true);
	const [canAPI, setAPI] = useState(APIAvailable);
	const [post, setPost] = useState([]);
	const [careerPost, setCareerPost] = useState([]);
	const getPostFromAPI = async () => {
		if (canAPI) {
			const response = await fetch("/api/board");
			console.log("in get postFromAPI", response)
			if (response.ok) {
				const data = await response.json();
				console.log("in getpostfromAPI, data is", data)
				setPost(data);
			}

			const careerResponse = await fetch("/api/board?categoryKey=1")
			console.log("in get careerPost,", careerResponse);
			if (careerResponse.ok) {
				const data = await careerResponse.json();
				console.log("careerData:", data);
				setCareerPost(data);
			}
		}
	}
	const getUserFromAPI = async () => {
		if (canAPI) {
			const response = await fetch("/api/accounts/sign");
			console.log(response);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setUser(data)
				setUserLoading(false)
			} else {
				setUserLoading(false)
			}
		}
	}
	const addUser = ({ userId, password, userName, userClass }) => {
		const userKey = getNewKey(db);
		console.log(userKey)
		setdb([...db, { userId, password, userName, userClass, userKey }]);
		setUser({ userId, password, userName, userClass, userKey })
	}
	const deleteUser = (user) => {
		const newDB = db.filter(u => u !== user)
		setdb(newDB);
	}

	return <myContext.Provider value={{ user, setUser, canAPI, addUser, deleteUser, post, getPostFromAPI, careerPost, getUserFromAPI, userLoading }}>{children}</myContext.Provider>
}

