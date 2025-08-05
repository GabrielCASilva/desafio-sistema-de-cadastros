import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../../services/authService";
import { Form, Input, Button, Avatar, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const onFinish = async (values) => {
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ login: values.login, senha: values.senha });
      doLogin(res.access_token);
      navigate("/persons");
    } catch (err) {
      setError("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="card login-card">
        <Avatar className="login-avatar" size={56} icon={<LockOutlined />} />
        <Typography className="title" style={{ marginBottom: 8 }}>
          Login
        </Typography>
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "100%", marginTop: 8 }}
          autoComplete="off"
        >
          <Form.Item
            label="Usuário"
            name="login"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input autoFocus autoComplete="username" disabled={loading} />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.Password
              autoComplete="current-password"
              disabled={loading}
            />
          </Form.Item>
          {error && <div className="login-error">{error}</div>}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              loading={loading}
              block
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
