import React, {
  useState,
  createContext,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { server } from './services/server';
import { User } from './components/Profile';

export const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  },
);

export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userInfo: User | null = await server.getData('/user/me');
      if (userInfo) setUser(userInfo);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
