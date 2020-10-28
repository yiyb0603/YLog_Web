import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
	CSSProperties,
} from 'react';
import { makeStyles, TextField, Theme } from '@material-ui/core';
import { useKeyDown } from 'lib/hooks/useKeyDown';

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
			// margin: theme.spacing(1),
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
	const adminInputStyle: CSSProperties = {
		width: '100%',
		marginBottom: 10,
	}

	return (
		<form className={root}>
			<TextField
				type={type}
				id="outlined-basic"
				label={outline}
				variant="outlined"
				value={value}
				style={adminInputStyle}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setValue(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					useKeyDown(e, requestFunction)
				}
			/>
		</form>
	);
};

export default AdminInput;
