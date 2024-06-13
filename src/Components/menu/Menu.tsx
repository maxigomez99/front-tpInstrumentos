import React, { useState } from 'react';
import { AppstoreOutlined, BarChartOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from "../../entidades/Usuario";
import { Roles } from "../../entidades/Roles";
import './menu.css';

type MenuItem = {
    label: string;
    key: string;
    icon: React.ReactNode;
    to: string;
    role?: Roles;
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
        label: 'Grilla',
        key: 'grid',
        icon: <AppstoreOutlined />,
        to: '/instrumentos',
        role: Roles.ADMIN,
    },
    {
        label: 'Gráficos',
        key: 'charts',
        icon: <BarChartOutlined />,
        to: '/graficos',
        role: Roles.ADMIN,
    },
];

const App: React.FC = () => {
    const navigate = useNavigate();
    const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    const cerrarSesion = async () => {
        localStorage.setItem("usuario", "");
        localStorage.removeItem("usuario");
        navigate("/login", {
            replace: true,
            state: {
                logged: false,
            },
        });
    };

    return (
        <div className="menu-container">
        <Menu mode="horizontal">
            {items.map((item) => (
                (!item.role || item.role === usuarioLogueado?.rol) && (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.to}>{item.label}</Link>
                    </Menu.Item>
                )
            ))}
            <Menu.Item>
                Usuario: {usuarioLogueado?.usuario} - {usuarioLogueado?.rol == Roles.ADMIN ? "Admin" : "Común"}
            </Menu.Item>
            <Menu.Item onClick={cerrarSesion}>
                Cerrar Sesión
            </Menu.Item>
        </Menu>
        </div>
    );
};

export default App;