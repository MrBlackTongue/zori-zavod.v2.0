import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FormInstance } from 'antd/lib/form';

interface FormModalProps<T> extends ModalProps {
  isOpen: boolean;
  onSubmit: (values: T) => void;
  onCancel: () => void;
  renderForm: (form: any) => React.ReactNode;
  form: FormInstance;
}

export const FormModal = <T extends object>({
  isOpen,
  onSubmit,
  onCancel,
  renderForm,
  form,
  ...modalProps
}: FormModalProps<T>) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (): void => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values as T);
      })
      .catch(error => {
        console.log('Ошибка валидации:', error);
      });
  };

  const handleReset = () => {
    onCancel();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      {...modalProps}
      title={
        <div
          style={{ width: '100%', cursor: 'move' }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}}>
          {modalProps.title}
        </div>
      }
      centered
      okText={'Сохранить'}
      cancelText={'Отмена'}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
      modalRender={modal => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}>
      {renderForm(form)}
    </Modal>
  );
};
