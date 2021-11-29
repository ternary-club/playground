import React from 'react';

import { LoaderContainer } from './styles';

interface ILoaderProps {
  color: string;
}

const Loader: React.FC<ILoaderProps> = ({ color }) => {
  return <LoaderContainer color={color} />;
};

export { Loader };
