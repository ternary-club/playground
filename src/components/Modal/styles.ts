import styled from 'styled-components';

interface IProps {
  hidden?: boolean;
  error?: boolean;
}

interface IContainerProps {
  dimensions?: {
    width?: number;
    height?: number;
  };
}

interface IButtonProps {
  outline?: boolean;
}

export const Backdrop = styled.div<IProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  transform: ${({ hidden }) =>
    hidden ? 'translateY(-100vh)' : 'translateY(0)'};
  background: #00000085;
  transition: opacity 0.2s;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.form<IProps & IContainerProps>`
  top: calc(50% - ${({ dimensions }) => (dimensions?.height || 0) / 2}px);
  left: calc(50% - ${({ dimensions }) => (dimensions?.width || 0) / 2}px);
  position: absolute;
  background: ${({ theme }) => theme.lightGray};
  z-index: 10;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: transform 0.3s;
  transform: ${({ hidden }) =>
    hidden ? 'translateY(-100vh)' : 'translateY(0)'};
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.darkGray};
  font-family: 'TT Norms Pro', sans-serif;
  font-size: 36px;
  font-weight: 600;
  align-self: flex-start;
`;

export const Input = styled.input<IProps>`
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 15px 20px;
  color: ${({ theme }) => theme.pink};
  border: 2px solid ${({ theme, error }) => (error ? theme.red : theme.white)};
  transition: all 0.2s;
  margin: 20px 0 ${({ error }) => (error ? 0 : '32px')};
  width: 100%;
  min-width: 400px;
  font-size: 20px;

  ::placeholder {
    color: ${({ theme }) => theme.gray};
  }

  :active,
  :focus {
    border: 2px solid ${({ theme }) => theme.pink};
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Button = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme, outline }) => (outline ? theme.pink : theme.white)};
  background: ${({ theme, outline }) =>
    outline ? theme.lightPink : theme.pink};
  font-size: 20px;
  font-family: 'TT Norms Pro', sans-serif;
  font-weight: 700;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid ${({ theme }) => theme.pink};

  :hover:not(:disabled) {
    filter: brightness(90%);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const ErrorLabel = styled.span`
  color: ${({ theme }) => theme.red};
  font-family: 'TT Norms Pro', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 16px 16px;
  align-self: flex-start;

  :first-letter {
    text-transform: capitalize;
  }
`;
