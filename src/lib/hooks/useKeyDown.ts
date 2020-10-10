import { KeyboardEvent } from 'react';

export const useKeyDown = (
	e: KeyboardEvent<HTMLInputElement>,
	requestFunction: () => Promise<void> | void
) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		requestFunction();
	}
};
