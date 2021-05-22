import styled from 'styled-components';
import {Button, Form as AntdForm} from 'antd';

export const Form = styled(AntdForm)`
  width: 100%;
`;

export const ModalTitle = styled.div`
  button {
    padding: 0;
    margin-left: 30px;
  }
`;

export const ProfileButton = styled(Button)`
  color: white;
  width: 100%;
  text-align: left;
  height: 40px;
  padding: 0 24px;
  border-radius: 0;
  margin: 10px 0 8px;
  
  &:hover{
    color: #1890ff;
  }
  
  &:focus {
    color: white;
  }
`;
