import React from 'react';

import {
  Container, TitleContainer, Title, Text,
} from './styles';

import taylor from '../../assets/images/taylor.svg';

const Home: React.FC = () => (
  <Container>
    <TitleContainer>
      <Text>The</Text>
      <Title>Ternary Club</Title>
      <Text>playground</Text>
    </TitleContainer>
    <img src={taylor} alt="Taylor" />
  </Container>
);

export default Home;
