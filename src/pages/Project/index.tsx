import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-terry';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-kuroir';

import { ReactComponent as HammerIcon } from 'assets/images/hammer.svg';
import { ReactComponent as TriangleIcon } from 'assets/images/triangle.svg';
import { ReactComponent as LanguageIcon } from 'assets/images/language.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools, Block, Error } from 'components';

import {
  Container,
  Name,
  Header,
  IconsContainer,
  IconContainer,
  Content,
  Output,
  OutputTextContainer,
  OutputText,
} from './styles';

interface RouteParams {
  name: string;
}

interface IError {
  row: number;
  column: number;
  message: string;
}

const Project: React.FC = () => {
  const theme = useTheme();

  const { name } = useParams<RouteParams>();

  const [code, setCode] = useState('');
  const [ternaryCode, _setTernaryCode] = useState('');
  const [output, _setOutput] = useState('> 5');
  const [errors, _setErrors] = useState<IError[]>([
    {
      row: 2,
      column: 2,
      message: 'cannot read register in constant value declaration',
    },
  ]);

  const editorRef = useRef<AceEditor>(null);
  const ternaryEditorRef = useRef<AceEditor>(null);

  const handleRenameProject = useCallback(() => null, []);

  const handleDeleteProject = useCallback(() => null, []);

  const handleBuildProject = useCallback(() => null, []);

  const handleRunProject = useCallback(() => null, []);

  const handleErrorClick = useCallback((error: IError) => {
    editorRef.current?.editor.scrollToLine(error.row, true, true, () => null);
    editorRef.current?.editor.gotoLine(error.row, error.column, true);
    editorRef.current?.editor.focus();
  }, []);

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
          onRename={handleRenameProject}
          onDelete={handleDeleteProject}
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
          containerStyle={{ flex: 0.4 }}
        >
          <AceEditor
            ref={editorRef}
            style={{ borderRadius: '10px 10px 10px 0' }}
            mode="terry"
            theme="kuroir"
            name="editor"
            onChange={value => setCode(value)}
            fontSize={16}
            width="100%"
            height="100%"
            value={code}
            annotations={errors.map(err => ({
              row: err.row - 1,
              column: err.column,
              type: 'error',
              text: err.message,
            }))}
            markers={errors.map(err => ({
              startRow: err.row - 1,
              startCol: err.column,
              endRow: err.row - 1,
              endCol: err.column + 1,
              className: 'error-marker',
              type: 'fullLine',
            }))}
            setOptions={{
              tabSize: 2,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              dragEnabled: true,
              // firstLineNumber: -10,
              enableMultiselect: true,
              fontFamily: '"Fira code", "monospace"',
              scrollPastEnd: true,
              displayIndentGuides: true,
              highlightActiveLine: true,
              showGutter: true,
              printMargin: true,
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
          containerStyle={{ flex: 0.3 }}
        >
          <AceEditor
            ref={ternaryEditorRef}
            style={{ borderRadius: '10px 10px 10px 0' }}
            mode="text"
            theme="kuroir"
            name="ternaryEditor"
            fontSize={16}
            width="100%"
            height="100%"
            value={ternaryCode}
            setOptions={{
              tabSize: 2,
              showLineNumbers: true,
              // firstLineNumber: -10,
              fontFamily: '"Fira code", "monospace"',
              scrollPastEnd: true,
              displayIndentGuides: true,
              highlightActiveLine: true,
              showGutter: true,
              printMargin: true,
              wrap: true,
              readOnly: true,
            }}
          />
        </Block>
        <Output>
          <Block
            footer={{ text: 'problems', textColor: theme.darkGray }}
            containerStyle={{ maxHeight: '55vh', marginBottom: 10 }}
            contentStyle={{ padding: '10px 15px' }}
          >
            {errors.map((err, index) => (
              <Error
                key={index}
                row={err.row}
                column={err.column}
                message={err.message}
                onClick={() => handleErrorClick(err)}
              />
            ))}
          </Block>
          <Block
            footer={{
              text: 'output',
              textColor: theme.darkGray,
              // icon: languageIcon,
            }}
          >
            <OutputTextContainer>
              <OutputText>{output}</OutputText>
            </OutputTextContainer>
          </Block>
        </Output>
      </Content>
    </Container>
  );
};

export { Project };
