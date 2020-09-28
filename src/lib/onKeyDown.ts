import { KeyboardEvent } from 'react';

export const onKeyDown = (
	e: KeyboardEvent<HTMLInputElement>,
	requestFunction: () => Promise<void> | void
) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		requestFunction();
	}
};
