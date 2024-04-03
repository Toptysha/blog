import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../redux/actions';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostFormComponent = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(savePostAsync(requestServer, { id, imageUrl: imageUrlValue, title: titleValue, content: newContent })).then(({ id }) => {
			navigate(`/post/${id}`);
		});
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="URL обложки..."
				onChange={({ target }) => {
					setImageUrlValue(target.value);
				}}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={({ target }) => {
					setTitleValue(target.value);
				}}
			/>
			<SpecialPanel postId={id} publishedAt={publishedAt} specialIcon={<Icon id="fa-floppy-o" size="18px" onClick={onSave} />} />
			<div ref={contentRef} className="postContent" contentEditable={true} suppressContentEditableWarning={true}>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormComponent)`
	font-size: 18px;

	& img {
		float: left;
		margin: 0 10px 6px 0;
	}

	& .postContent {
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
