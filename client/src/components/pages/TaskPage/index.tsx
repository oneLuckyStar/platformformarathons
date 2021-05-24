import React, { FC, useEffect, useState } from 'react';
import { Main, Markdown, Spin, Breadcrumb, AnswerBlock, TextArea, SaveButton } from './style';
import { Link } from 'react-router-dom';
import { server } from '../../../services/server';
import { Task } from '../../TaskList';
import AnswerUpload from '../../AnswerUpload';
import {message, Typography} from 'antd';
import {User} from '../../Profile';
const gfm = require('remark-gfm');

type Props = {
  marathonId: string;
  taskId: string;
};

export interface File {
  name?: string;
  path?: string;
}

export interface Answer {
  _id?: string;
  files?: File[];
  creator: User;
  text: string;
  creatorId?: string;
  marathonId?: string;
  taskId?: string;
  modifiedTs?: string;
  result?: number;
  comment?: string;
}

function Image(props: any) {
  return <img alt='logo' {...props} style={{ maxWidth: '100%' }} />;
}

const TaskPage: FC<Props> = ({ marathonId, taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [text, setText] = useState<string>('');
  const [isSendLoading, setSendLoading] = useState<boolean>(false);


  useEffect(() => {
    (async () => {
      const data =
        (await server.getData<Task>('/task/info', { taskId, marathonId })) ??
        null;
      setTask(data);
      const newAnswer: Answer | null = await server.getData('/answer/my', { marathonId, taskId })
      if (newAnswer?.files) setFileList(newAnswer.files);
      if (newAnswer?.text) setText(newAnswer.text);
    })();
  }, [taskId, marathonId]);

  const onSendText = async () => {
    setSendLoading(true);
    const newAnswer: Answer | null = await server.postData('/answer/sendText', { marathonId, taskId, text })
    if (newAnswer?.text) setText(newAnswer.text);
    message.success(`Текст отправлен на проверку`);
    setSendLoading(false);
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/marathons">Марафоны</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/marathons/${marathonId}`}>{task?.marathonName}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{task?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Main>
        {task?.text ? (
          <Markdown
            plugins={[gfm]}
            source={task?.text}
            renderers={{ image: Image }}
          />
        ) : (
          <Spin />
        )}
        <AnswerBlock>
          <Typography.Title level={3} style={{marginBottom: 0}}>Ответ</Typography.Title>
          <Typography.Text type="secondary">Прикрепите текстовый ответ и/или файлы</Typography.Text>
          <TextArea onChange={(e) => setText(e.target.value)} value={text} placeholder="Ваш ответ" rows={4} />
          <SaveButton loading={isSendLoading} onClick={onSendText} type="primary">Сохранить</SaveButton>
          <Typography.Title level={3}>Файлы</Typography.Title>
          <AnswerUpload fileList={fileList} setFileList={setFileList} marathonId={marathonId} taskId={taskId}/>
        </AnswerBlock>
      </Main>
    </>
  );
};

export default TaskPage;
