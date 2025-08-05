import { Outlet, useNavigate } from "react-router-dom";
import { Layout as AntdLayout, Avatar, Button, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <AntdLayout className="layout-bg">
      <AntdLayout.Header className="layout-appbar">
        <div className="layout-toolbar">
          <div className="layout-brand">
            <Avatar className="layout-avatar">SC</Avatar>
            <Typography.Title
              level={3}
              className="layout-title"
              style={{ margin: 0 }}
            >
              Sistema de Cadastros
            </Typography.Title>
          </div>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="layout-logout-btn"
          >
            Sair
          </Button>
        </div>
      </AntdLayout.Header>
      <AntdLayout.Content className="layout-content">
        <Outlet />
      </AntdLayout.Content>
      <footer className="layout-footer">
        <Typography.Text className="layout-footer-text">
          &copy; {new Date().getFullYear()} Sistema de Cadastros. Todos os
          direitos reservados.
        </Typography.Text>
      </footer>
    </AntdLayout>
  );
}

export default Layout;
