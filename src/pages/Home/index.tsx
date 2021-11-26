import React from 'react';

import { ReactComponent as TaylorImage } from 'assets/images/taylor.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plus.svg';

import { useTheme } from 'hooks/useTheme';

import { ProjectTools } from 'components';

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

  const handleRenameProject = (project: string) => {
    console.log('Project renamed', project);
  };

  const handleDeleteProject = (project: string) => {
    console.log('Project deleted', project);
  };

  const handleCreateProject = () => {
    console.log('Project created');
  };

  return (
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
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(
              project => (
                <Project key={project}>
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
                    name={project}
                    color={themeContext.white}
                    onRename={() => handleRenameProject(project)}
                    onDelete={() => handleDeleteProject(project)}
                  />
                </Project>
              ),
            )}
          </Projects>
          <Button onClick={handleCreateProject}>
            <PlusIcon width={36} height={36} style={{ marginRight: 15 }} />
            New project
          </Button>
        </ProjectsContainer>
      </BottomContainer>
    </Container>
  );
};

export { Home };
