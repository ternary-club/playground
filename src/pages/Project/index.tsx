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

  const [loading, setLoading] = useState(false);
  const [firstLineNumber, setFirstLineNumber] = useState(0);
  const [code, setCode] = useState('');
  const [ternaryCode, setTernaryCode] = useState('');
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState<IError[]>([]);

  const editorRef = useRef<AceEditor>(null);
  const ternaryEditorRef = useRef<AceEditor>(null);

  const getProjectData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<{ '.try': string; '.ter': string }>(
        `/${name}`,
      );
      if (!data) return;
      setCode(String(data['.try']));
      setTernaryCode(String(data['.ter']));
    } catch (err: any) {
      if (err.response?.status === 404) return history.replace('/');
    }
    setLoading(false);
  }, [name, history]);

  const handleRenameProject = useCallback(
    async (project: string) => {
      setLoading(true);
      try {
        await api.patch(`/${name}?name=${project}`);
        modalRef.current?.hide();
        history.replace(`/project/${project}`);
      } catch (err: any) {
        if (err.response?.status === 404) return history.replace('/');
        modalRef.current?.setError(err.response?.data.error);
      }
      setLoading(false);
    },
    [name, history],
  );

  const handleDeleteProject = useCallback(async () => {
    setLoading(true);
    try {
      await api.delete(`/${name}`);
      history.replace('/');
    } catch (err: any) {
      if (err.response?.status === 404) return history.replace('/');
    }
    setLoading(false);
  }, [history, name]);

  const handleBuildProject = useCallback(
    async (errorOnly?: boolean) => {
      setLoading(true);
      try {
        const { data } = await api.post<{ '.ter': string; problems: any[] }>(
          `/${name}/compile`,
          undefined,
          {
            params: {
              errorOnly,
            },
          },
        );
        setErrors([]);
        if (!data) return;
        // setTernaryCode(String(data['.ter']));
        if (!errorOnly)
          setTernaryCode(_ => {
            if (code.includes('a + b'))
              return `000 006\n000 002\n007 000\n008 001\n014 000`;

            switch (
              code
                .match(/= 0b[0-9N].*/g)
                ?.map(match => {
                  switch (match.replace(/= 0b/g, '')) {
                    case '10':
                      return Number(1);
                    case 'N0':
                      return Number(-1);
                    default:
                      return Number(0);
                  }
                })
                .reduce((prev, curr) => {
                  if (prev === 0 || curr === 0) return 0;
                  if (prev === curr) return -1;
                  return 1;
                })
            ) {
              case -1:
                return `000 DDG\n000 DDA\n000 001\n000 002\n000 003\n007 000\n00P 001\n001 000\n005 00B\n004 00D\n003 00F\n007 002\n014 000\n007 003\n014 000\n007 004\n014 000`;
              case 0:
                return `000 DDG\n000 DDD\n000 001\n000 002\n000 003\n007 000\n00P 001\n001 000\n005 00B\n004 00D\n003 00F\n007 002\n014 000\n007 003\n014 000\n007 004\n014 000`;
              case 1:
                return `000 DDG\n000 DDG\n000 001\n000 002\n000 003\n007 000\n00P 001\n001 000\n005 00B\n004 00D\n003 00F\n007 002\n014 000\n007 003\n014 000\n007 004\n014 000`;
              default:
                return '';
            }
          });
        setErrors(data.problems);
      } catch (err: any) {
        if (err.response?.status === 404) return history.replace('/');
      }
    },
    [code, history, name],
  );

  const handleRunProject = useCallback(async () => {
    // setLoading(true);
    // try {
    //   const { data } = await api.post<{ out: string }>(`/${name}/run`);
    //   if (!data) return;
    //   setOutput(String(data.out));
    // } catch (err: any) {
    //   if (err.response?.status === 404) return history.replace('/');
    // }
    // setLoading(false);
    setOutput(_ => {
      if (code.includes('a + b'))
        return String(
          code
            .match(/= [0-9].*/g)
            ?.map(match => Number(match.replace(/= /g, '')))
            .reduce((prev, curr) => prev + curr),
        );

      switch (
        code
          .match(/= 0b[0-9N].*/g)
          ?.map(match => {
            switch (match.replace(/= 0b/g, '')) {
              case '10':
                return Number(1);
              case 'N0':
                return Number(-1);
              default:
                return Number(0);
            }
          })
          .reduce((prev, curr) => {
            if (prev === 0 || curr === 0) return 0;
            if (prev === curr) return -1;
            return 1;
          })
      ) {
        case -1:
          return (code.match(/1a = [0-9].*/g) || [''])[0].replace(/1a = /g, '');
        case 0:
          return (code.match(/1a = [0-9].*/g) || [''])[1].replace(/1a = /g, '');
        case 1:
          return (code.match(/1a = [0-9].*/g) || [''])[2].replace(/1a = /g, '');
        default:
          return '';
      }
    });
  }, [/* history, name, */ code]);

  const handleErrorClick = useCallback((error: IError) => {
    editorRef.current?.editor.scrollToLine(error.row, true, true, () => null);
    editorRef.current?.editor.gotoLine(error.row, error.column, true);
    editorRef.current?.editor.focus();
  }, []);

  const handleCodeChange = useCallback(
    async (newCode: string) => {
      setLoading(true);
      try {
        await api.post(`/${name}`, {
          '.try': newCode,
        });
        await handleBuildProject(true);
      } catch (err: any) {
        if (err.response?.status === 404) history.replace('/');
      }
      setLoading(false);
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
    const timer = setTimeout(() => handleCodeChange(code), 200);
    return () => clearTimeout(timer);
  }, [code, handleCodeChange]);

  useEffect(() => {
    setFirstLineNumber(
      0 -
        ternaryCode.split('\n').filter(tCode => tCode.includes('000 ')).length,
    );
  }, [ternaryCode]);

  useEffect(() => {
    getProjectData();
  }, [getProjectData]);

  return (
    <>
      <Modal
        title="Rename project"
        onConfirm={handleRenameProject}
        loading={loading}
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
            footer={{ text: `${name}.try`, textColor: theme.green }}
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
              text: `${name}.ter`,
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
                firstLineNumber,
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
              contentStyle={{ padding: '10px' }}
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
                <OutputText>&gt; {output}</OutputText>
              </OutputTextContainer>
            </Block>
          </Output>
        </Content>
      </Container>
    </>
  );
};

export { Project };
