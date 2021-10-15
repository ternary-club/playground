import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useParams } from 'react-router-dom';

import { ReactComponent as HammerIcon } from 'assets/images/hammer.svg';
import { ReactComponent as TriangleIcon } from 'assets/images/triangle.svg';

import ProjectTools from 'components/ProjectTools';

import {
  Container,
  Name,
  Header,
  IconsContainer,
  IconContainer,
  Content,
  CodeBlock,
} from './styles';

interface RouteParams {
  name: string;
}

const Project: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const { name } = useParams<RouteParams>();

  const handleBuildProject = () => null;

  const handleRunProject = () => null;

  return (
    <Container>
      <Header>
        <Name>untitled project</Name>
        <ProjectTools
          name={name}
          color={themeContext.darkGray}
          onRename={() => console.log(name)}
          onDelete={() => console.log(name)}
          goBack
        />
        <IconsContainer>
          <IconContainer
            color={themeContext.green}
            onClick={handleBuildProject}
            title="Build project"
          >
            <HammerIcon width={32} height={32} />
          </IconContainer>
          <IconContainer
            color={themeContext.blue}
            onClick={handleRunProject}
            title="Run project"
          >
            <TriangleIcon width={32} height={32} />
          </IconContainer>
        </IconsContainer>
      </Header>
      <Content>
        <CodeBlock />
      </Content>
    </Container>
  );
};

export default Project;
