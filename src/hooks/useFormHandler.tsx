import { FormInstance } from 'antd/lib/form';

export const useFormHandler = <T,>(
  form: FormInstance,
  onSubmit: (values: T) => void,
  onReset: () => void,
) => {
  // Функция для отправки формы
  const handleSubmit = (): void => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values as T);
        form.resetFields();
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
  };

  // Функция для сброса формы
  const handleReset = (): void => {
    onReset();
    form.resetFields();
  };

  return { handleSubmit, handleReset };
};
