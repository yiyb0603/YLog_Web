import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

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

export const confirmAlert = (
	title: string,
	subTitle: string,
	icon: SweetAlertIcon,
	requestFunction: any
) => {
	return Swal.fire({
		title,
		text: subTitle,
		icon: icon,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '확인',
		cancelButtonText: '취소',
	}).then((result: SweetAlertResult) => {
		if (result.value) {
			requestFunction();
		}
	});
};
