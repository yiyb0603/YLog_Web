import React, { ReactNode } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import ScrollTop from '../ScrollTop';

interface IPageTemplateProps {
	children?: ReactNode;
}

const PageTemplate = ({ children }: IPageTemplateProps) => {
	return (
		<>
			<NavBar />
			{children}
			<Footer />
			<ScrollTop />
		</>
	);
};

export default PageTemplate;
