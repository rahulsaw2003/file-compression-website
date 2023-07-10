# File Compression Website

This is a web application that allows users to compress files using the Huffman coding algorithm. It provides a user-friendly interface where users can upload a file, and the application will compress the file using Huffman coding and display the compression result.

## Huffman Coding Algorithm

Huffman coding is a widely used algorithm for lossless data compression. It achieves compression by assigning variable-length codes to different characters based on their frequencies in the input data. The Huffman coding algorithm consists of the following steps:

1. **Frequency Analysis**: The first step is to analyze the input file and determine the frequency of occurrence for each character or symbol. This frequency analysis is used to build a frequency table.

2. **Building the Huffman Tree**: The Huffman tree is constructed using the frequency table. Initially, each character is considered as a leaf node with its frequency as the key. The algorithm combines the two nodes with the lowest frequencies into a new internal node, with the sum of their frequencies as the frequency for the new node. This process is repeated until a single root node is created, resulting in the Huffman tree.

3. **Generating Huffman Codes**: Once the Huffman tree is constructed, each character is assigned a unique binary code based on its position in the tree. The code for each character is determined by traversing the path from the root to the corresponding leaf node. Left edges in the path are represented by "0", and right edges are represented by "1". The Huffman codes are generated by performing a depth-first search traversal of the Huffman tree.

4. **Encoding the File**: Using the generated Huffman codes, the input file is encoded by replacing each character with its corresponding Huffman code. The encoded file is a binary representation of the original file, using fewer bits to represent characters that occur more frequently.

5. **Storing the Compressed File**: The compressed file is stored using a suitable format. In this project, the compressed file is displayed as a string of "0s" and "1s" representing the encoded content.

## Features

- File upload: Users can select a file from their local system to be compressed.
- Compression: The application uses the Huffman coding algorithm to compress the file.
- Compression Result: After compression, the application displays the original file size, compressed file size, and the encoded content.
- Download: Users can download the compressed file.

## Technologies Used

- React: JavaScript library for building user interfaces.
- HTML: Markup language for creating the structure of the web page.
- CSS: Styling language for enhancing the appearance of the web page.

## Usage Guide

1. Open the web application in your browser.
2. Click on the "Choose File" button to select a file from your local system.
3. Click the "Compress" button to start the compression process.
4. While the file is being compressed, a loading spinner will appear.
5. Once the compression is complete, the compression result will be displayed, including the original file size, compressed file size, and the encoded content.
6. You can download the compressed file by clicking on the "Download" button.

## Preview Website

[Website URL](https://file-compression.netlify.app/)
## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## Author

Rahul Kumar Saw, IIT Ropar

## License

This project is licensed under the [MIT License](LICENSE).

