import React from 'react';
import { Card, Typography, Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { openNotification } from '../components/Notification';

const { Title, Text } = Typography;

const SignupPage = () => {
  const [form] = Form.useForm();

  const handleSignup = () => {
    form.validateFields().then(values => {
      // Simulate API call
      setTimeout(() => {
        openNotification(
          'success',
          'Registration Successful',
          `Welcome to TravelRider, ${values.name}! Your account has been created successfully.`
        );
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '24px' }}>
          Create an Account
        </Title>
        
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
          </Form.Item>
          
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
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" onClick={handleSignup} size="large" style={{ width: '100%' }}>
              Create Account
            </Button>
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
          <Text>Already have an account? </Text>
          <Link to="/login">Sign In</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
