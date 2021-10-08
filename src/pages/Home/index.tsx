import React from 'react';

import taylorImage from 'assets/images/taylor.svg';
import plusIcon from 'assets/images/plus.svg';

import {
  Container,
  TitleContainer,
  TitleFirstLine,
  Title,
  Text,
  ProjectsContainer,
  Projects,
  BottomContainer,
  Button,
} from './styles';

const Home: React.FC = () => (
  <Container>
    <TitleContainer>
      <TitleFirstLine>
        <Text>The</Text>
        <Title>Ternary Club</Title>
      </TitleFirstLine>
      <Text>playground</Text>
    </TitleContainer>
    <BottomContainer>
      <img
        src={taylorImage}
        alt="Taylor"
        width={600}
        height={350}
        style={{ marginBottom: 72 }}
      />
      <ProjectsContainer>
        <Text fontSize={36} fontWeight={600}>
          Your projects
        </Text>
        <Projects />
        <Button>
          <img
            src={plusIcon}
            alt="Plus icon"
            width={36}
            height={36}
            style={{ marginRight: 15 }}
          />
          New project
        </Button>
      </ProjectsContainer>
    </BottomContainer>
  </Container>
);

export default Home;
