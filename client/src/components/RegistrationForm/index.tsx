import React from 'react';
import {Input, Checkbox, Button, message} from 'antd';
import { Form, FormItems } from './style';
import logo from '../../images/logo-blue.svg';
import {useHistory} from 'react-router-dom';
import {server} from '../../services/server';
import PasswordValidator from 'password-validator';

const schemaPass = new PasswordValidator();

schemaPass.is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface LoginRes {
  accessToken: string;
}

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values: any) => {
    if (!schemaPass.validate(values.password)) {
      message.error('Пароль слишком легкий (минимум 8 символов, разный регистр)');
      return null;
    }
    const access: LoginRes | null = await server.postData(
      '/user/create',
      {
        ...values
      },
    );

    if (!access?.accessToken) {
      message.error('Такой email уже занят');
      return null;
    }

    await localStorage.setItem('token', access.accessToken);
    history.push('/marathons');
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <img
        src={logo}
        width="50%"
        style={{ display: 'block', margin: '0 auto 10px' }}
        alt="logo"
      />
      <FormItems>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Введите корректный E-mail',
            },
            {
              required: true,
              message: 'Введите E-mail',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Введите Имя',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Повторите пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Повторите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Пароли не совпадают');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          name="role"
          valuePropName="checked"
        >
          <Checkbox>
            Зарегистрироваться с ролью преподавателя
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }} {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </FormItems>
    </Form>
  );
};

export default RegistrationForm;
