import React from 'react';
import { Card, Typography, Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { openNotification } from '../components/Notification';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.validateFields().then(values => {
      // Simulate API call
      setTimeout(() => {
        openNotification(
          'success',
          'Login Successful',
          `Welcome back, ${values.email}!`
        );
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '24px' }}>
          Sign In
        </Title>
        
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/forgot-password">Forgot password?</Link>
              <Button type="primary" onClick={handleLogin} size="large">
                Sign In
              </Button>
            </div>
          </Form.Item>
        </Form>
        
        <Divider>or</Divider>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <Button icon={<GoogleOutlined />} size="large" style={{ width: '50%' }}>
            Google
          </Button>
          <Button icon={<FacebookOutlined />} size="large" style={{ width: '50%', background: '#1877F2', color: 'white' }}>
            Facebook
          </Button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Text>Don't have an account? </Text>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
