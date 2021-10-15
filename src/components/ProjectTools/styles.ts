import styled from 'styled-components';

import { ReactComponent as Pen } from 'assets/images/pen.svg';
import { ReactComponent as Trash } from 'assets/images/trash.svg';
import { ReactComponent as ArrowRight } from 'assets/images/arrow-right.svg';
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-left.svg';

interface IIconProps {
  color: string;
}

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-self: flex-end;
`;

export const PenIcon = styled(Pen)<IIconProps>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 6px;

  path {
    fill: ${({ color }) => color};
  }

  :hover {
    filter: brightness(90%);
  }
`;

export const TrashIcon = styled(Trash)<IIconProps>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 6px;

  path {
    fill: ${({ color }) => color};
  }

  :hover {
    filter: brightness(90%);
  }
`;

export const ArrowRightIcon = styled(ArrowRight)<IIconProps>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 6px;

  path {
    fill: ${({ color }) => color};
  }

  :hover {
    filter: brightness(90%);
  }
`;

export const ArrowLeftIcon = styled(ArrowLeft)<IIconProps>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 6px;

  path {
    fill: ${({ color }) => color};
  }

  :hover {
    filter: brightness(90%);
  }
`;
