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
//       title="���������� ��������"
//       width={700}
//       open={isOpen}
//       onClose={closeDrawer}
//       extra={
//         <Space>
//           <Button onClick={closeDrawer}>������</Button>
//           <Button onClick={handleOk} type="primary" htmlType="submit">
//             ���������
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
//           label="��������"
//           name="title"
//           rules={[{required: true, message: '������� ��������'}]}
//         >
//           <Input/>
//         </Form.Item>
//         <Form.Item
//           label="��� ��������"
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
//           label="������� ���������"
//           name="unit"
//           rules={[{required: true, message: '������� ������� ���������'}]}
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
//           label="����������� ��������"
//           name="min"
//           rules={[{required: true, message: '������� ����������� ��������'}]}
//         >
//           <InputNumber min={0}/>
//         </Form.Item>
//         <Form.Item
//           label="������������ ��������"
//           name="max"
//           rules={[{required: true, message: '������� ������������ ��������'}]}
//         >
//           <InputNumber min={0}/>
//         </Form.Item>
//       </Form>
//     </Drawer>
//   );
// }