import React, { FC, useRef, useState } from 'react';
import { Input, Button, Modal, DatePicker, FormInstance, message } from 'antd';
import { Form } from './style';
import Subscribers from '../Subscribers';
import { server } from '../../services/server';
import { Marathon } from '../MarathonList';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

interface FormValues {
  name?: string;
  startDate?: string;
  endDate?: string;
  img?: string;
  subscribers?: string[];
}

const CreateMarathon: FC<{ setMarathons: any }> = ({ setMarathons }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [subs, setSubs] = useState<string[]>([]);
  const formRef = useRef<FormInstance>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    formRef.current?.submit();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const body: FormValues = {
      name: values.name,
      startDate: values.dates[0],
      endDate: values.dates[1],
      img: values.img,
      subscribers: subs,
    };
    setConfirmLoading(true);
    const newMarathons: Marathon[] | null = await server.postData(
      '/marathon/new',
      body,
    );
    if (newMarathons && newMarathons.length > 0) {
      setMarathons(newMarathons);
      setConfirmLoading(false);
      setVisible(false);
    } else if (newMarathons && newMarathons.length === 0) {
      message.error('Такое название уже существует');
      setConfirmLoading(false);
    } else {
      message.error('Ошибка на сервере');
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Создать марафон
      </Button>
      <Modal
        title="Создание марафона"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
        centered
      >
        <Form
          ref={formRef}
          name="create_marathon"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder="Название" />
          </Form.Item>
          <Form.Item
            name="desc"
            rules={[
              { required: true, message: 'Введите описание' },
              { min: 10, message: 'Минимум 10 символов' },
              { max: 150, message: 'Минимум 150 символов' }
            ]}
          >
            <Input.TextArea placeholder="Описание" />
          </Form.Item>
          <Form.Item name="img">
            <Input placeholder="Ссылка на изображение" />
          </Form.Item>
          <Form.Item
            name="dates"
            rules={[{ required: true, message: 'Введите даты' }]}
          >
            <RangePicker
              name="dates"
              format={dateFormat}
              disabledDate={(date) => date <= moment().add(-1, 'd')}
            />
          </Form.Item>
          <Subscribers subs={subs} setSubs={setSubs} />
        </Form>
      </Modal>
    </>
  );
};

export default CreateMarathon;
