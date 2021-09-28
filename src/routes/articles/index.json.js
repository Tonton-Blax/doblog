import { getAllPosts } from '$lib/getArticles'

export async function get() {
	const allPosts = getAllPosts(true);

	if (!allPosts) {
		return {
			status: 404
		}
	}
	return {
		body: allPosts
	};
}