import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.red};
  width: 100%;
  border-radius: 10px;
  padding: 20px 15px;
  margin: 10px 0;
`;

export const ErrorLocation = styled.span`
  flex: 0.12;
  color: ${({ theme }) => theme.white};
  font-family: 'TT Norms Pro';
  font-weight: 400;
  font-size: 20px;
  padding: 0 5px;
`;

export const ErrorLabel = styled.span`
  flex: 0.75;
  color: ${({ theme }) => theme.white};
  font-family: 'TT Norms Pro';
  font-weight: 700;
  font-size: 20px;
`;
