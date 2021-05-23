import React, {FC, useContext, useEffect, useState} from 'react';
import { Card, RateBlock, RateText, AnswersBtn } from './style';
import {
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Task } from '../TaskList';
import moment from 'moment';
import { UserContext } from '../../UserContext';
import { server } from '../../services/server';
import {Collapse, Modal, Rate, Spin, Tooltip, Typography} from 'antd';
import {desc} from '../AnswerItem';

const { Meta } = Card;
const { confirm } = Modal;
const { Panel } = Collapse;


type Props = {
  data: Task;
  id: string;
  marathonId: string;
  setTasks: any;
  index: number;
};

const TaskItem: FC<Props> = ({ data, index, marathonId, id, setTasks }) => {
  const { user } = useContext(UserContext);
  const [countAnswers, setCountAnswers] = useState<number | null>(null);
  const [isLoadingAnswers, setIsLoadingAnswers] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (user?._id === data.creatorId) {
        setIsLoadingAnswers(true);
        const countAnswers =
          (await server.getData<number>(`/answer/countForTask`, {
            marathonId: marathonId,
            taskId: data.nameId,
          })) ?? null;
        setCountAnswers(countAnswers);
        setIsLoadingAnswers(false);
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы действительно хотите удалить задание?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      centered: true,
      cancelText: 'Отмена',
      async onOk() {
        const newTasks = await server.getData('/task/delete', {
          marathonId: marathonId,
          taskId: data.nameId,
        });
        setTasks(newTasks);
      },
    });
  };

  return (
    <Card
      actions={
        user?._id === data.creatorId
          ? [
              <Tooltip key="delete" title="Удалить">
                <DeleteOutlined onClick={showDeleteConfirm} />
              </Tooltip>
            ]
          : []
      }
    >
      <Link to={`/marathons/${marathonId}/${id}`}>
        <Meta
          title={
            <>
              <strong>{index}. </strong>{data.name}
            </>
          }
          description={`${moment(data.startDate).format(
            'DD.MM.YYYY',
          )} - ${moment(data.endDate).format('DD.MM.YYYY')}`}
        />
      </Link>
      {
        user?._id !== data.creatorId ?
          <>
            <RateBlock>
              <Rate
                disabled
                tooltips={desc.map((item) => item.title)}
                value={data.answer?.result}
              />
              {
                (data.answer?.result ? data.answer?.result - 1 : 0) < 1 ?
                  <RateText>
                    Без оценки
                  </RateText> :
                  <RateText style={{ color: desc[data.answer?.result ? data.answer?.result - 1 : 0].color }}>
                    {desc[data.answer?.result ? data.answer?.result - 1 : 0].title}
                  </RateText>
              }
            </RateBlock>
            {
              data.answer?.comment ?
                <Collapse style={{marginTop: '10px'}}>
                  <Panel header="Комментарий" key="1">
                    <Typography.Text>{data.answer?.comment}</Typography.Text>
                  </Panel>
                </Collapse> : null
            }
          </> : null
      }
      {
        user?._id === data.creatorId ?
          <AnswersBtn>
            <Link to={`/marathons/answers/${marathonId}/${id}`}>
              {`Ответы пользователей`}
              { isLoadingAnswers ? <Spin size="small" style={{ marginLeft: '5px' }} /> : countAnswers !== null ? ` (${countAnswers})` : null}
            </Link>
          </AnswersBtn> : null
      }
    </Card>
  );
};

export default TaskItem;
