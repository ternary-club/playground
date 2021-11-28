import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as TaylorImage } from 'assets/images/taylor.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plus.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools, Modal, IModalRef } from 'components';

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
  const themeContext = useTheme();

  const [repos, setRepos] = useState<string[]>([]);

  const modalRef = useRef<IModalRef>(null);

  const handleRenameProject = useCallback((project: string) => {
    console.log('Project renamed', project);
  }, []);

  const handleDeleteProject = useCallback((project: string) => {
    console.log('Project deleted', project);
  }, []);

  const handleSaveProject = useCallback((project: string) => {
    console.log('NAME', project);
  }, []);

  const handleCreateProject = useCallback(() => {
    modalRef.current?.show({
      title: 'New project',
      onConfirm: handleSaveProject,
    });
  }, []);

  const getProjects = useCallback(async () => {
    try {
      const { data } = await api.get<{ repos: string[] }>('/');
      setRepos(data.repos);
    } catch (err) {
      console.log('ERR', err);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <>
      <Modal ref={modalRef} />
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
              {repos.map(repo => (
                <Project key={repo}>
                  <FolderIcon width={48} height={48} />
                  <Text
                    style={{
                      fontSize: 36,
                      padding: '0 10px',
                    }}
                  >
                    Teste
                  </Text>
                  <ProjectTools
                    style={{ marginLeft: 'auto' }}
                    name={repo}
                    color={themeContext.white}
                    onRename={() => handleRenameProject(repo)}
                    onDelete={() => handleDeleteProject(repo)}
                  />
                </Project>
              ))}
            </Projects>
            <Button onClick={handleCreateProject}>
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
