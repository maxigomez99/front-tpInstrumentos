import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = {
    label: string;
    key: string;
    icon: React.ReactNode;
    to: string;
  };
const items: MenuItem[] = [
{
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
    to: '/',
},
  {
    label: 'Donde Estamos',
    key: 'we-are',
    icon: <AppstoreOutlined />,
    to: '/donde-estamos',
  },
  {
    label: 'Productos',
    key: 'products',
    icon: <ShopOutlined />,
    to: '/productos',
  },
  {
    label: 'Instrumentos',
    key: 'instruments',
    icon: <AppstoreOutlined />, // replace with the icon you want
    to: '/instrumentos',
  },
 
];

const App: React.FC = () => {
    return (
      <Menu mode="horizontal">
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  
  export default App;