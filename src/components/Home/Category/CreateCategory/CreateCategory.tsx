import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';
import { useKeyDown } from 'lib/hooks/useKeyDown';

const style = require('./CreateCategory.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CreateCategoryProps {
	handleCloseModal: () => void;
	categoryNameObj: {
		categoryName: string;
		setCategoryName: Dispatch<SetStateAction<string>>;
	};
	requestCreateCategory: () => Promise<void>;
}

const CreateCategory = ({
	handleCloseModal,
	categoryNameObj,
	requestCreateCategory,
}: CreateCategoryProps) => {
	const { categoryName, setCategoryName } = categoryNameObj;

	return (
		<div className={cx('CreateCategory')}>
			<Modal title="카테고리 생성" handleCloseModal={handleCloseModal}>
				<div className={cx('CreateCategory-Wrapper')}>
					<input
						type="text"
						placeholder="카테고리를 입력하세요"
						value={categoryName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setCategoryName(e.target.value)
						}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
							useKeyDown(e, requestCreateCategory)
						}
					/>
					<button onClick={requestCreateCategory}>생성</button>
				</div>
			</Modal>
		</div>
	);
};

export default CreateCategory;
