import React, { FC, useEffect, useState } from 'react';
import { List, Breadcrumb, Settings } from './style';
import TaskItem from '../TaskItem';
import { Link } from 'react-router-dom';
import { server } from '../../services/server';
import { EmptyTitle, Spin } from '../../styles/components';
import CreateTask from '../CreateTask';
import { Answer } from '../TaskPage';

type Props = {
  marathonId: string;
};

export interface Task {
  name: string;
  nameId: string;
  marathonId: string;
  marathonName: string;
  startDate: string;
  endDate: string;
  text: string;
  modifiedTs: string;
  creatorId: string;
  _id: string;
  answer?: Answer;
}

const TaskList: FC<Props> = ({ marathonId }) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    (async () => {
      const data =
        (await server.getData<Task[]>(`/task/list`, {
          marathonId: marathonId,
        })) ?? [];
      setTasks(data);
    })();
  }, [marathonId]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/marathons">Марафоны</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{tasks && tasks[0]?.marathonName}</Breadcrumb.Item>
      </Breadcrumb>
      <Settings>
        <CreateTask setTasks={setTasks} marathonId={marathonId} />
      </Settings>
      <List>
        {tasks && tasks.length ? (
          tasks.map((task, index) => (
            <TaskItem
              index={index+1}
              key={task._id}
              id={task.nameId}
              data={task}
              marathonId={marathonId}
              setTasks={setTasks}
            />
          ))
        ) : tasks?.length === 0 ? (
          <EmptyTitle fontSize={'1.2em'} margin={'20px auto'}>
            В марафоне пока нет заданий
          </EmptyTitle>
        ) : (
          <Spin margin={'40px auto'} />
        )}
      </List>
    </>
  );
};

export default TaskList;
