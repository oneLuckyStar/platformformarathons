import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Main, Info, MainInfo, GroupItems, Item, EditParagraph } from './style';
import { server } from '../../services/server';

const { Title } = Typography;

export interface User {
  role?: string;
  _id?: string;
  name?: string;
  email?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    (async () => {
      const userInfo: User | null = await server.getData('/user/me');
      if (userInfo) setUser(userInfo);
    })();
  }, []);

  const onExit = () => {

  }

  return (
    <Main>
      <Info
        title="Основное"
        extra={
          <>
            <Button
              type="link"
              style={{ padding: 0, marginLeft: '15px' }}
              onClick={onExit}
            >
              Выйти
            </Button>
          </>
        }
      >
        <MainInfo>
          <GroupItems>
            <Item>
              <Title level={5}>Имя</Title>
              <EditParagraph editable={{ onChange: () => console.log('ss') }}>
                {user.name}
              </EditParagraph>
            </Item>

            <Item>
              <Title level={5}>Почта</Title>
              <EditParagraph editable={{ onChange: () => console.log('ss') }}>
                {user.email}
              </EditParagraph>
            </Item>
          </GroupItems>
        </MainInfo>
      </Info>
    </Main>
  );
};

export default Profile;
