import React from 'react';

import { Container, Content, Footer } from './styles';

interface IBlockProps {
  footer?: {
    text: string;
    textColor: string;
    icon?: React.ReactElement;
  };
}

const Block: React.FC<IBlockProps> = ({ children, footer }) => {
  return (
    <Container>
      <Content>{children}</Content>
      <Footer color={footer?.textColor}>
        {footer?.text}
        {footer?.icon && footer.icon}
      </Footer>
    </Container>
  );
};

export { Block };
