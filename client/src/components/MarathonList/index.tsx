import React, { useContext, useEffect, useState } from 'react';
import { List, Settings } from './style';
import MarathonItem from '../MarathonItem';
import { server } from '../../services/server';
import { User } from '../Profile';
import { EmptyTitle, Spin } from '../../styles/components';
import { UserContext } from '../../UserContext';
import CreateMarathon from '../CreateMarathon';

export interface MarathonStat {
  taskCount: number
  doneCount: number;
  skipCount: number;
}

export interface Marathon {
  name?: string;
  nameId?: string;
  creatorId?: string;
  startDate?: string;
  endDate?: string;
  img?: string;
  modifiedTs?: string;
  creatorInfo?: User;
  _id?: string;
  stat?: MarathonStat;
}

const MarathonList = () => {
  const [marathons, setMarathons] = useState<Marathon[] | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const data = (await server.getData<Marathon[]>('/marathon/my')) ?? [];
      setMarathons(data);
    })();
  }, []);
  return (
    <List>
      {user?.role === 'teacher' ? (
        <Settings>
          <CreateMarathon setMarathons={setMarathons} />
        </Settings>
      ) : null}
      {marathons && marathons.length ? (
        marathons.map((marathon) => (
          <MarathonItem
            data={marathon}
            setMarathons={setMarathons}
            key={marathon._id}
          />
        ))
      ) : marathons?.length === 0 ? (
        <EmptyTitle fontSize={'1.2em'} margin={'40px auto'}>
          У вас нет доступных марафонов
        </EmptyTitle>
      ) : (
        <Spin margin={'40px auto'} />
      )}
    </List>
  );
};

export default MarathonList;
