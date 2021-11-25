import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';

import { ReactComponent as HammerIcon } from 'assets/images/hammer.svg';
import { ReactComponent as TriangleIcon } from 'assets/images/triangle.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools } from 'components/ProjectTools';

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
  const theme = useTheme();

  const { name } = useParams<RouteParams>();

  const [code, setCode] = useState('');

  const handleBuildProject = () => null;

  const handleRunProject = () => null;

  return (
    <Container>
      <Header>
        <Name>untitled project</Name>
        <ProjectTools
          name={name}
          color={theme.darkGray}
          onRename={() => console.log(name)}
          onDelete={() => console.log(name)}
          goBack
        />
        <IconsContainer>
          <IconContainer
            color={theme.green}
            onClick={handleBuildProject}
            title="Build project"
          >
            <HammerIcon width={32} height={32} />
          </IconContainer>
          <IconContainer
            color={theme.blue}
            onClick={handleRunProject}
            title="Run project"
          >
            <TriangleIcon width={32} height={32} />
          </IconContainer>
        </IconsContainer>
      </Header>
      <Content>
        <CodeBlock>
          <Editor
            value={code}
            onValueChange={text => setCode(text)}
            highlight={text => (
              <span style={{ color: theme.black }}>{text}</span>
            )}
            tabSize={2}
            insertSpaces
            padding={10}
            style={{
              width: '100%',
              height: '100%',
              fontFamily: '"Fira code", monospace',
              fontSize: 12,
            }}
          />
        </CodeBlock>
      </Content>
    </Container>
  );
};

export { Project };
