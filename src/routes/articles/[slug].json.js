import fs from 'fs';
import path from 'path';
import sharp from 'sharp'
import { getAllPosts, getPost } from '$lib/getArticles'

export async function get({ params }) {
	const { postType, slug } = params;
	const data = getPost(slug);
	const allPosts = getAllPosts(true);
	
	if (!data) {
		return {
			status: 404
		}
	}

	const contentImages = data.contenu.map(d => d.images).flat().map(d => d.image_section)
	if (contentImages);
		processImages(contentImages);
	if (data?.featured_image?.thumbnail) {
		processImages(data.featured_image.thumbnail, 800);
		processImages(data.featured_image.thumbnail, 400);
	}
	return {
		body: {
			post : {...data}, posts : allPosts
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
		const toSameFileExt = fileExt == 'jpeg' || fileExt == 'jpg' ? 'jpeg' : fileExt;

		if (!fs.existsSync(path.resolve('static/img', `${fileName}__${res}.${fileExt}`)) ||	!fs.existsSync(path.resolve('static/img', `${fileName}__${res}.webp`))) {

			await sharp(path.resolve('static/img/uploads', `${fileName}.${fileExt}`))
				.resize({ width: res })
				[toSameFileExt]({ quality: 70 })
				.toFile(path.resolve('static/img', `${fileName}__${res}.${fileExt}`));

			await sharp(path.resolve('static/img/uploads', `${fileName}.${fileExt}`))
				.resize({ width: res })
				.webp({ quality: 70 })
				.toFile(path.resolve('static/img', `${fileName}__${res}.webp`));
		}
	}
}