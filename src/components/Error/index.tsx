import React from 'react';

import { ReactComponent as InfoTriangle } from 'assets/images/info-triangle.svg';

import { Container, ErrorLabel, ErrorLocation } from './styles';

interface IErrorProps {
  row: number;
  column: number;
  message: string;
  onClick?: () => void;
}

const Error: React.FC<IErrorProps> = ({ row, column, message, onClick }) => {
  return (
    <Container onClick={() => typeof onClick === 'function' && onClick()}>
      <InfoTriangle width={48} height={48} style={{ flex: 0.13 }} />
      <ErrorLocation>
        {row}:{column}
      </ErrorLocation>
      <ErrorLabel>{message}</ErrorLabel>
    </Container>
  );
};

export { Error };
