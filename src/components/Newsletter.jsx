import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { SendOutlined, MailOutlined } from '@ant-design/icons';
import { openNotification } from './Notification';

const { Title, Paragraph } = Typography;

const Newsletter = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (values) => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      form.resetFields();
      
      openNotification({
        message: 'Subscription Successful',
        description: `Thank you for subscribing to our newsletter with ${values.email}. You'll now receive the latest travel deals and updates.`,
        type: 'success',
      });
    }, 1500);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1) 0%, rgba(24, 144, 255, 0.2) 100%)',
      padding: '36px 24px',
      borderRadius: '12px',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(24, 144, 255, 0.2)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#1890ff', marginBottom: '12px' }}>
          <MailOutlined style={{ marginRight: '12px' }} />
          Subscribe to Our Newsletter
        </Title>
        <Paragraph style={{ fontSize: '16px' }}>
          Get the latest travel deals, offers, and tips delivered straight to your inbox.
        </Paragraph>
      </div>
      
      {subscribed ? (
        <Alert
          message="Thank you for subscribing!"
          description="You have successfully subscribed to our newsletter. You'll start receiving our latest updates soon."
          type="success"
          showIcon
          style={{ borderRadius: '8px' }}
          action={
            <Button 
              size="small" 
              onClick={() => setSubscribed(false)}
              style={{ marginLeft: '8px' }}
            >
              Subscribe Another
            </Button>
          }
        />
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#1890ff' }} />}
              placeholder="Your email address"
              size="large"
              style={{ 
                borderRadius: '8px', 
                height: '48px' 
              }}
            />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: '0' }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={submitting}
              size="large"
              style={{ 
                width: '100%', 
                height: '48px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)'
              }}
            >
              Subscribe Now
            </Button>
          </Form.Item>
          
          <div style={{ 
            fontSize: '12px', 
            color: '#8c8c8c', 
            textAlign: 'center',
            marginTop: '16px' 
          }}>
            By subscribing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </div>
        </Form>
      )}
    </div>
  );
};

export default Newsletter;
