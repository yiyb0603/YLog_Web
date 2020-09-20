import React from 'react';

interface IPostWriteProps {
	postWriteForm: JSX.Element;
}

const PostWrite = ({ postWriteForm }: IPostWriteProps) => {
	return <div>{postWriteForm}</div>;
};

export default PostWrite;
