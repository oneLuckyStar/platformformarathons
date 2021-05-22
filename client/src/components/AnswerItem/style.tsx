import styled from 'styled-components';
import {Card as AntdCard, Progress as AntdProgress, Typography} from 'antd';

export const Card = styled(AntdCard)`
  width: 100%;
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LeftBlock = styled.div`
  margin-top: 20px;
  width: 60%;
`;

export const RightBlock = styled.div`
  margin-top: 20px;
  width: 38%;
`;

export const RateBlock = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-top: 20px;
`;

export const RateText = styled(Typography.Text)`
  display: flex;
  margin-top: 5px;
  margin-left: 10px;
`;

export const Progress = styled(AntdProgress)`
  .ant-progress-text {
    color: #001529;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
