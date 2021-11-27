import React from 'react';

import { Container, Content, Footer } from './styles';

interface IBlockProps {
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  footer?: {
    text: string;
    textColor: string;
    icon?: React.ReactElement;
  };
}

const Block: React.FC<IBlockProps> = ({
  children,
  footer,
  containerStyle,
  contentStyle,
}) => {
  return (
    <Container style={containerStyle}>
      <Content style={contentStyle}>{children}</Content>
      <Footer color={footer?.textColor}>
        {footer?.text}
        {footer?.icon && footer.icon}
      </Footer>
    </Container>
  );
};

export { Block };
