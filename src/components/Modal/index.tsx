import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { ReactComponent as Close } from 'assets/images/close.svg';
import { ReactComponent as Check } from 'assets/images/check.svg';

import {
  Backdrop,
  Container,
  Label,
  Input,
  ButtonsContainer,
  Button,
  ErrorLabel,
} from './styles';

export interface IModalRef {
  show: (initialValue?: string) => void;
  hide: () => void;
  setError: (error: string) => void;
}

interface IModalProps {
  title: string;
  onConfirm: (name: string) => void;
}

const Modal = forwardRef<IModalRef, IModalProps>(
  ({ title, onConfirm }, ref) => {
    const containerRef = useRef<HTMLFormElement>(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [error, setError] = useState('');

    const handleOpen = useCallback((initialValue?: string) => {
      setError('');
      setProjectName(initialValue || '');
      setIsModalVisible(true);
    }, []);

    const handleClose = useCallback(() => setIsModalVisible(false), []);

    useLayoutEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref({
            show: (initialValue?: string) => handleOpen(initialValue),
            hide: () => handleClose(),
            setError: (err: string) => setError(err),
          });
        } else {
          ref.current = {
            show: (initialValue?: string) => handleOpen(initialValue),
            hide: () => handleClose(),
            setError: (err: string) => setError(err),
          };
        }
      }
    }, [ref, handleOpen, handleClose]);

    return (
      <>
        <Backdrop onClick={handleClose} hidden={!isModalVisible} />
        <Container
          hidden={!isModalVisible}
          ref={containerRef}
          dimensions={{
            width: containerRef.current?.clientWidth,
            height: containerRef.current?.clientHeight,
          }}
          onSubmit={e => {
            e.preventDefault();
            if (typeof onConfirm === 'function') onConfirm(projectName);
          }}
        >
          <Label>{title}</Label>
          <Input
            value={projectName}
            onChange={e =>
              setProjectName(
                e.target.value.toLocaleLowerCase().replace(/ /g, '-'),
              )
            }
            placeholder="my-cool-project"
            error={!!error}
            required
          />
          {error && <ErrorLabel>{error}</ErrorLabel>}
          <ButtonsContainer>
            <Button
              type="button"
              outline
              onClick={handleClose}
              style={{ marginRight: 5 }}
            >
              <Close width={18} height={18} style={{ marginRight: 10 }} />
              Cancel
            </Button>
            <Button type="submit" style={{ marginLeft: 5 }}>
              <Check width={20} height={20} style={{ marginRight: 10 }} />
              Confirm
            </Button>
          </ButtonsContainer>
        </Container>
      </>
    );
  },
);

export { Modal };
