import {Upload, message, List, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import {server, SERVER_ADDRESS} from '../../services/server';
import {Link} from './style';
import { Answer, File } from '../TaskPage';

const { Dragger } = Upload;

const AnswerUpload: FC<
  {
    marathonId: string,
    taskId: string,
    fileList: File[],
    setFileList: any
  }> = ({ marathonId, taskId, fileList, setFileList }) => {

  const onDeleteAnswer = async (path: string | undefined) => {
    const newAnswer: Answer | null = await server.getData('/answer/deleteFile', { marathonId, taskId, path })
    if (newAnswer?.files) setFileList(newAnswer.files);
  }

  const token = localStorage.getItem('token');
  const props = {
    name: 'file',
    multiple: false,
    action: `${SERVER_ADDRESS}/answer/sendFile`,
    data: {
      marathonId,
      taskId,
    },
    showUploadList: false,
    headers: {
      'Authorization' : `Bearer ${token}`,
    },
    onChange(info: any) {
      const { status, response } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} загружен на проверку`);
        setFileList(response.files);
      } else if (status === 'error') {
        message.error(`${info.file.name} не удалось загрузить`);
      }
    },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Загрузите сюда Ваш результат</p>
        <p className="ant-upload-hint">
          Можно загрузить несколько файлов на проверку
        </p>
      </Dragger>
      <List
        itemLayout="horizontal"
        dataSource={ fileList }
        renderItem={item => (
          <List.Item actions={[<Button type="link" onClick={() => onDeleteAnswer(item.path)}>Удалить</Button>]}>
            <Link href={`${SERVER_ADDRESS}/${item.path?.replace('public/', '/')}`}>
              {item.name}
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default AnswerUpload;
