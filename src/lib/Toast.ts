import cogoToast from 'cogo-toast';

export const successToast = (message: string): void => {
  cogoToast.success(message);
}

export const errorToast = (message: string): void => {
  cogoToast.error(message);
}

export const warningToast = (message: string): void => {
  cogoToast.warn(message);
}

export const infoToast = (message: string): void => {
  cogoToast.info(message);
}