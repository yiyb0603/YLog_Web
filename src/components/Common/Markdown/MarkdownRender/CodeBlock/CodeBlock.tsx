import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as styles from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ICodeBlockProps {
	language: string;
	value: string;
}

const CodeBlock = ({ language, value }: ICodeBlockProps) => {
	return (
		<SyntaxHighlighter language={language} style={styles.prism}>
			{value}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
