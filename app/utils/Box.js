import React from "react";
import styled from "styled-components";
import { base } from "../../styles/baseStyles";

export const BoxWrapper = styled.div`
	${base};
`;

const Box = ({ children, ...props }) => (
	<BoxWrapper {...props}>{children}</BoxWrapper>
);

export default Box;
