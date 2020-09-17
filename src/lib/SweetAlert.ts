import Swal, { SweetAlertIcon } from 'sweetalert2';

export const simpleAlert = (
	title: string,
	subTitle: string,
	icon: SweetAlertIcon,
	nextFunction?: any
) => {
	return Swal.fire(title, subTitle, icon).then(() => {
		if (nextFunction !== undefined) {
			nextFunction();
		}
	});
};
