import { createGlobalStyle } from 'styled-components';

import TTNormsProRegular from 'assets/fonts/TT-Norms-Pro/TT-Norms-Pro-Regular.otf';
import TTNormsProBold from 'assets/fonts/TT-Norms-Pro/TT-Norms-Pro-Bold.otf';
import TTNormsProMedium from 'assets/fonts/TT-Norms-Pro/TT-Norms-Pro-Medium.otf';

export default createGlobalStyle`
  @font-face {
    font-family: 'TT Norms Pro';
    src: local('TT Norms Pro'), url(${TTNormsProRegular}) format('opentype');
  }

  @font-face {
    font-family: 'TT Norms Pro';
    font-weight: 600;
    src: local('TT Norms Pro'), url(${TTNormsProMedium}) format('opentype');
  }

  @font-face {
    font-family: 'TT Norms Pro';
    font-weight: 700;
    src: local('TT Norms Pro'), url(${TTNormsProBold}) format('opentype');
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  .no-selection {
    ::-moz-selection {
      background-color: ${({ theme }) => theme.gray};
    }

    ::selection {
      background-color: ${({ theme }) => theme.gray};
    }
  }
`;
