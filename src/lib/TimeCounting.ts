import timeCounting from 'time-counting';

const parseTime = (time: string | Date) => {
	return timeCounting(time, { lang: 'ko' });
};

export default parseTime;
