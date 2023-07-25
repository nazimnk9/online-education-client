import React from "react";
import { useState, useEffect, useContext } from "react";
import { BackTop, Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);

  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);


  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[current]} className="mb-2">
      <div className="container" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Item key="/"
          onClick={e => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link legacyBehavior href="/">
            <a style={{ textDecoration: "none" }}>Online Education</a>
          </Link>
        </Item>

        {user && user.role && user.role.includes("Instructor") ? (
          <Item key="/instructor/course/create"
            onClick={e => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link legacyBehavior href="/instructor/course/create">
              <a style={{ textDecoration: "none" }}>Create Course</a>
            </Link>
          </Item>

        ) : (
          <Item key="/user/become-instructor"
            onClick={e => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link legacyBehavior href="/user/become-instructor">
              <a style={{ textDecoration: "none" }}>Become Instructor</a>
            </Link>
          </Item>
        )}

        {user === null && (
          <>
            <Item key="/login"
              onClick={e => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link legacyBehavior href="/login">
                <a style={{ textDecoration: "none" }}>Login</a>
              </Link>
            </Item>

            <Item key="/register"
              onClick={e => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link legacyBehavior href="/register">
                <a style={{ textDecoration: "none" }}>Register</a>
              </Link>
            </Item>
          </>
        )}

      </div>


      <div className="container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {user && user.role && user.role.includes("Instructor") && (
          <Item key="/instructor"
            onClick={e => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link legacyBehavior href="/instructor">
              <a style={{ textDecoration: "none" }}>Instructor</a>
            </Link>
          </Item>
        )}


        {user !== null && (
          <SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ItemGroup>
              <Item key="/user">
                <Link legacyBehavior href="/user">
                  <a style={{ textDecoration: "none" }}>Dashboard</a>
                </Link>
              </Item>
              <Item onClick={logout} icon={<LogoutOutlined />}>
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}
      </div>

    </Menu>
  );
};

export default TopNav;