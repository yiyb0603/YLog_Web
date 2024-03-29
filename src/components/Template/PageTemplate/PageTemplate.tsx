import React, { ReactNode } from 'react';
import NavBar from '../../Common/PageItems/NavBar';
import Footer from '../../Common/PageItems/Footer';
import ScrollTop from '../../Common/PageItems/ScrollTop';

interface IPageTemplateProps {
	children: ReactNode;
}

const PageTemplate = ({
	children,
}: IPageTemplateProps): JSX.Element => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<NavBar />
			{children}
			<Footer />
			<ScrollTop />
		</div>
	);
};

export default PageTemplate;
