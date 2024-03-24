import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../redux/actions';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';

const PostFormComponent = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		console.log(newImageUrl);
		console.log(newTitle);
		console.log(newContent);

		dispatch(savePostAsync(requestServer, { id, imageUrl: newImageUrl, title: newTitle, content: newContent })).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="URL обложки..." />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />
			<SpecialPanel publishedAt={publishedAt} specialIcon={<Icon id="fa-floppy-o" size="18px" margin="0 15px 0 0" onClick={onSave} />} />
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
	}
`;
