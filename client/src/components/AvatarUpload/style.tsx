import styled, { css } from 'styled-components';
import { Upload as AntdUpload } from 'antd';

export const Upload = styled(AntdUpload)<{ customStyles?: string }>`
  width: 128px;
  height: 128px;
  ${(props) =>
    props.customStyles
      ? css`
          ${props.customStyles}
        `
      : ''}
  .ant-upload {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
