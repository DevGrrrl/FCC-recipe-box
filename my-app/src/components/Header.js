import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 200px;
  background: rgb(126, 74, 232);
  background: linear-gradient(
    167deg,
    rgba(126, 74, 232, 1) 0%,
    rgba(126, 74, 232, 1) 34%,
    rgba(154, 0, 255, 1) 100%
  );
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
  font-family: 'Roboto Mono', monospace;
`
const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  line-height: 7rem;
  text-align: center;
  color: white;
`

const Header = props => {

    return(
       <StyledHeader>
           <Title>My Recipes</Title>
       </StyledHeader>
    )
}

export default Header;