import styled from 'styled-components';
import { Layout } from 'antd';
const { Content: AntdContent } = Layout;

export const Main = styled(Layout)`
  background-color: whitesmoke;
  height: 100vh;
`;

export const Content = styled(AntdContent)`
  margin: 24px 16px;
  overflow-y: auto;
  height: calc(100vh - (24px * 2));
  background-color: white;
  color: black;
  position: relative;
  min-width: 400px;
`;
