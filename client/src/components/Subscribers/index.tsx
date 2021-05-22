import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

const Subscribers: FC<{ subs: string[]; setSubs: any }> = ({
  subs,
  setSubs,
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputVisible) inputRef?.current?.focus();
  }, [inputVisible]);

  const handleClose = (removedSub: string) => {
    const newSubs = subs.filter((sub) => sub !== removedSub);
    setSubs(newSubs);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target?.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && subs.indexOf(inputValue) === -1) {
      setSubs([...subs, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {subs.map(forMap)}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: '100%' }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={() => setInputVisible(true)} className="site-tag-plus">
          <PlusOutlined /> Добавить подписчика (почта)
        </Tag>
      )}
    </>
  );
};

export default Subscribers;
