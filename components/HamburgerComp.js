import React from 'react';
import styled from 'styled-components';

const HamburgerComp = ({ color = '#1C1A18', size = 24, isOpen, onClick }) => {
  return (
    <StyledWrapper $size={size} $color={color} onClick={onClick}>
      <div className="burger">
        <span className={isOpen ? 'open-1' : ''} />
        <span className={isOpen ? 'open-2' : ''} />
        <span className={isOpen ? 'open-3' : ''} />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  cursor: pointer;
  width: fit-content;

  .burger {
    position: relative;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size * 0.75}px;
    background: transparent;
    display: block;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: ${({ $color }) => $color};
    border-radius: 9px;
    left: 0;
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger span.open-1 {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger span.open-2 {
    width: 0%;
    opacity: 0;
  }

  .burger span.open-3 {
    transform: rotate(-45deg);
    top: ${({ $size }) => $size * 0.75 - 2}px;
    left: 5px;
  }
`;

export default HamburgerComp;