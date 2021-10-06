/**
 * Base
 */
import { memo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

/**
 * Components
 */
import { Error } from "./Error";

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
	label: string;
	overlay: string;
	instruction: string;
	altText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = memo(
	({
		id,
		name,
		value,
		accept,
		onChange,
		errors,
		label,
		overlay,
		instruction,
		altText = "",
	}) => {
		const [image, setImage] = useState<ImageType>({ path: value });

		const onDrop = useCallback((acceptedFiles: AcceptedFile[]) => {
			const file = acceptedFiles[0];
			const blob = URL.createObjectURL(file);
			const mimetype = file.type;
			const filename = file.path?.split(".")[0] as string;

			const newImage = { ...image, file, blob, mimetype, filename };

			setImage(newImage);
			onChange(newImage);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const {
			getRootProps: rootProps,
			getInputProps: inputProps,
			isDragActive: dragActive,
		} = useDropzone({
			onDrop,
		});

		return (
			<div className="Field">
				<fieldset
					className={`Field--Image ${
						errors ? " Field--Image--has-errors" : ""
					}`}
				>
					<div {...rootProps()} className="Field--Image__input">
						<input {...inputProps()} id={id} name={name} accept={accept} />

						<div className="Image">
							<div className="Image__inner">
								<img src={image.blob || image.path} alt={altText} />
							</div>
						</div>

						<div className={`Overlay ${dragActive ? " active" : ""}`}>
							{overlay}
						</div>
					</div>

					<label htmlFor={name} className="Field--Image__label">
						{label}
					</label>

					<p className="Field--Image__instruction">{instruction}</p>
				</fieldset>
				{errors ? <Error>{errors}</Error> : null}
			</div>
		);
	}
);
