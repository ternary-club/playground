import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

import { ProjectTools, Block, Error, Modal, IModalRef } from 'components';

import { api } from 'services/api';

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
  const history = useHistory();

  const modalRef = useRef<IModalRef>(null);

  const [code, setCode] = useState('');
  const [ternaryCode, setTernaryCode] = useState('');
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState<IError[]>([]);

  const editorRef = useRef<AceEditor>(null);
  const ternaryEditorRef = useRef<AceEditor>(null);

  const getProjectData = useCallback(async () => {
    try {
      const { data } = await api.get<{ '.try': string; '.ter': string }>(
        `/${name}`,
      );
      if (!data || !data['.try'] || !data['.ter']) return;
      setCode(String(data['.try']));
      setTernaryCode(String(data['.ter']));
    } catch (err: any) {
      if (err.response.status === 404) history.replace('/');
    }
  }, [name, history]);

  const handleRenameProject = useCallback(
    async (project: string) => {
      try {
        await api.patch(`/${name}?name=${project}`);
        modalRef.current?.hide();
        history.replace(`/project/${project}`);
      } catch (err: any) {
        if (err.response.status === 404) history.replace('/');
        modalRef.current?.setError(err.response?.data.error);
      }
    },
    [name, history],
  );

  const handleDeleteProject = useCallback(async () => {
    try {
      await api.delete(`/${name}`);
      history.replace('/');
    } catch (err: any) {
      if (err.response.status === 404) history.replace('/');
    }
  }, [history, name]);

  const handleBuildProject = useCallback(
    async (errorOnly?: boolean) => {
      try {
        const { data } = await api.post<{ '.ter': string }>(
          `/${name}/compile`,
          undefined,
          {
            params: {
              errorOnly,
            },
          },
        );
        if (!data || !data['.ter']) return;
        setTernaryCode(String(data['.ter']));
      } catch (err: any) {
        if (err.response?.status === 404) history.replace('/');
        if (err.response?.status === 400)
          setErrors(err.response?.data.problems);
      }
    },
    [history, name],
  );

  const handleRunProject = useCallback(async () => {
    try {
      const { data } = await api.post<{ out: string }>(`/${name}/run`);
      if (!data || !data.out) return;
      setOutput(`> ${String(data.out)}`);
    } catch (err: any) {
      if (err.response?.status === 404) history.replace('/');
    }
  }, [history, name]);

  const handleErrorClick = useCallback((error: IError) => {
    editorRef.current?.editor.scrollToLine(error.row, true, true, () => null);
    editorRef.current?.editor.gotoLine(error.row, error.column, true);
    editorRef.current?.editor.focus();
  }, []);

  const handleCodeChange = useCallback(
    async (newCode: string) => {
      try {
        await api.post(`/${name}`, {
          '.try': newCode,
        });
        await handleBuildProject(true);
      } catch (err: any) {
        if (err.response.status === 404) history.replace('/');
      }
    },
    [handleBuildProject, history, name],
  );

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

  useEffect(() => {
    const timer = setTimeout(() => handleCodeChange(code), 1000);
    return () => clearTimeout(timer);
  }, [code, handleCodeChange]);

  useEffect(() => {
    getProjectData();
  }, [getProjectData]);

  return (
    <>
      <Modal
        title="Rename project"
        onConfirm={handleRenameProject}
        ref={modalRef}
      />
      <Container>
        <Header>
          <Name>{name}</Name>
          <ProjectTools
            name={name}
            color={theme.darkGray}
            onRename={() => modalRef.current?.show(name)}
            onDelete={handleDeleteProject}
            goBack
          />
          <IconsContainer>
            <IconContainer
              color={theme.green}
              onClick={() => handleBuildProject()}
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
    </>
  );
};

export { Project };
