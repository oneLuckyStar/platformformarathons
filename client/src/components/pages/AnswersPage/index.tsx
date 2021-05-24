import React, { FC, useEffect, useState } from 'react';
import { Main, Breadcrumb } from './style';
import { Link } from 'react-router-dom';
import { server } from '../../../services/server';
import AnswerItem from '../../AnswerItem';
import {Answer} from '../TaskPage';

type Props = {
  marathonId: string;
  taskId: string;
};

const AnswersPage: FC<Props> = ({ marathonId, taskId }) => {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [taskName, setTaskName] = useState<string | null>(null);
  const [marathonName, setMarathonName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const mName =
        (await server.getData<{ name: string }>('/marathon/getNameById', { marathonId })) ??
        null;
      const tName =
        (await server.getData<{ name: string }>('/task/getNameById', { taskId })) ??
        null;
      const data =
        (await server.getData<Answer[]>('/answer/allForTask', { taskId, marathonId })) ??
        null;

      setTaskName(tName && tName.name);
      setMarathonName(mName && mName.name);
      setAnswers(data);
    })();
  }, [taskId, marathonId]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/marathons">Марафоны</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/marathons/${marathonId}`}>{marathonName}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{taskName}</Breadcrumb.Item>
      </Breadcrumb>
      <Main>
        {
          answers ?
            answers.map((answer) => {
              return (
                <AnswerItem
                  answer={answer}
                  marathonId={marathonId}
                  taskId={taskId}
                  key={answer._id}
                />
              )
            }) : null
        }
      </Main>
    </>
  );
};

export default AnswersPage;
