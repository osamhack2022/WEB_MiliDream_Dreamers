import create from "zustand"

export const GlobalState = create((set, get) => ({
	user: {},
	userLoading: true,
	fetchUser: async () => {
		const response = await fetch("/api/user");
		if (response.ok) {
			const data = await response.json();
			set({ user: data, userLoading: false });
		} else {
			set({ user: false, userLoading: false })
		}
	},
	logOut: async () => {
		await fetch("/api/accounts/sign", { method: "DELETE" })
		set({ user: false, userLoading: false })
	},
	categoryList: [],
	getCategoryList: async () => {
		const { category } = await (await fetch(`/api/board/category`, { method: 'GET' })).json();
		set({ categoryList: category });
	}
}))