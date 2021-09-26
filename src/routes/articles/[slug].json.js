import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import marked from 'marked';
import sharp from 'sharp'

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
	//const contentImages = Object.values(data.contenu).filter(d => d.type==='imagesobject').map(i => i.images).flat().map(i=>i.image_section);
	const contentImages = data.contenu.map(d => d.images).flat().map(d => d.image_section)
	if (contentImages);
		processImages(contentImages);
	if (data?.featured_image?.thumbnail) {
		processImages(data.featured_image.thumbnail, 800);
		processImages(data.featured_image.thumbnail, 400);
	}
	return {
		body: {
			html, ...data
		}
	};
}


async function processImages(images, res = 400) {
	if (!Array.isArray(images))
		images = [images];

	for (const image of images) {
		const fileExt = (`${image.substring(image.lastIndexOf(".")+1)}`);
		const filePath = image.substring(image.length-fileExt.length-1, 3)
		const prefixPath = filePath.substring(0, filePath.lastIndexOf("/")+1);
		const fileName = filePath.split(prefixPath).pop();

		if (!fs.existsSync(path.resolve('static/img', `${fileName}__${res}.${fileExt}`))) {
			await sharp(path.resolve('static/img/uploads', `${fileName}.${fileExt}`))
				.resize({ width: res })
				.jpeg({ quality: 70 })
				.toFile(path.resolve('static/img', `${fileName}__${res}.${fileExt}`));
		}
	}
}