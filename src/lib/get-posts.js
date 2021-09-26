import fs, { cp } from 'fs';
export const getPosts = () => {
	try {
		return fs.readdirSync('static/articles').map((fileName) => {
			const slug = fileName.slice(0, -3);
			return { slug };
		});
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};
