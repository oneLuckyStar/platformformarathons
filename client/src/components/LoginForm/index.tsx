import React from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form } from './style';
import { server } from '../../services/server';
import logo from '../../images/logo-blue.svg';
import {Link, useHistory} from 'react-router-dom';

interface LoginRes {
  accessToken: string;
}

const LoginForm = () => {
  const history = useHistory();
  const onFinish = async (values: any) => {
    const access: LoginRes | null = await server.postData(
      '/user/login',
      {
        ...values
      },
    );
    if (!access) {
      message.error('Ошибка сервера. Попробуйте позже');
      return null;
    } else if (access.accessToken === 'Wrong Credentials') {
      message.error('Неверный логин или пароль');
      return null;
    }
    await localStorage.setItem('token', access.accessToken);
    history.push('/marathons');
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <img
        src={logo}
        width="70%"
        style={{ display: 'block', margin: '0 auto 10px' }}
        alt="logo"
      />
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Введите корректный email',
          },
          {
            required: true,
            message: 'Введите email'
          }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 0 }}
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: '100%', margin: '15px 0' }}
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
        <Link to="/registration">Нет аккаунта? Зарегистрироваться</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
