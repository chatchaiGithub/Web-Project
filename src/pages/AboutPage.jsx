import React from 'react';
import { Card, Typography, Row, Col, Avatar, Divider, Image } from 'antd';
import { GlobalOutlined, TeamOutlined, SafetyOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Title level={2} style={{ color: '#1890ff', textAlign: 'center', marginBottom: '32px' }}>
          About TravelRider
        </Title>
        
        <Paragraph style={{ fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>
          TravelRider is Thailand's leading flight booking platform, connecting travelers to their dream destinations with ease and efficiency.
        </Paragraph>
        
        <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={80} icon={<GlobalOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>Global Reach</Title>
              <Paragraph>
                We connect you to over 500 airlines and 10,000+ destinations worldwide, making travel accessible to everyone.
              </Paragraph>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={80} icon={<SafetyOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>Secure Booking</Title>
              <Paragraph>
                Your security is our priority. We use advanced encryption to protect your personal and payment information.
              </Paragraph>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={80} icon={<CustomerServiceOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>24/7 Support</Title>
              <Paragraph>
                Our dedicated customer service team is available round the clock to assist you with any queries or issues.
              </Paragraph>
            </div>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={3} style={{ marginBottom: '24px' }}>Our Story</Title>
        
        <Paragraph style={{ fontSize: '16px', marginBottom: '16px' }}>
          Founded in 2020, TravelRider was born out of a passion for making travel accessible, affordable, and enjoyable for everyone. What started as a small startup in Bangkok has now grown into one of Thailand's most trusted travel platforms.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', marginBottom: '16px' }}>
          Our mission is simple: to connect travelers with their dream destinations through a seamless booking experience. We believe that travel should be easy, and our platform is designed to take the stress out of planning your next adventure.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px' }}>
          Today, TravelRider serves thousands of customers daily, helping them find the best flights at the most competitive prices. We're proud to be a part of your travel journey, and we're committed to continuing to innovate and improve our services to meet your needs.
        </Paragraph>
        
        <Divider />
        
        <Title level={3} style={{ marginBottom: '24px' }}>Our Team</Title>
        
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <Avatar 
                size={100} 
                src="https://iili.io/FhPFH11.png" 
                style={{ marginBottom: '16px' }}
              />
              <Title level={5}>Chatchai Khunwandee</Title>
              <Text type="secondary">CEO & Founder</Text>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <Avatar 
                size={100} 
                src="https://iili.io/FhP2EnS.jpg" 
                style={{ marginBottom: '16px' }}
              />
              <Title level={5}>Chaiphong Baipho</Title>
              <Text type="secondary">Chief Operating Officer</Text>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <Avatar 
                size={100} 
                src="https://iili.io/Fh6Dvna.jpg" 
                style={{ marginBottom: '16px' }}
              />
              <Title level={5}>Phattrawut Nachairit</Title>
              <Text type="secondary">Head of Technology</Text>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutPage;
