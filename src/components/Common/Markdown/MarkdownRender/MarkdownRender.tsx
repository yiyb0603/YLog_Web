import React from 'react';
import ReactMarkdown from 'react-markdown';
import BlockQuote from './BlockQuote';
import CodeBlock from './CodeBlock';

interface MarkdownRenderProps {
	contents: string;
}

const MarkdownRender = ({ contents }: MarkdownRenderProps) => {
	return (
		<ReactMarkdown
			source={contents}
			escapeHtml={false}
			renderers={{
				code: CodeBlock,
				blockquote: BlockQuote,
			}}
		/>
	);
};

export default MarkdownRender;
