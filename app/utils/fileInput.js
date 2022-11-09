import styled from "styled-components";
import SVG from "react-inlinesvg";
import ImgWithFileInput from "./imgInput";
import { Text } from "./primitives";

const StyledContainer = styled.div`
	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

	.inputfile + label {
		height: 138px;
		width: 100%;
		font-size: 16px;
		font-weight: 400;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		padding: 1.2rem 1.25rem;
		background: #ffffff;
		border: 1px solid #ebebeb;
		border-radius: 8px;
		box-sizing: border-box;
	}

	.inputfile:focus + label,
	.inputfile.has-focus + label {
		outline: 1px dotted #000;
		outline: -webkit-focus-ring-color auto 5px;
	}

	.inputfile + label svg {
		width: 35px;
		height: 22px;
		vertical-align: middle;
		fill: currentColor;
		margin-top: -0.25em;
		margin-right: 0.25em;
	}

	/* style 1 */
	.inputfile-1 + label {
		color: #54616c;
	}

	.inputfile-1:focus + label,
	.inputfile-1.has-focus + label,
	.inputfile-1 + label:hover {
		background-color: #ddd;
	}
`;

const FileInput = ({ handleChange, name, file }) => {
	return (
		<div>
			{file?.url ? (
				<ImgWithFileInput
					name={name}
					imgUrl={file.url}
					imgName={file.fileObj?.name}
					handleChange={handleChange}
					isImage={file?.fileObj?.type?.includes("image")}
				/>
			) : (
				<StyledContainer>
					<input
						type="file"
						accept=".png, .jpg, .jpeg, .pdf, .docx"
						name={name}
						id={name}
						className="inputfile inputfile-1"
						onChange={handleChange}
					/>
					<label htmlFor={name}>
						<SVG src={"/media/svg/upload.svg"} />
						<Text mt={2} color="#999CA0">
							Press to upload
						</Text>
						<Text fontSize="11px" color="#999CA0">
							It must be a JPG, PNG, DOC, or PDF, no larger than 5 MB.
						</Text>
					</label>
				</StyledContainer>
			)}
		</div>
	);
};

export default FileInput;
