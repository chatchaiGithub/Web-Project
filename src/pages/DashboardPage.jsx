import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Statistic, 
  Button, 
  Divider, 
  List, 
  Avatar, 
  Tag, 
  Progress, 
  Calendar, 
  Badge, 
  Tabs, 
  Alert, 
  Space, 
  Tooltip 
} from 'antd';
import { 
  RocketOutlined, 
  StarOutlined, 
  TrophyOutlined, 
  HeartOutlined, 
  GiftOutlined, 
  BellOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined, 
  CheckCircleOutlined, 
  HistoryOutlined, 
  TeamOutlined, 
  GlobalOutlined, 
  DollarOutlined, 
  ClockCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { openNotification } from '../components/Notification';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock upcoming trips
const upcomingTrips = [
  {
    id: 'TRIP-1234',
    destination: 'Singapore',
    departureDate: '2023-12-15',
    returnDate: '2023-12-20',
    status: 'Confirmed',
    airline: 'Thai Airways',
    image: 'https://source.unsplash.com/500x300/?singapore'
  },
  {
    id: 'TRIP-5678',
    destination: 'Phuket',
    departureDate: '2024-01-05',
    returnDate: '2024-01-10',
    status: 'Pending Payment',
    airline: 'AirAsia',
    image: 'https://source.unsplash.com/500x300/?phuket'
  }
];

// Mock rewards
const rewards = [
  {
    id: 'RWD-001',
    title: 'Lounge Access Pass',
    description: 'Free access to premium lounges at any airport for one visit',
    points: 500,
    expiryDate: '2023-12-31'
  },
  {
    id: 'RWD-002',
    title: 'Free Flight Change',
    description: 'Change your flight date once without any fee',
    points: 300,
    expiryDate: '2023-12-31'
  },
  {
    id: 'RWD-003',
    title: 'Priority Boarding',
    description: 'Skip the queue with priority boarding on your next flight',
    points: 200,
    expiryDate: '2023-12-31'
  },
  {
    id: 'RWD-004',
    title: 'Extra Baggage Allowance',
    description: 'Get 10kg extra baggage allowance on your next flight',
    points: 350,
    expiryDate: '2023-12-31'
  }
];

// Mock notifications
const notifications = [
  {
    id: 'NOTIF-1',
    title: 'Flight Reminder',
    message: 'Your flight to Singapore is in 3 days. Check-in opens tomorrow.',
    date: '2023-11-12',
    read: false,
    type: 'reminder'
  },
  {
    id: 'NOTIF-2',
    title: 'Special Offer',
    message: 'Flash sale! 30% off on all domestic flights for the next 24 hours.',
    date: '2023-11-10',
    read: true,
    type: 'promotion'
  },
  {
    id: 'NOTIF-3',
    title: 'Points Expiring',
    message: 'You have 1,000 points expiring at the end of this month. Use them now!',
    date: '2023-11-05',
    read: true,
    type: 'alert'
  }
];

// Mock calendar data
const getCalendarData = (value) => {
  const listData = [];
  switch (value.date()) {
    case 15:
      listData.push({ type: 'success', content: 'Flight to Singapore' });
      break;
    case 20:
      listData.push({ type: 'success', content: 'Return from Singapore' });
      break;
    case 5:
      listData.push({ type: 'warning', content: 'Flight to Phuket' });
      break;
    case 10:
      listData.push({ type: 'warning', content: 'Return from Phuket' });
      break;
    default:
  }
  return listData;
};

// Mock popular destinations
const popularDestinations = [
  {
    name: 'Tokyo',
    country: 'Japan',
    discount: '15% OFF',
    image: 'https://source.unsplash.com/300x200/?tokyo'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    discount: '20% OFF',
    image: 'https://source.unsplash.com/300x200/?bali'
  },
  {
    name: 'Seoul',
    country: 'South Korea',
    discount: '10% OFF',
    image: 'https://source.unsplash.com/300x200/?seoul'
  },
  {
    name: 'London',
    country: 'United Kingdom',
    discount: '12% OFF',
    image: 'https://source.unsplash.com/300x200/?london'
  }
];

const DashboardPage = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');

  const dateCellRender = (value) => {
    const listData = getCalendarData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Welcome back, John!
      </Title>
      
      <Alert
        message="Complete your profile to get 500 bonus points!"
        description="Your profile is 70% complete. Add a profile picture and verify your email to earn bonus points."
        type="info"
        showIcon
        action={
          <Button size="small" type="primary">
            Complete Now
          </Button>
        }
        style={{ marginBottom: '24px', borderRadius: '8px' }}
      />
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Statistic
              title="Loyalty Points"
              value={2450}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<StarOutlined />}
              suffix="points"
            />
            <div style={{ marginTop: '16px' }}>
              <Progress 
                percent={70} 
                status="active" 
                strokeColor="#fa8c16" 
                style={{ marginBottom: '8px' }}
              />
              <Text type="secondary">
                830 more points to reach Platinum level
              </Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Statistic
              title="Member Status"
              value="Gold"
              valueStyle={{ color: '#d4b106' }}
              prefix={<TrophyOutlined />}
            />
            <div style={{ marginTop: '16px' }}>
              <Tag 
                color="gold" 
                style={{ 
                  padding: '4px 12px', 
                  borderRadius: '12px',
                  fontSize: '14px'
                }}
              >
                Gold Member Benefits
              </Tag>
              <div style={{ marginTop: '8px' }}>
                <Text type="secondary">
                  Member since September 2022
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Statistic
              title="Upcoming Trips"
              value={upcomingTrips.length}
              valueStyle={{ color: '#1890ff' }}
              prefix={<RocketOutlined />}
            />
            <div style={{ marginTop: '16px' }}>
              {upcomingTrips.length > 0 ? (
                <div>
                  <Text>Next trip: {upcomingTrips[0].destination}</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text type="secondary">
                      <CalendarOutlined style={{ marginRight: '4px' }} />
                      {upcomingTrips[0].departureDate}
                    </Text>
                  </div>
                </div>
              ) : (
                <Text type="secondary">No upcoming trips</Text>
              )}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Statistic
              title="Saved Destinations"
              value={4}
              valueStyle={{ color: '#eb2f96' }}
              prefix={<HeartOutlined />}
            />
            <div style={{ marginTop: '16px' }}>
              <Space size={[8, 8]} wrap>
                <Tag 
                  color="cyan" 
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px' 
                  }}
                >
                  Tokyo
                </Tag>
                <Tag 
                  color="blue" 
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px' 
                  }}
                >
                  Bali
                </Tag>
                <Tag 
                  color="purple" 
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px' 
                  }}
                >
                  Seoul
                </Tag>
                <Tag 
                  color="magenta" 
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px' 
                  }}
                >
                  Phuket
                </Tag>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={16}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                <span>Upcoming Trips</span>
              </div>
            }
            extra={<Link to="/profile">View All</Link>}
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            {upcomingTrips.length > 0 ? (
              <List
                itemLayout="vertical"
                dataSource={upcomingTrips}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    extra={
                      <img
                        width={200}
                        alt={item.destination}
                        src={item.image}
                        style={{ 
                          borderRadius: '8px',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          icon={<GlobalOutlined />} 
                          style={{ 
                            backgroundColor: '#1890ff',
                            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
                          }} 
                          size={48}
                        />
                      }
                      title={
                        <Space>
                          <Link to={`/check-flight?id=${item.id}`}>
                            <Text strong style={{ fontSize: '16px' }}>
                              {item.destination}
                            </Text>
                          </Link>
                          <Tag 
                            color={item.status === 'Confirmed' ? 'green' : 'orange'} 
                            style={{ borderRadius: '12px' }}
                          >
                            {item.status}
                          </Tag>
                        </Space>
                      }
                      description={
                        <>
                          <div>
                            <CalendarOutlined style={{ marginRight: '8px' }} />
                            {item.departureDate} to {item.returnDate}
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <Text type="secondary">
                              {item.airline} • Trip ID: {item.id}
                            </Text>
                          </div>
                        </>
                      }
                    />
                    <div style={{ marginTop: '16px' }}>
                      <Space>
                        <Button type="primary" style={{ borderRadius: '6px' }}>
                          Check In
                        </Button>
                        <Button style={{ borderRadius: '6px' }}>
                          Modify
                        </Button>
                        <Button style={{ borderRadius: '6px' }} type="link">
                          View Details
                        </Button>
                      </Space>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <RocketOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                <Paragraph style={{ marginTop: '16px' }}>
                  No upcoming trips. Ready to plan your next adventure?
                </Paragraph>
                <Button type="primary" style={{ marginTop: '16px' }}>
                  Book a Flight
                </Button>
              </div>
            )}
          </Card>
          
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <GiftOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                <span>Rewards & Offers</span>
              </div>
            }
            style={{ 
              marginTop: '24px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
            tabList={[
              { key: '1', tab: 'Available Rewards' },
              { key: '2', tab: 'Special Offers' }
            ]}
            activeTabKey={activeTabKey}
            onTabChange={key => setActiveTabKey(key)}
          >
            {activeTabKey === '1' ? (
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
                dataSource={rewards}
                renderItem={item => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <Text strong style={{ fontSize: '16px' }}>
                            {item.title}
                          </Text>
                          <Paragraph style={{ marginTop: '8px' }}>
                            {item.description}
                          </Paragraph>
                        </div>
                        <Tag color="#fa8c16" style={{ padding: '2px 8px', borderRadius: '12px' }}>
                          {item.points} pts
                        </Tag>
                      </div>
                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text type="secondary">
                          <ClockCircleOutlined style={{ marginRight: '4px' }} />
                          Expires: {item.expiryDate}
                        </Text>
                        <Button 
                          type="primary" 
                          size="small" 
                          onClick={() => {
                            openNotification({
                              message: 'Reward Redeemed',
                              description: `You have successfully redeemed ${item.title}.`,
                              type: 'success',
                            });
                          }}
                        >
                          Redeem
                        </Button>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <div>
                <Alert
                  message="Holiday Season Flash Sale!"
                  description="Book now and get up to 40% off on international flights. Limited time offer."
                  type="success"
                  showIcon
                  style={{ marginBottom: '16px', borderRadius: '8px' }}
                  action={
                    <Button size="small" type="primary">
                      View Deal
                    </Button>
                  }
                />
                
                <Divider>Popular Destinations on Sale</Divider>
                
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
                  dataSource={popularDestinations}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={
                          <div style={{ position: 'relative' }}>
                            <img 
                              alt={item.name} 
                              src={item.image}
                              style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <div style={{ 
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              background: '#f5222d',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                            }}>
                              {item.discount}
                            </div>
                          </div>
                        }
                        style={{ 
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      >
                        <Card.Meta
                          title={item.name}
                          description={
                            <>
                              <div>{item.country}</div>
                              <Button 
                                type="primary" 
                                style={{ marginTop: '12px', width: '100%' }}
                                onClick={() => {
                                  openNotification({
                                    message: 'Searching Flights',
                                    description: `Finding the best deals for ${item.name}, ${item.country}.`,
                                    type: 'info',
                                  });
                                }}
                              >
                                See Deals
                              </Button>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BellOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                <span>Notifications</span>
              </div>
            }
            extra={<Text type="link">Mark all as read</Text>}
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              marginBottom: '24px'
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={item => (
                <List.Item
                  style={{ opacity: item.read ? 0.7 : 1 }}
                  actions={[
                    <Button 
                      type="text" 
                      size="small"
                      onClick={() => {
                        openNotification({
                          message: 'Notification marked as read',
                          description: `"${item.title}" has been marked as read.`,
                          type: 'success',
                        });
                      }}
                    >
                      {item.read ? 'Delete' : 'Mark as read'}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={!item.read}>
                        <Avatar 
                          icon={
                            item.type === 'reminder' ? <ClockCircleOutlined /> :
                            item.type === 'promotion' ? <GiftOutlined /> :
                            <BellOutlined />
                          } 
                          style={{ 
                            backgroundColor: 
                              item.type === 'reminder' ? '#1890ff' :
                              item.type === 'promotion' ? '#52c41a' :
                              '#faad14'
                          }} 
                        />
                      </Badge>
                    }
                    title={<Text strong={!item.read}>{item.title}</Text>}
                    description={
                      <>
                        <div>{item.message}</div>
                        <div style={{ marginTop: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {item.date}
                          </Text>
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                <span>Travel Calendar</span>
              </div>
            }
            style={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Calendar 
              fullscreen={false} 
              dateCellRender={dateCellRender}
            />
          </Card>
          
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                <span>Refer a Friend</span>
              </div>
            }
            style={{ 
              marginTop: '24px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph>
                Refer a friend and both of you will receive 1,000 bonus points!
              </Paragraph>
              <Button 
                type="primary" 
                style={{ marginTop: '16px', borderRadius: '6px' }}
                onClick={() => {
                  openNotification({
                    message: 'Referral Link Copied',
                    description: 'Your unique referral link has been copied to clipboard. Share it with your friends!',
                    type: 'success',
                  });
                }}
              >
                Get Referral Link
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
