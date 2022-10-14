import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu, message } from 'antd';
import "./less/MyHeader.less"

const logo = require("../assets/images/logo.png")
const defaultAvatar = require("../assets/images/defaultAvatar.jpg")


export default function MyHeader() {
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [username, setUsername] = useState("匿名用户");
    const navigate = useNavigate()

    //componentDidMount
    useEffect(() => {
        let avatar1 = process.env.SERVER_PORT + '/' + localStorage.getItem("avatar") || avatar;
        let username1 = localStorage.getItem("username") || "匿名用户";
        setAvatar(avatar1)
        setUsername(username1)
    }, [])

    //点击修改资料
    const goMeans = () => {
        let token = localStorage.getItem("cms-token")
        if (token) {
            navigate('/means')
        } else {
            //给出提示，并跳转到登录页
            message.warning("登录失败，请重新登录", 1.5);
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        }
    }

    //退出登录
    const logout = () => {
        localStorage.removeItem("cms-token");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        //给出提示，并跳转到登录页
        message.success("即将跳转登录页", 1.5);
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1} onClick={goMeans}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header>
            <img src={logo} width={50} height={50} alt="" />
            <Dropdown overlay={menu}>
                <a className="ant-dropdow-link" href="!#" onClick={(e) => e.preventDefault()}>
                    <img src={avatar} width={40} style={{ borderRadius: '50%', marginRight: '15px' }} alt="" />
                    <span style={{ marginRight: '10px' }}>{username}</span>
                    <DownOutlined />
                </a>
            </Dropdown>
        </header>
    )
}
