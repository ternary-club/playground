import styled from 'styled-components';

interface IIconContainer {
  color: string;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Name = styled.p`
  font-family: 'TT Norms Pro', sans-serif;
  font-size: 48px;
  color: ${({ theme }) => theme.darkGray};
  margin: 0 15px;
  margin-left: auto;
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

export const IconContainer = styled.div<IIconContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ color }) => color};
  border-radius: 10px;
  padding: 10px;
  margin: 0 8px;
  transition: all 0.2s;

  :hover {
    filter: brightness(90%);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
`;

export const CodeBlock = styled.div`
  background: ${({ theme }) => theme.lightGray};
  width: 100%;
  height: 100%;
`;
