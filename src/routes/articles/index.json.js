import fs, { cp } from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const getAllPosts = () => {
	try {
		return fs.readdirSync('static/articles').map((fileName) => {
			const slug = fileName.slice(0, -3);
			const file = fs.readFileSync(
				path.resolve(`static/articles/`, fileName),
				'utf-8'
			);
			return { title: grayMatter(file).data.title, slug };
		});
	} catch (e) {
		console.log("erreur lol", e)
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};

export async function get() {
	const allPosts = getAllPosts();

	if (!allPosts) {
		return {
			status: 404
		}
	}
	return {
		body: allPosts
	};
}