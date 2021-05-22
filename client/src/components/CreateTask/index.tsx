import React, { FC, useRef, useState } from 'react';
import { Input, Button, Modal, DatePicker, FormInstance, message } from 'antd';
import { Form } from './style';
import { server } from '../../services/server';
import Editor from '../Editor';
import { Task } from '../TaskList';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

interface FormValues {
  name?: string;
  startDate?: string;
  endDate?: string;
  text?: string;
  marathonId?: string;
}

const CreateTask: FC<{ setTasks: any; marathonId: string }> = ({
  setTasks,
  marathonId,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [text, setText] = useState(undefined);

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
      text,
      marathonId,
    };
    setConfirmLoading(true);
    const newTasks: Task[] | null = await server.postData('/task/new', body);
    if (newTasks && newTasks.length > 0) {
      setTasks(newTasks);
      setConfirmLoading(false);
      setVisible(false);
    } else if (newTasks && newTasks.length === 0) {
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
        Создать задание
      </Button>
      <Modal
        title="Создание задания"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
        width="900px"
        style={{ top: '50px' }}
        centered
      >
        <Form
          ref={formRef}
          name="createTask"
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
            name="dates"
            rules={[{ required: true, message: 'Введите даты' }]}
          >
            <RangePicker
              name="dates"
              format={dateFormat}
              disabledDate={(date) => date <= moment().add(-1, 'd')}
            />
          </Form.Item>
          <Editor setText={setText} />
        </Form>
      </Modal>
    </>
  );
};

export default CreateTask;
