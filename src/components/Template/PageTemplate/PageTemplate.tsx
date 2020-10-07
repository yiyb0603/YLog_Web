import React, { ReactNode } from 'react';
import NavBar from '../../Common/NavBar';
import Footer from '../../Common/Footer';
import ScrollTop from '../../Common/ScrollTop';

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
