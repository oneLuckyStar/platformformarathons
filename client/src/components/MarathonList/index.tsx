import React, {FC, useContext, useEffect, useState} from 'react';
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
  desc?: string;
  stat?: MarathonStat;
}

const MarathonList: FC<{ type: 'all' | 'my' }> = ({ type }) => {
  const [marathons, setMarathons] = useState<Marathon[] | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const data = (await server.getData<Marathon[]>(`/marathon/${type}`)) ?? [];
      setMarathons(data);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <List>
      {user?.role === 'teacher' && type === 'my' ? (
        <Settings>
          <CreateMarathon setMarathons={setMarathons} />
        </Settings>
      ) : null}
      {marathons && marathons.length ? (
        marathons.map((marathon) => (
          <MarathonItem
            data={marathon}
            setMarathons={setMarathons}
            key={marathon.nameId}
          />
        ))
      ) : marathons?.length === 0 ? (
        <EmptyTitle fontSize={'1.2em'} margin={'40px auto'}>
          Список марафонов пуст :(
        </EmptyTitle>
      ) : (
        <Spin margin={'40px auto'} />
      )}
    </List>
  );
};

export default MarathonList;
