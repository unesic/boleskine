const fs = require("fs");
const Files = require("../../models/Files.model");
const { processUpload } = require("../../util/files.utils");

module.exports = {
	Query: {
		getFile: async (_, { fileId }) => {
			try {
				const file = await Files.findById(fileId);
				if (file) {
					return file;
				} else {
					throw new Error("File not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		singleUpload: async (_, { file }) => {
			fs.mkdir("images", { recursive: true }, (err) => {
				if (err) throw err;
			});

			const upload = await processUpload(file);
			const newFile = new Files({ ...upload });
			await newFile.save();

			return newFile;
		},
	},
};
