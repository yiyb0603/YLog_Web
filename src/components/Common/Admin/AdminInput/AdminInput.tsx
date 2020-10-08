import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
} from 'react';
import { makeStyles, TextField, Theme } from '@material-ui/core';
import { onKeyDown } from 'lib/onKeyDown';

interface AdminInputProps {
	type: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	outline: string;
	requestFunction: () => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const AdminInput = ({
	type,
	value,
	setValue,
	outline,
	requestFunction,
}: AdminInputProps) => {
	const { root } = useStyles();

	return (
		<form className={root}>
			<TextField
				type={type}
				id="outlined-basic"
				label={outline}
				variant="outlined"
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setValue(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					onKeyDown(e, requestFunction)
				}
			/>
		</form>
	);
};

export default AdminInput;
