import styled from 'styled-components';

interface ITextProps {
  fontSize?: number;
  fontWeight?: number;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  align-self: flex-start;
  margin-top: 40px;
  margin-left: 25px;
`;

export const TitleFirstLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const BottomContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Text = styled.p<ITextProps>`
  color: ${({ theme }) => theme.darkGray};
  font-family: 'TT Norms Pro', sans-serif;
  font-size: ${({ fontSize }) => fontSize || 48}px;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.pink};
  font-family: 'Lobster', cursive;
  font-size: 96px;
  font-weight: 400;
  line-height: 100%;
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 60%;
`;

export const Projects = styled.div`
  background: ${({ theme }) => theme.lightGray};
  border-radius: 10px;
  height: 500px;
  width: 70%;
  overflow-y: scroll;
  margin: 5px 0 20px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.pink};
  font-size: 36px;
  font-family: 'TT Norms Pro', sans-serif;
  font-weight: 700;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    filter: brightness(90%);
  }
`;
