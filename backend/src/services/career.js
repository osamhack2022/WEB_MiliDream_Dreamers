import Post from '../models/Post';

export default class CareerService {
	constructor() {
		// initialize something
	}

	async findAll() {
		const categoryKey = 1; //category fix되면 env로 변경
		const postList = await Post.getAll(categoryKey);

		return JSON.stringify(postList);
	}
}