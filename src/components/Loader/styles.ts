import styled, { keyframes } from 'styled-components';

interface ILoaderContainerProps {
  color: string;
}

const load = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

export const LoaderContainer = styled.div<ILoaderContainerProps>`
  color: ${({ color }) => color};
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  background: ${({ color }) => color};
  animation: ${load} 1s infinite ease-in-out;
  animation-delay: -0.16s;
  width: 1em;
  height: 4em;

  :before,
  :after {
    background: ${({ color }) => color};
    animation: ${load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  :before,
  :after {
    position: absolute;
    top: 0;
    content: '';
  }

  :before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  :after {
    left: 1.5em;
  }
`;
