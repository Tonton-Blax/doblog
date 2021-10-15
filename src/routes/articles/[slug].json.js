import { getAllPosts, getPost } from '$lib/getArticles'

export async function get({ params }) {
	const { slug } = params;
	const data = getPost(slug);
	const allPosts = getAllPosts(true);
	
	if (!data) {
		return {
			status: 404
		}
	}
	
	return {
		body: {
			post : {...data}, posts : allPosts
		}
	};
}
