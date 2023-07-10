import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function CompressionForm() {
	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("");
	const [file, setFile] = useState(null);
	const [compressedData, setCompressedData] = useState(null);

	useEffect(() => {
		// Simulating loading delay
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (file) {
			setLoading(true);
			setLoadingMessage("Compressing file...");

			const reader = new FileReader();

			reader.onload = async (event) => {
				const fileContent = event.target.result;
				const compressedFile = await compressFile(fileContent);
				setCompressedData(compressedFile);

				setLoading(false);
				setLoadingMessage("");
			};

			reader.readAsText(file);
		}
	};

	const compressFile = (fileContent) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				// Step 1: Calculate the frequency of each character in the file
				const frequencyMap = {};
				for (let i = 0; i < fileContent.length; i++) {
					const char = fileContent[i];
					frequencyMap[char] = (frequencyMap[char] || 0) + 1;
				}

				// Step 2: Build the Huffman tree
				const nodes = Object.keys(frequencyMap).map((char) => ({
					char,
					frequency: frequencyMap[char],
					left: null,
					right: null,
				}));

				while (nodes.length > 1) {
					nodes.sort((a, b) => a.frequency - b.frequency);

					const left = nodes.shift();
					const right = nodes.shift();

					const newNode = {
						char: null,
						frequency: left.frequency + right.frequency,
						left,
						right,
					};

					nodes.push(newNode);
				}

				const huffmanTree = nodes[0];

				// Step 3: Build the Huffman codebook
				const codebook = {};
				buildCodebook(huffmanTree, "", codebook);

				// Step 4: Encode the file content using Huffman coding
				let encodedContent = "";
				for (let i = 0; i < fileContent.length; i++) {
					const char = fileContent[i];
					encodedContent += codebook[char];
				}

				const compressedData = {
					originalSize: fileContent.length,
					compressedSize: Math.ceil(encodedContent.length / 8),
					encodedContent,
					codebook,
				};
				resolve(compressedData);
			}, 3000);
		});
	};

	const buildCodebook = (node, code, codebook) => {
		if (node.char !== null) {
			codebook[node.char] = code;
		} else {
			buildCodebook(node.left, code + "0", codebook);
			buildCodebook(node.right, code + "1", codebook);
		}
	};

	const [expanded, setExpanded] = useState(false);

	const formatEncodedContent = (encodedContent) => {
		const byteCharacters = encodedContent.match(/.{1,8}/g);
		const bytes = byteCharacters.map((byte) => parseInt(byte, 2));
		const encodedArray = Array.from(bytes);
		const formattedContent = encodedArray.join(", ");
		return formattedContent;
	};

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const truncatedContent = compressedData && compressedData.encodedContent.slice(0, 1000);
	const isContentTruncated = compressedData && compressedData.encodedContent.length > 1000;

	const formatFileSize = (bytes) => {
		if (bytes >= 1e6) {
			return `${(bytes / 1e6).toFixed(2)} MB`;
		} else if (bytes >= 1e3) {
			return `${(bytes / 1e3).toFixed(2)} KB`;
		} else {
			return `${bytes} bytes`;
		}
	};

	const resetForm = () => {
		setFile(null);
		setCompressedData(null);
	};

	const downloadCompressedFile = () => {
		const fileName = file.name.split(".").slice(0, -1).join("."); // Get the original file name without the extension
		const compressedFileName = `${fileName}_compressed.txt`;

		const element = document.createElement("a");
		const fileContent = compressedData.encodedContent;
		const fileBlob = new Blob([fileContent], { type: "text/plain" });

		element.href = URL.createObjectURL(fileBlob);
		element.download = compressedFileName;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	if (loading) {
		return <Loader />;
	}
	return (
		<div className="container">
			<h2>File Compression</h2>
			<form onSubmit={handleFormSubmit}>
				<input type="file" onChange={handleFileChange} />
				<button type="submit">Compress</button>
			</form>

			{loading && <Loader loadingMessage={loadingMessage} />}
			{compressedData && (
				<div className="result-container">
					<h2>Compression Result</h2>
					<p>Original file size: {formatFileSize(compressedData.originalSize)}</p>
					<p>Compressed file size: {formatFileSize(compressedData.compressedSize)}</p>
					{expanded ? (
						<div>
							<button onClick={toggleExpand}>Compressed View</button>
							<pre style={{ maxWidth: "100%", overflow: "auto" }}>{formatEncodedContent(compressedData.encodedContent)}</pre>
						</div>
					) : (
						<div>
							{isContentTruncated && <button onClick={toggleExpand}>Expanded View</button>}
							<pre style={{ maxWidth: "100%", overflow: "auto" }}>{truncatedContent}</pre>
						</div>
					)}
					<button onClick={resetForm}>Reset</button>
					<button onClick={downloadCompressedFile}>Download Compressed File</button>
				</div>
			)}
		</div>
	);
}

export default CompressionForm;
