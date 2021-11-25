import React from 'react';
import { Link } from 'react-router-dom';

import {
  IconsContainer,
  PenIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from './styles';

interface IProjectProps {
  name: string;
  color: string;
  onRename: () => void;
  onDelete: () => void;
  goBack?: boolean;
  style?: React.CSSProperties;
}

const ProjectTools: React.FC<IProjectProps> = ({
  name,
  color,
  onRename,
  onDelete,
  goBack,
  style,
}) => {
  return (
    <IconsContainer style={style}>
      <PenIcon onClick={onRename} color={color} title="Rename project" />
      <TrashIcon onClick={onDelete} color={color} title="Delete project" />
      <Link
        to={goBack ? '/' : `/project/${name}`}
        style={{ height: 32, width: 32 }}
      >
        {goBack ? (
          <ArrowLeftIcon color={color} title="Go back to home" />
        ) : (
          <ArrowRightIcon color={color} title="Open project" />
        )}
      </Link>
    </IconsContainer>
  );
};

export { ProjectTools };
