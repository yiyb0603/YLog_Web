import moment from 'moment';

export const handleMomentParse = (
	date: string | Date,
	format: string
): string => {
	return moment(date).format(format);
};
