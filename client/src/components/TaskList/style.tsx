import styled from 'styled-components';
import { Breadcrumb as BreadcrumbAntd } from 'antd';

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

export const Breadcrumb = styled(BreadcrumbAntd)`
  position: sticky;
  padding: 20px 24px;
  top: 0;
  width: 100%;
  background-color: white;
`;

export const Settings = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  width: 100%;
`;
