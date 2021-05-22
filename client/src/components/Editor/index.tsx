import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

const Editor: FC<{ setText: any }> = ({ setText }) => {
  return (
    <MdEditor
      style={{ height: '30vh' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => setText(text)}
    />
  );
};

export default Editor;
