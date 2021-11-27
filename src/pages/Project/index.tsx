import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-terry';
import 'ace-builds/src-noconflict/theme-kuroir';

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
          <AceEditor
            style={{ borderRadius: '10px 10px 10px 0' }}
            mode="terry"
            theme="kuroir"
            name="editor"
            onChange={value => setCode(value)}
            fontSize={16}
            showPrintMargin
            showGutter
            highlightActiveLine
            width="100%"
            height="100%"
            value={code}
            // annotations={[
            //   { row: 1, column: 5, type: 'error', text: 'Some error.' },
            // ]}
            // markers={[
            //   {
            //     startRow: 1,
            //     startCol: 2,
            //     endRow: 1,
            //     endCol: 4,
            //     className: 'error-marker',
            //     type: 'text',
            //   },
            // ]}
            setOptions={{
              tabSize: 2,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              dragEnabled: true,
              // firstLineNumber: -10,
              enableMultiselect: true,
              fontFamily: '"Fira code", "monospace"',
              scrollPastEnd: true,
              displayIndentGuides: true,
              wrap: true,
            }}
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
