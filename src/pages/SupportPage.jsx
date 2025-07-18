import React from 'react';
import { Card, Typography, Form, Input, Button, Select, Divider, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SupportPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Simulate API call
      setTimeout(() => {
        openNotification(
          'success',
          'Message Sent',
          'Thank you for contacting us. Our team will get back to you shortly.'
        );
        form.resetFields();
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Title level={2} style={{ color: '#1890ff', textAlign: 'center', marginBottom: '32px' }}>
          Customer Support
        </Title>
        
        <Row gutter={[48, 24]}>
          <Col xs={24} md={10}>
            <Title level={4} style={{ marginBottom: '16px' }}>Contact Us</Title>
            
            <Paragraph style={{ marginBottom: '24px' }}>
              Have questions or need assistance? Our support team is here to help you with any inquiries you may have.
            </Paragraph>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                <MailOutlined style={{ marginRight: '8px' }} /> Email
              </Text>
              <Text>support@travelrider.com</Text>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                <PhoneOutlined style={{ marginRight: '8px' }} /> Phone
              </Text>
              <Text>+66 2 123 4567 (Thailand)</Text>
              <br />
              <Text>+66 8 9876 5432 (International)</Text>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                Operating Hours
              </Text>
              <Text>Monday to Friday: 8:00 AM - 8:00 PM</Text>
              <br />
              <Text>Saturday and Sunday: 9:00 AM - 6:00 PM</Text>
              <br />
              <Text>(Thailand Time / GMT+7)</Text>
            </div>
          </Col>
          
          <Col xs={24} md={14}>
            <Title level={4} style={{ marginBottom: '16px' }}>Send Us a Message</Title>
            
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
              
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
              </Form.Item>
              
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
              
              <Form.Item
                name="subject"
                rules={[{ required: true, message: 'Please select a subject' }]}
              >
                <Select placeholder="Select Subject">
                  <Option value="booking">Booking Inquiry</Option>
                  <Option value="cancellation">Cancellation/Refund</Option>
                  <Option value="payment">Payment Issue</Option>
                  <Option value="technical">Technical Support</Option>
                  <Option value="feedback">Feedback/Suggestions</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  placeholder="Your Message" 
                  rows={4}
                  prefix={<MessageOutlined />}
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" onClick={handleSubmit} style={{ width: '100%' }}>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4} style={{ marginBottom: '16px' }}>Frequently Asked Questions</Title>
        
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>How do I change or cancel my flight booking?</Text>
              <Paragraph style={{ margin: '8px 0 0' }}>
                You can manage your bookings by signing into your account and going to "My Bookings" section. There you can find options to change or cancel your flight. Please note that cancellation fees may apply.
              </Paragraph>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong>What is your refund policy?</Text>
              <Paragraph style={{ margin: '8px 0 0' }}>
                Refund policies vary depending on the airline and ticket type. Non-refundable tickets usually cannot be refunded, but may be eligible for a partial refund of taxes and fees. For full details, please check the terms and conditions of your booking.
              </Paragraph>
            </div>
          </Col>
          
          <Col xs={24} md={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>How early should I arrive at the airport?</Text>
              <Paragraph style={{ margin: '8px 0 0' }}>
                We recommend arriving at the airport at least 2 hours before domestic flights and 3 hours before international flights to allow time for check-in, security, and boarding procedures.
              </Paragraph>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Do I need travel insurance?</Text>
              <Paragraph style={{ margin: '8px 0 0' }}>
                While not mandatory, travel insurance is highly recommended to protect against unexpected events such as flight cancellations, lost luggage, or medical emergencies during your trip. You can add travel insurance during the booking process.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SupportPage;
