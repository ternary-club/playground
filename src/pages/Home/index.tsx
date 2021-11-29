import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as TaylorImage } from 'assets/images/taylor.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plus.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools, Modal, IModalRef, Loader } from 'components';

import { api } from 'services/api';

import {
  Container,
  TitleContainer,
  TitleFirstLine,
  Title,
  Text,
  ProjectsContainer,
  Projects,
  Project,
  FolderIcon,
  BottomContainer,
  Button,
} from './styles';

const Home: React.FC = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<string[]>([]);
  const [prevProjectName, setPrevProjectName] = useState('');
  const [renameProject, setRenameProject] = useState(false);

  const modalRef = useRef<IModalRef>(null);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<{ repos: string[] }>('/');
      setRepos(data.repos);
    } catch (err: any) {
      modalRef.current?.setError(err.response?.data.error);
    }
    setLoading(false);
  }, []);

  const handleRenameProject = useCallback(
    async (project: string) => {
      setLoading(true);
      try {
        await api.patch(`/${prevProjectName}?name=${project}`);
        modalRef.current?.hide();
        getProjects();
      } catch (err: any) {
        modalRef.current?.setError(err.response?.data.error);
      }
      setLoading(false);
    },
    [getProjects, prevProjectName],
  );

  const handleDeleteProject = useCallback(
    async (project: string) => {
      setLoading(true);
      try {
        await api.delete(`/${project}`);
        getProjects();
      } catch (err: any) {
        modalRef.current?.setError(err.response?.data.error);
      }
      setLoading(false);
    },
    [getProjects],
  );

  const handleCreateProject = useCallback(
    async (project: string) => {
      setLoading(true);
      try {
        await api.put(`/${project}`);
        modalRef.current?.hide();
        getProjects();
      } catch (err: any) {
        modalRef.current?.setError(err.response?.data.error);
      }
      setLoading(false);
    },
    [getProjects],
  );

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <>
      <Modal
        title={`${renameProject ? 'Rename' : 'New'} project`}
        onConfirm={renameProject ? handleRenameProject : handleCreateProject}
        loading={loading}
        ref={modalRef}
      />
      <Container>
        <TitleContainer>
          <TitleFirstLine>
            <Text>The</Text>
            <Title>Ternary Club</Title>
          </TitleFirstLine>
          <Text>playground</Text>
        </TitleContainer>
        <BottomContainer>
          <TaylorImage width={600} height={350} style={{ marginBottom: 72 }} />
          <ProjectsContainer>
            <Text style={{ fontSize: 36, fontWeight: 600 }}>Your projects</Text>
            <Projects>
              {loading && <Loader color={theme.pink} />}
              {repos.map(repo => (
                <Project key={repo}>
                  <FolderIcon width={48} height={48} />
                  <Text
                    style={{
                      fontSize: 36,
                      padding: '0 10px',
                    }}
                  >
                    {repo}
                  </Text>
                  <ProjectTools
                    style={{ marginLeft: 'auto' }}
                    name={repo}
                    color={theme.white}
                    onRename={() => {
                      setRenameProject(true);
                      modalRef.current?.show(repo);
                      setPrevProjectName(repo);
                    }}
                    onDelete={() => handleDeleteProject(repo)}
                  />
                </Project>
              ))}
            </Projects>
            <Button
              onClick={() => {
                setRenameProject(false);
                modalRef.current?.show();
              }}
            >
              <PlusIcon width={36} height={36} style={{ marginRight: 15 }} />
              New project
            </Button>
          </ProjectsContainer>
        </BottomContainer>
      </Container>
    </>
  );
};

export { Home };
