import {
  forwardRef,
  useCallback,
  useEffect,
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

interface IOptions {
  title: string;
  onConfirm: (name: string) => void;
  initialValue?: string;
}

export interface IModalRef {
  show: (options: IOptions) => void;
  hide: () => void;
  setError: (error: string) => void;
}

const Modal = forwardRef<IModalRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [onConfirm, setOnConfirm] = useState<(name: string) => void>(
    (_name: string) => null,
  );
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const handleOpen = useCallback((options: IOptions) => {
    setError('');
    setTitle(options.title);
    setOnConfirm(options.onConfirm);
    setProjectName(options.initialValue || '');
    setIsModalVisible(true);
  }, []);

  const handleClose = useCallback(() => setIsModalVisible(false), []);

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          show: (options: IOptions) => handleOpen(options),
          hide: () => handleClose(),
          setError: (err: string) => setError(err),
        });
      } else {
        ref.current = {
          show: (options: IOptions) => handleOpen(options),
          hide: () => handleClose(),
          setError: (err: string) => setError(err),
        };
      }
    }
  }, [ref, handleOpen, handleClose]);

  useEffect(() => {
    console.log('ON CONFIRM', onConfirm);
  }, [onConfirm]);

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
      >
        <Label>{title}</Label>
        <Input
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          placeholder="my-cool-project"
          error={!!error}
        />
        {error && <ErrorLabel>{error}</ErrorLabel>}
        <ButtonsContainer>
          <Button outline onClick={handleClose} style={{ marginRight: 5 }}>
            <Close width={18} height={18} style={{ marginRight: 10 }} />
            Cancel
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            onClick={() => {
              if (typeof onConfirm === 'function') onConfirm(projectName);
              console.log('CONFIRM', onConfirm);
            }}
          >
            <Check width={20} height={20} style={{ marginRight: 10 }} />
            Confirm
          </Button>
        </ButtonsContainer>
      </Container>
    </>
  );
});

export { Modal };
