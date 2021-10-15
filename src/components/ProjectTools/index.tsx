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
      <PenIcon onClick={onRename} color={color} />
      <TrashIcon onClick={onDelete} color={color} />
      <Link
        to={goBack ? '/' : `/project/${name}`}
        style={{ height: 32, width: 32 }}
      >
        {goBack ? (
          <ArrowLeftIcon color={color} />
        ) : (
          <ArrowRightIcon color={color} />
        )}
      </Link>
    </IconsContainer>
  );
};

export default ProjectTools;
