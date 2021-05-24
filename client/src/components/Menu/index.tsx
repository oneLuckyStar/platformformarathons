import React from 'react';
import { Layout, Menu as AntdMenu } from 'antd';
import { AppstoreOutlined, BorderOuterOutlined, CalendarOutlined } from '@ant-design/icons';
import logo from './../../images/logo.svg';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProfileModal from '../ProfileModal';
const { Sider } = Layout;

const Menu = () => {
  const location = useLocation()

  return (
    <Sider>
      <Link to="/">
        <img
          alt='logo'
          src={logo}
          width="70%"
          style={{ display: 'block', margin: '0 auto' }}
        />
      </Link>
      <AntdMenu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1]]}
        defaultSelectedKeys={['profile']}
      >
        <ProfileModal />

        <AntdMenu.Item key="marathons" icon={<AppstoreOutlined />}>
          <Link to="/marathons">Мои марафоны</Link>
        </AntdMenu.Item>

        <AntdMenu.Item key="all_marathons" icon={<BorderOuterOutlined />}>
          <Link to="/all_marathons">Все марафоны</Link>
        </AntdMenu.Item>

        <AntdMenu.Item key="calendar" icon={<CalendarOutlined />}>
          <Link to="/calendar">Календарь</Link>
        </AntdMenu.Item>

      </AntdMenu>
    </Sider>
  );
};

export default Menu;
