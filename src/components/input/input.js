import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => <input className={className} {...props} ref={ref} />);

export const Input = styled(InputContainer)`
	width: 100%;
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #000;
	border-radius: 5px;
	font-size: 18px;
`;

Input.propTypes = {
	width: PropTypes.string,
};
