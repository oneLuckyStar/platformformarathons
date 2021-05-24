import React, { FC } from 'react';
import { Layout } from 'antd';
import { Content, Main } from './style';
import Menu from '../../Menu';
import { Route } from 'react-router-dom';
import MarathonList from '../../MarathonList';
import TaskList from '../../TaskList';
import TaskPage from '../../pages/TaskPage';
import Profile from '../../Profile';
import EventsCalendar from '../../EventsCalendar';
import AnswersPage from '../../pages/AnswersPage';

const MainLayout: FC = () => {
  return (
    <Layout>
      <Menu />
      <Main>
        <Content>
          <Route path="/marathons" exact>
            <MarathonList type="my"/>
          </Route>
          <Route path="/all_marathons" exact>
            <MarathonList type="all"/>
          </Route>
          <Route
            path="/marathons/:idMarathon"
            exact
            component={(props: any) => (
              <TaskList marathonId={props.match.params.idMarathon} />
            )}
          />
          <Route
            path="/marathons/:idMarathon/:idTask"
            exact
            component={(props: any) => (
              <TaskPage
                marathonId={props.match.params.idMarathon}
                taskId={props.match.params.idTask}
              />
            )}
          />
          <Route
            path="/marathons/answers/:idMarathon/:idTask"
            exact
            component={(props: any) => (
              <AnswersPage
                marathonId={props.match.params.idMarathon}
                taskId={props.match.params.idTask}
              />
            )}
          />
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/calendar">
            <EventsCalendar />
          </Route>
        </Content>
      </Main>
    </Layout>
  );
};

export default MainLayout;
