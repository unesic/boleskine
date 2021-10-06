const shortid = require("shortid");
const fs = require("fs");

async function storeUpload({ stream, filename, mimetype }) {
	const id = shortid.generate();
	const path = `images/${id}-${filename}`;

	return new Promise((resolve, reject) =>
		stream
			.pipe(fs.createWriteStream(path))
			.on("finish", () => resolve({ path, filename, mimetype }))
			.on("error", reject)
	);
}

async function processUpload(upload) {
	const { createReadStream, filename, mimetype } = await upload;
	const stream = createReadStream();
	const file = await storeUpload({ stream, filename, mimetype });
	return file;
}

module.exports = { storeUpload, processUpload };
