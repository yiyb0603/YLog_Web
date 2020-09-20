import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (
	title: string,
	subTitle: string,
	icon: SweetAlertIcon,
	nextFunction?: any
) => {
	return Swal.fire(title, subTitle, icon).then(() => {
		if (typeof nextFunction !== 'undefined') {
			nextFunction();
		}
	});
};
