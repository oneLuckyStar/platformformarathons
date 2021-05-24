import styled from 'styled-components';
import {Card as AntdCard, Typography} from 'antd';

export const Card = styled(AntdCard)`
  width: 400px;
  margin: 20px;
`;

export const ProgressBlock = styled.div`
  width: 100%;
`;

export const ContentTitle = styled(Typography.Title)`
  margin-bottom: 0 !important;
`;

export const ImgHeader = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Desc = styled.div`
  margin-top: 0;
  .ant-typography {
    margin: 5px 0 0 0;
  }
`;


