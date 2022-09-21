import React from "react";
import { Button, Form, Input, message } from "antd";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FormFields, rules } from "../../Global/constants";
import { routes } from "../../Global/routes";
import { alertMessages } from "../../Global/constants";
import axios from "axios";
import {environment} from '../../environments'

export default function Login() {
  let navigate = useNavigate();

  // useEffect(() => {}, []);

  const onFinish = (value: any) => {
    try {
      let formValues = {
        email: value.email,
        password: value.password,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(environment.baseUrl+"signin", formValues, { headers: headers })
        .then((response) => {
          if (response.data.status) {
           
            localStorage.setItem('loginDetails',JSON.stringify(response.data.results))
            localStorage.setItem('access-token',response.data.access_token)
            message.success(alertMessages.login.success);
            navigate("/home");
          }
          else{
            message.error(response.data.message)
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    } catch (err: any) {
      message.error(err);
    }
  };
  return (
    <div className="login">
      <div className="login-name">
        <h3>Login</h3>
      </div>
      <div className="form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label={FormFields.email.labelEmail}
            name={FormFields.email.nameEmail}
            rules={rules.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={FormFields.password.labelPassword}
            name={FormFields.password.namePassword}
            rules={rules.password}
          >
            <Input.Password />
          </Form.Item>
          <p style={{ paddingLeft: "6rem" }}>
            Don't have an account?
            <Link to={routes.register.path}> Sign up</Link>
          </p>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
