import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Breadcrumb as BreadcrumbAntd, Button as ButtonAntd, Spin as SpinAntd, Input  } from 'antd';

const { TextArea: TextAreaAntd } = Input;

export const Main = styled.div`
  padding: 20px 24px;
`;

export const Button = styled(ButtonAntd)`
  position: fixed;
  top: 40px;
  right: 30px;
  width: 150px;
  margin-left: auto;
`;

export const Markdown = styled(ReactMarkdown)`
  max-width: 800px;
  margin: 0 auto;
`;

export const AnswerBlock = styled.div`
  max-width: 800px;
  margin: 50px auto 0;
`;

export const Breadcrumb = styled(BreadcrumbAntd)`
  position: sticky;
  padding: 20px 24px;
  top: 0;
  width: 100%;
  background-color: white;
`;

export const Spin = styled(SpinAntd)`
  margin: 15px auto;
  display: block;
`;

export const TextArea = styled(TextAreaAntd)`
  margin: 15px 0;
`;

export const SaveButton = styled(ButtonAntd)`
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
`;
