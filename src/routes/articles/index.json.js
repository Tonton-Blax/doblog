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
			const mattered = grayMatter(file);
			
			return { 
				title: mattered.data.title, 
				slug, 
				img : mattered.data.featured_image.thumbnail, 
				chapo :  mattered.data.chapocontent,
				date : mattered.data.date,
				thematique : mattered.data.thematique
			};
		});
	} catch (e) {
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