import styled from 'styled-components';

import { ReactComponent as Folder } from 'assets/images/folder.svg';

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

export const Text = styled.p`
  color: ${({ theme }) => theme.darkGray};
  font-family: 'TT Norms Pro', sans-serif;
  font-size: 48px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  overflow-x: hidden;
  margin: 5px 0 20px;
  padding: 20px 0 20px 35px;

  ::-webkit-scrollbar {
    width: 30px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.lightGray};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.gray};
    border: 10px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 100px;
  }
`;

export const FolderIcon = styled(Folder)`
  min-width: 48px;
  min-height: 48px;
  transition: all 0.2s;

  path {
    stroke: ${({ theme }) => theme.darkGray};
  }
`;

export const Project = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
  transition: all 0.2s;
  cursor: default;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;

  div {
    width: 0;
  }

  :hover {
    background: ${({ theme }) => theme.pink};

    div {
      width: auto;
    }

    ${Text} {
      color: ${({ theme }) => theme.white} !important;
    }

    ${FolderIcon} {
      path {
        stroke: ${({ theme }) => theme.white};
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.pink};
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
