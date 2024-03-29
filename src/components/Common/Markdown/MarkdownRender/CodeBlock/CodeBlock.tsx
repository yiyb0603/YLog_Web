import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ICodeBlockProps {
	language: string;
	value: string;
}

const CodeBlock = ({
	language,
	value,
}: ICodeBlockProps): JSX.Element => {
	return (
		<SyntaxHighlighter
			language={language}
			style={prism}
		>
			{value}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
