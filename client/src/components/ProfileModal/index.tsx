import React, { FC, useContext, useRef, useState } from 'react';
import {Button, FormInstance, Input, message, Modal, Switch} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { Form, ProfileButton, ModalTitle } from './style';
import { UserContext} from '../../UserContext';
import {useHistory} from 'react-router-dom';
import {server} from '../../services/server';

interface FormValues {
  name?: string;
  email?: string;
  password?: string;
}

const ProfileModal: FC = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const formRef = useRef<FormInstance>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (values: any) => {
    formRef.current?.submit();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onExit = async () => {
    await localStorage.removeItem('token');
    history.push('/login');
  }

  const onFinish = async (values: any) => {
    const body: FormValues = {
      name: values.name,
      email: values.email,
    };
    if (values.newPassword) body.password = values.newPassword;
    setConfirmLoading(true);
    const access: { accessToken: string } | null = await server.postData('/user/update', body);
    if (access && access.accessToken) {
      await localStorage.setItem('token', access.accessToken);
      setConfirmLoading(false);
      setVisible(false);
    } else {
      setConfirmLoading(false);
      message.error('Такая почта уже занята');
    }
  };

  return (
    <>
      <ProfileButton type="text" onClick={showModal} icon={<UserOutlined />}>
       Профиль
      </ProfileButton>

      <Modal
        title={
          <ModalTitle>
            Профиль
            <Button type='link' onClick={onExit}>Выйти из аккаунта</Button>
          </ModalTitle>
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form ref={formRef} onFinish={onFinish} name="profile" initialValues={{
          name: user?.name,
          email: user?.email
        }}>

          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Почта"
            rules={[
              {
                type: 'email',
                message: 'Введите корректный email',
              },
              {
                required: true,
                message: 'Введите почту'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <span>Сменить пароль</span> <Switch defaultChecked={false} onChange={setChangePassword} />
          {
            changePassword ?
              <>
                <Form.Item
                  style={{ marginTop: '20px' }}
                  name="newPassword"
                  label="Новый пароль"
                  rules={[{ required: true, message: 'Введите пароль' }]}
                >
                  <Input.Password type="password"  />
                </Form.Item>

                <Form.Item
                  name="repeatPassword"
                  label="Повторите пароль"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Введите пароль' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                      },
                    }),
                  ]}
                >
                  <Input.Password type="password"  />
                </Form.Item>
              </> : null
          }
        </Form>
      </Modal>
    </>
  );
};

export default ProfileModal;
