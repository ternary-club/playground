import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-terry';

import 'styles/prism.css';

import { ReactComponent as HammerIcon } from 'assets/images/hammer.svg';
import { ReactComponent as TriangleIcon } from 'assets/images/triangle.svg';
import { ReactComponent as LanguageIcon } from 'assets/images/language.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools, Block } from 'components';

import {
  Container,
  Name,
  Header,
  IconsContainer,
  IconContainer,
  Content,
  Output,
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

  const languageIcon = useMemo(
    () => (
      <LanguageIcon
        width={20}
        height={20}
        fill={theme.pink}
        style={{ marginLeft: 10 }}
      />
    ),
    [theme],
  );

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
        <Block
          footer={{ text: 'untitled-project.try', textColor: theme.green }}
        >
          <Editor
            value={code}
            onValueChange={text => setCode(text)}
            highlight={text => highlight(text, languages.terry, 'terry')}
            tabSize={2}
            insertSpaces
            padding={10}
            style={{
              width: '100%',
              height: '100%',
              fontFamily: '"Fira code", monospace',
              fontSize: 12,
            }}
            textareaClassName="no-selection"
            preClassName="no-selection language-javascript"
          />
        </Block>
        <Block
          footer={{
            text: 'untitled-project.ter',
            textColor: theme.blue,
            icon: languageIcon,
          }}
        />
        <Output>
          <Block footer={{ text: 'problems', textColor: theme.darkGray }} />
          <Block
            footer={{
              text: 'output',
              textColor: theme.darkGray,
              icon: languageIcon,
            }}
          />
        </Output>
      </Content>
    </Container>
  );
};

export { Project };
