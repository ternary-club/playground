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

  :active {
    filter: brightness(110%);
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

export const Output = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 0.3;
`;

export const OutputTextContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const OutputText = styled.span`
  font-family: 'Fira code', 'monospace';
  font-weight: 700;
  font-size: 40px;
  color: ${({ theme }) => theme.black};
`;

export const Block = styled.div`
  background: ${({ theme }) => theme.lightGray};
  height: 100%;
  flex: 1;
  border-radius: 10px 10px 10px 0;
  margin: 5px;
`;
