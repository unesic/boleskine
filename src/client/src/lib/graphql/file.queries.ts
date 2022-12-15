import gql from "graphql-tag";

export const GET_FILE = gql`
	query getFile($fileId: ID!) {
		getFile(fileId: $fileId) {
			filename
			mimetype
			path
		}
	}
`;

export const FILE_UPLOAD = gql`
	mutation singleUpload($file: Upload!) {
		singleUpload(file: $file) {
			filename
			mimetype
			path
		}
	}
`;
