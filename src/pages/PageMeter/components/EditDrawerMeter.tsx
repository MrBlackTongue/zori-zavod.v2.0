import React, {useState, useEffect} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeMeter, TypeMeterType, TypeUnit} from "../../../types";
import {getAllMeterType} from "../../../services";

// const {Option} = Select;
//
// export const EditDrawerMeter: React.FC<EditDrawerProps<TypeMeter>> = ({
//                                                                         isOpen,
//                                                                         closeDrawer,
//                                                                         createItem,
//                                                                       }) => {
//
//   const [form] = Form.useForm();
//   const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();
//   const [selectedMeterType, setSelectedMeterType] = useState<TypeMeterType>();
//
//   const onChangeMeterType = (values: string, option: any): TypeMeterType => {
//     const meterType: TypeMeterType = {
//       id: option.id,
//       name: values,
//     };
//     form.setFieldsValue({
//       meterType: meterType
//     });
//     setSelectedMeterType(meterType)
//     return meterType
//   };
//
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         createItem(values);
//         closeDrawer();
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//         return;
//       });
//   }
//
//   useEffect(() => {
//     getAllMeterType().then((allMeterType) => {
//       setAllMeterType(allMeterType);
//     });
//   }, []);
//
//   useEffect(() => {
//     if (!isOpen) {
//       form.resetFields();
//       setSelectedMeterType(undefined);
//     }
//   }, [isOpen]);
//
//   return (
//     <Drawer
//       title="Добавление счётчика"
//       width={700}
//       open={isOpen}
//       onClose={closeDrawer}
//       extra={
//         <Space>
//           <Button onClick={closeDrawer}>Отмена</Button>
//           <Button onClick={handleOk} type="primary" htmlType="submit">
//             Сохранить
//           </Button>
//         </Space>
//       }
//     >
//       <Form
//         form={form}
//         labelCol={{span: 6}}
//         wrapperCol={{span: 16}}
//         style={{marginTop: 30}}
//       >
//         <Form.Item
//           label="Название"
//           name="title"
//           rules={[{required: true, message: 'Введите название'}]}
//         >
//           <Input/>
//         </Form.Item>
//         <Form.Item
//           label="Тип счётчика"
//           name="meterType"
//         >
//           <div>
//             <Select
//               value={selectedMeterType ? selectedMeterType.name : undefined}
//               onChange={onChangeMeterType}
//             >
//               {allMeterType && allMeterType.length > 0 ?
//                 allMeterType.map(meterType => (
//                   <Option id={meterType.id} key={meterType.id} value={meterType.name}>
//                     {meterType.name}
//                   </Option>
//                 )) : null}
//             </Select>
//           </div>
//         </Form.Item>
//         <Form.Item
//           label="Единицы измерения"
//           name="unit"
//           rules={[{required: true, message: 'Введите единицы измерения'}]}
//         >
//           <Select>
//             {Object.keys(TypeUnit).map(unit => (
//               <Option key={unit} value={unit}>
//                 {unit}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           label="Минимальное значение"
//           name="min"
//           rules={[{required: true, message: 'Введите минимальное значение'}]}
//         >
//           <InputNumber min={0}/>
//         </Form.Item>
//         <Form.Item
//           label="Максимальное значение"
//           name="max"
//           rules={[{required: true, message: 'Введите максимальное значение'}]}
//         >
//           <InputNumber min={0}/>
//         </Form.Item>
//       </Form>
//     </Drawer>
//   );
// }