export function toLowRes(path, res = 400) {
    const fileName = path.split('/').pop()
    const fileExt = (`${fileName.substring(fileName.lastIndexOf(".")+1)}`);
    const fileNameClean = fileName.substring(fileName.length-fileExt.length-1, 0);
    const prefixPath = path.substring(0, path.lastIndexOf("/")+1);
    return `${prefixPath}${fileNameClean}__${res}.${fileExt}`
}