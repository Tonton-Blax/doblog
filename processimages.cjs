const fs = require('fs');
const path = require('path');
const sharp = require('sharp')

const MAG = '\033[35m';
const INI = '\033[0m';
const GRN = "\x1b[32m";

let files = fs.readdirSync(path.resolve(__dirname, "static/img/uploads"));

function processImages(images, res = 400) {

	let done = [];
	let passed = [];

	if (!Array.isArray(images))
		images = [images];

	for (const image of images) {
		let fileExt = (`${image.substring(image.lastIndexOf('.')+1)}`);
		const fileName = image.substring(0, image.lastIndexOf('.'));

		if (!fileName)
			break;

		const toSameFileExt = fileExt == 'jpeg' || fileExt == 'jpg' ? 'jpeg' : fileExt;

		if (!fs.existsSync(path.resolve(__dirname, 'static/img', `${fileName}__${res}.${fileExt}`)) 
			|| !fs.existsSync(path.resolve(__dirname, 'static/img', `${fileName}__${res}.webp`))) {
			sharp(path.resolve(__dirname, 'static/img/uploads', `${fileName}.${fileExt}`))
				.resize({ width: res })
				[toSameFileExt]({ quality: 70 })
				.toFile(path.resolve(__dirname, 'static/img', `${fileName}__${res}.${fileExt}`));

			sharp(path.resolve(__dirname, 'static/img/uploads', `${fileName}.${fileExt}`))
				.resize({ width: res })
				.webp({ quality: 85 })
				.toFile(path.resolve(__dirname, 'static/img', `${fileName}__${res}.webp`));

			done.push(image);
		} else { passed.push(image) }
	}
	return {passed,done}
}

const {passed, done} = processImages(files);
done.length && console.log(GRN, "Nouvelles images: \n", done.join(','));
passed.length && console.log(MAG, "Images existantes: \n", passed.join(','), INI);