import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
	useState,
	CSSProperties,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSearch } from 'react-icons/bi';
import { onKeyDown } from 'lib/onKeyDown';

const style = require('./SearchInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchInputProps {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	requestFunction?: () => Promise<void> | void;
}

const SearchInput = ({
	keyword,
	setKeyword,
	requestFunction,
}: SearchInputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const iconStyle: CSSProperties = {
		marginRight: 5,
		fontSize: 25,
		cursor: 'pointer',
		color: 'black',
	};

	return (
		<div
			className={cx('SearchInput', {
				'SearchInput-Focused': isFocus,
			})}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
		>
			<BiSearch style={iconStyle} onClick={requestFunction} />
			<input
				type="text"
				placeholder="검색어를 입력하세요"
				value={keyword}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setKeyword(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
					if (typeof requestFunction === 'function') {
						onKeyDown(e, requestFunction);
					}
				}}
			/>
		</div>
	);
};

export default SearchInput;
