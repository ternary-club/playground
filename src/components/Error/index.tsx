import React from 'react';

import { ReactComponent as InfoTriangle } from 'assets/images/info-triangle.svg';

import { Container, ErrorLabel, ErrorLocation } from './styles';

interface IErrorProps {
  location: {
    row: number;
    column: number;
  };
  label: string;
}

const Error: React.FC<IErrorProps> = ({ location, label }) => {
  return (
    <Container>
      <InfoTriangle width={48} height={48} style={{ flex: 0.13 }} />
      <ErrorLocation>
        {location.row}:{location.column}
      </ErrorLocation>
      <ErrorLabel>{label}</ErrorLabel>
    </Container>
  );
};

export { Error };
