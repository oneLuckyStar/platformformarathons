import styled from 'styled-components';
import {Card as AntdCard, Typography} from 'antd';
const { Paragraph } = Typography;

export const Main = styled.div`
  padding: 15px;
`;

export const Info = styled(AntdCard)`
  margin-bottom: 15px;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GroupItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid whitesmoke;
`;

export const EditParagraph = styled(Paragraph)`
  width: 300px;
`;


