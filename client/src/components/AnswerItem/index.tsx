import React, {FC, useEffect, useState} from 'react';
import { Card, CardContent, LeftBlock, RightBlock, RateBlock, RateText, Title } from './style';
import {
  UserOutlined,
} from '@ant-design/icons';
import {List, Typography, Collapse, Rate, Input, Button, message} from 'antd';
import { Answer } from '../TaskPage';
import moment from 'moment';
import {server, SERVER_ADDRESS} from '../../services/server';

export const desc = [
  {
    title: 'Очень плохо',
    color: '#FF0000'
  },
  {
    title: 'Плохо',
    color: '#FF8C00'
  },
  {
    title: 'Нормально',
    color: '#B8860B'
  },
  {
    title: 'Хорошо',
    color: '#90EE90'
  },
  {
    title: 'Отлично',
    color: '#008000'
  },
];

const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;

const AnswerItem: FC<{answer: Answer, taskId: string, marathonId: string}> = ({ answer, taskId, marathonId }) => {
  const [result, setResult] = useState<number>(answer.result ?? 0);
  const [comment, setComment] = useState<string>(answer.comment ?? '');
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    setResult(answer.result ?? 0);
    setComment(answer.comment ?? '');
  }, [answer])

  const sendResult = async () => {
    setIsSending(true);
    await server.postData('/answer/sendResult', { taskId, marathonId, result, comment });
    message.success(`Результат отправлен`);
    setIsSending(false);
  }

  return (
    <Card>
        <Meta
          title={
            <Title>
              <div>
                <UserOutlined style={{ marginRight: '7px' }}/>
                <Typography.Text style={{ marginRight: '10px' }}>{answer.creator.name}</Typography.Text>
                <Typography.Text type="secondary">{moment(answer.modifiedTs).format('DD.MM.YYYY HH:mm')}</Typography.Text>
              </div>
              <Button type="primary" loading={isSending} onClick={() => sendResult()}>Отправить результат</Button>
            </Title>
          }
        />
      <CardContent>
        <LeftBlock>
          <Collapse>
            <Panel header="Текст" key="1">
              <Typography.Text>{answer.text}</Typography.Text>
            </Panel>
            <Panel header={`Файлы (${answer.files?.length})`} key="2">
              <List
                itemLayout="horizontal"
                dataSource={ answer.files }
                renderItem={item => (
                  <List.Item key={item.path}>
                    <Typography.Link href={`${SERVER_ADDRESS}${item.path?.replace('public/', '/')}`}>
                      { item.name }
                    </Typography.Link>
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
          <RateBlock>
            <Rate
              tooltips={desc.map((item) => item.title)}
              onChange={(val) => setResult(val)}
              value={result}
            />
            {
              result < 1 ?
                <RateText>
                  Без оценки
                </RateText> :
                <RateText style={{ color: desc[result-1].color }}>
                  {desc[result-1].title}
                </RateText>
            }
          </RateBlock>
        </LeftBlock>
        <RightBlock>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={6}
            placeholder="Комментарий"
          />
        </RightBlock>
      </CardContent>
    </Card>
  );
};

export default AnswerItem;
