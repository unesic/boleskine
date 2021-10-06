import { useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageType = {
	path: string;
	file?: any;
	blob?: any;
	mimetype?: string;
	filename?: string;
};

interface AcceptedFile extends File {
	path?: string;
}

interface ImageUploadProps {
	id: string;
	name: string;
	value: string;
	accept: string;
	onChange: (e: ImageType) => void;
	errors: string | undefined;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	id,
	name,
	value,
	accept,
	onChange,
	errors,
}) => {
	const [image, setImage] = useState<ImageType>({ path: value });

	const onDrop = (acceptedFiles: AcceptedFile[]) => {
		const file = acceptedFiles[0];
		const blob = URL.createObjectURL(file);
		const mimetype = file.type;
		const filename = file.path?.split(".")[0] as string;

		const newImage = { ...image, file, blob, mimetype, filename };

		setImage(newImage);
		onChange(newImage);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div>
			<div
				{...getRootProps()}
				className="relative"
				style={{ minHeight: "100px" }}
			>
				<div
					className={`ImageUpload__Overlay ${
						isDragActive && "ImageUpload__OverlayActive"
					}`}
				>
					<p
						className={`ImageUpload__OverlayText ${
							isDragActive && "ImageUpload__OverlayTextActive"
						}`}
					>
						Drop the image here...
					</p>
				</div>
				<input {...getInputProps()} id={id} name={name} accept={accept} />
				{image.path && (
					<div className="ImageUpload__Container">
						<img src={image.blob || image.path} alt="" />
					</div>
				)}
			</div>
			<p className="ImageUpload__Text">Drop image here, or click to select.</p>
		</div>
	);
};
