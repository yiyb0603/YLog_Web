import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import Modal from 'components/Common/Modal';

const style = require('./ModifyCategory.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModifyCategoryProps {
	handleCloseModal: () => void;
	categoryNameObj: {
		categoryName: string;
		setCategoryName: Dispatch<SetStateAction<string>>;
	};
	requestModifyCategory: () => Promise<void>;
}

const ModifyCategory = ({
	handleCloseModal,
	categoryNameObj,
	requestModifyCategory,
}: ModifyCategoryProps) => {
	const { categoryName, setCategoryName } = categoryNameObj;

	return (
		<div className={cx('ModifyCategory')}>
			<Modal height ="250px" title="카테고리 수정" handleCloseModal={handleCloseModal}>
				<div className={cx('ModifyCategory-Wrapper')}>
					<input
						type="text"
						placeholder="카테고리를 입력하세요"
						value={categoryName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setCategoryName(e.target.value)
						}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
							useKeyDown(e, requestModifyCategory)
						}
					/>
					<button onClick={requestModifyCategory}>수정</button>
				</div>
			</Modal>
		</div>
	);
};

export default ModifyCategory;
