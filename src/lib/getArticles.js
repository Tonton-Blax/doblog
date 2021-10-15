import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

let articles, table;
export const getAllPosts = (tableOnly) => {
	try {
		if (tableOnly && table)
			return table;
		else if (!tableOnly && articles) return articles
		else
		return fs.readdirSync('static/articles').map((fileName) => {
			//const slug = fileName.slice(0, -3);
			const file = fs.readFileSync(
				path.resolve(`static/articles/`, fileName),
				'utf-8'
			);
			const mattered = grayMatter(file);
			return tableOnly ? { 
				title: mattered.data.title, 
				slug : mattered.data.slug,
				img : mattered.data.featured_image?.thumbnail || "", 
				chapo :  mattered.data.chapocontent,
				date : mattered.data.date,
				thematique : mattered.data.thematique,
			} : mattered.data;
		});
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};


export const getPost = (slug) => {
    try {
		if (!articles)
			articles = getAllPosts()
        return articles.find(a => a.slug === slug)
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};
