import styled from 'styled-components';
import { Spin as SpinAntd } from 'antd';

export const Spin = styled(SpinAntd)<{ margin: string }>`
  margin: ${(props) => props.margin};
  display: block;
`;

export const EmptyTitle = styled.p<{ fontSize: string; margin?: string }>`
  font-size: ${(props) => props.fontSize};
  color: gray;
  margin: ${(props) => (props.margin ? props.margin : '0 auto')};
  display: block;
  text-align: center;
`;
