import styled from 'styled-components';
import {Button, Card as AntdCard, Progress as AntdProgress, Typography} from 'antd';

export const Card = styled(AntdCard)`
  width: 100%;
  display: flex;
  
  margin: 20px 20px 0 20px;
  .ant-card-body {
    flex: 1;
  }
  .ant-card-actions {
    display: flex;
    flex-direction: column;
    width: 50px;
  }
`;

export const Progress = styled(AntdProgress)`
  .ant-progress-text {
    color: #001529;
  }
`;

export const RateBlock = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-top: 10px;
`;

export const RateText = styled(Typography.Text)`
  display: flex;
  margin-top: 5px;
  margin-left: 10px;
`;

export const AnswersBtn = styled(Button)`
  margin-top: 20px;
`;