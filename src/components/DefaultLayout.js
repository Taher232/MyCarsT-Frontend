import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
function DefaultLayout(props) {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    } catch (error) {}
  }, []);
  console.log(user);
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home </a>
      </Menu.Item>
      {
        user ? <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }} 
      >
        <li>Logout</li>
      </Menu.Item> : <>
      <Menu.Item>
        <a href="/login"> Login</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/register"> Register</a>
      </Menu.Item>
      </>
      }
      {
        user?.role === "admin"?
        <>
        <Menu.Item>
        <a href="/admin"> Bookings </a>
      </Menu.Item> 

          <Menu.Item>
        <a href="userbookings"> Admin</a>
      </Menu.Item> 
      </>: null
      }
      
       

      
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center" align="center">
          <Col lg={18} sm={20}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link to="/" style={{ color: "oranged" }}>
                    My Cars
                  </Link>
                </b>{" "}
              </h1>
            </div>
          </Col>
          <Col lg={2} sm={4}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <div style={{display: 'flex', alignItems: 'center'}}>
                {!!user && <h5>{user.username}</h5>}
                <Avatar size="large" icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
