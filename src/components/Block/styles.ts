import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex: 1;
  margin: 0 5px;
`;

export const Content = styled.div`
  background: ${({ theme }) => theme.lightGray};
  height: 100%;
  width: 100%;
  border-radius: 10px 10px 10px 0;
  overflow: auto;
`;

export const Footer = styled.span`
  background: ${({ theme }) => theme.lightGray};
  border-radius: 0 0 10px 10px;
  padding: 10px;
  font-family: 'TT Norms Pro';
  font-weight: 700;
  max-width: 70%;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
