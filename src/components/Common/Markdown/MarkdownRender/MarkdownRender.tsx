import React from 'react';
import ReactMarkdown from 'react-markdown';
import BlockQuote from './BlockQuote';
import CodeBlock from './CodeBlock';
import Image from './Image';

export interface MarkdownRenderProps {
	contents: string;
}

const MarkdownRender = ({
	contents,
}: MarkdownRenderProps): JSX.Element => {
	return (
		<ReactMarkdown
			source={contents}
			escapeHtml={false}
			renderers={{
				code: CodeBlock,
				blockquote: BlockQuote,
				image: Image,
			}}
		/>
	);
};

export default MarkdownRender;
