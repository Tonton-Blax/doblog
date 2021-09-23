import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import marked from 'marked';

const getContent = (fileName) => {
	try {
		return fs.readFileSync(
			path.resolve(`static/articles/`, `${ fileName }.md`),
			'utf-8'
		);
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};


export async function get({ params }) {
	const { postType, slug } = params;
	const file = getContent(slug);
	
	if (!file) {
		return {
			status: 404
		}
	}
	
	const renderer = new marked.Renderer();

	const { data, content } = grayMatter(file);
	const html = marked(content, { renderer });

	return {
		body: {
			html, ...data
		}
	};
}