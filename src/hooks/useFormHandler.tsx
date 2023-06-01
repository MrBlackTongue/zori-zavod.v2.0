import {FormInstance} from "antd/lib/form";

export const useFormHandler = <T, >(
  form: FormInstance,
  onSubmit: (values: T) => void,
  onReset: () => void,
) => {
  const handleSubmit = (): void => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values as T);
        form.resetFields();
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  const handleReset = (): void => {
    onReset()
    form.resetFields();
  };

  return {handleSubmit, handleReset};
};