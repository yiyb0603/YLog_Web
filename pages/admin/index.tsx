import AdminTemplate from 'components/Template/AdminTemplate';
import AllowMemberContainer from 'containers/AdminContainer/AllowMember';
import React from 'react';

const AdminIndexPage = () => {
	return (
		<AdminTemplate>
			<AllowMemberContainer />
		</AdminTemplate>
	);
};

export default AdminIndexPage;
