 import React, {useState, useEffect} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeMeter, TypeMeterType, TypeUnit} from "../../../types";
import {getAllMeter} from "../../../services";

const {Option} = Select;

// export const EditDrawerMeter: React.FC<EditDrawerProps<TypeMeter>> = ({
//                                                                         isOpen,
//                                                                         closeDrawer,
//                                                                         updateItem
//                                                                       }) => {

//   const [form] = Form.useForm();
  // 
//   const [allMeter, setAllMeter] = useState<TypeMeter[]>();
//   const [selectedMeter, setSelectedMeter] = useState<TypeMeter>();
// 
//   const onChangeMeter = (value: any, option: any): void => {
//     const meterType: TypeMeter = {
//       id: option.id,
//       serialNumber: value,
//       description: value,
//       meterTypeDto: TypeMeterType,
//     };
//     form.setFieldsValue({
//       meterType: meterType
//     });
//     setSelectedMeter(meterType)
//   };
// 
//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         updateItem(values);
//         closeDrawer();
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//         return;
//       });
//   }
// 
//   useEffect(() => {
//     getAllMeter().then((allMeterType) => {
//       setAllMeter(allMeterType);
//     });
//   }, []);
// 
//   useEffect(() => {
//     if (!isOpen) {
//       form.resetFields();
//       setSelectedMeter(undefined);
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
//               value={selectedMeter ? selectedMeter.title : undefined}
//               onChange={onChangeMeter}
//             >
//               {allMeter && allMeter.length > 0 ?
//                 allMeter.map(meterType => (
//                   <Option id={meterType.id} key={meterType.id} value={meterType.title}>
//                     {meterType.title}
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