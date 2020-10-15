import React, { ReactNode } from 'react';
import NavBar from '../../Common/NavBar';
import Footer from '../../Common/Footer';
import ScrollTop from '../../Common/ScrollTop';

interface IPageTemplateProps {
	children?: ReactNode;
}

const PageTemplate = ({ children }: IPageTemplateProps) => {
	return (
		<div style ={{ width: '100%', height: '100%' }}>
			<NavBar />
			{children}
			<Footer />
			<ScrollTop />
		</div>
	);
};

export default PageTemplate;
