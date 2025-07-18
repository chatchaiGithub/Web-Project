import React from 'react';
import { Card, Typography, Avatar, Rate, Row, Col, Carousel } from 'antd';
import { UserOutlined, GlobalOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    date: 'October 15, 2023',
    destination: 'Tokyo, Japan',
    review: 'TravelRider made my trip to Tokyo completely hassle-free! The booking process was simple, and I got a great deal on my flight. Will definitely use this service again for my next trip.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.5,
    date: 'September 22, 2023',
    destination: 'Phuket, Thailand',
    review: 'I was skeptical about booking online, but TravelRider exceeded my expectations. The customer service was excellent, and they helped me find the perfect beach resort in Phuket.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    date: 'November 3, 2023',
    destination: 'Bali, Indonesia',
    review: 'Thanks to TravelRider, I had the most amazing vacation in Bali. The flight was comfortable, and the travel package they recommended was perfect for my budget. Highly recommend!',
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    date: 'October 30, 2023',
    destination: 'Singapore',
    review: 'The flight booking process was smooth, and the prices were better than other sites I checked. The app is also very user-friendly. My Singapore trip was fantastic!',
  },
  {
    id: 5,
    name: 'Jessica Patel',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 5,
    date: 'November 10, 2023',
    destination: 'Hong Kong',
    review: "I had to make some last-minute changes to my Hong Kong trip, and TravelRider's customer service team was incredibly helpful. They made the process painless and saved me a lot of money!",
  },
  {
    id: 6,
    name: 'Robert Lee',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    rating: 4.5,
    date: 'September 15, 2023',
    destination: 'Seoul, South Korea',
    review: 'My wife and I had a wonderful time in Seoul thanks to TravelRider. The flight recommendations were spot on, and we got a great deal on our hotel package too. Will be using them again soon!',
  },
];

const ReviewCard = ({ review }) => (
  <Card
    style={{ 
      height: '100%',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f0f0f0',
      overflow: 'hidden'
    }}
    bodyStyle={{ padding: '24px' }}
  >
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Avatar 
        src={review.avatar} 
        size={64}
        icon={<UserOutlined />}
        style={{ border: '2px solid #1890ff' }}
      />
      <div style={{ marginLeft: '16px' }}>
        <Text strong style={{ fontSize: '16px', display: 'block' }}>
          {review.name}
        </Text>
        <Rate 
          disabled 
          defaultValue={review.rating} 
          allowHalf 
          style={{ fontSize: '14px', marginTop: '4px' }}
        />
        <div style={{ marginTop: '4px', fontSize: '12px', color: '#8c8c8c' }}>
          <CalendarOutlined style={{ marginRight: '4px' }} />
          {review.date}
        </div>
      </div>
    </div>
    
    <div style={{ 
      backgroundColor: '#f5f8ff', 
      padding: '12px', 
      borderRadius: '8px',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <GlobalOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
        <Text strong>{review.destination}</Text>
      </div>
    </div>
    
    <Paragraph style={{ 
      color: '#595959',
      lineHeight: '1.8',
      position: 'relative',
      fontStyle: 'italic'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '-5px', 
        left: '-10px', 
        fontSize: '32px', 
        color: '#1890ff', 
        opacity: 0.2
      }}>
        "
      </div>
      {review.review}
      <div style={{ 
        position: 'absolute', 
        bottom: '-15px', 
        right: '-10px', 
        fontSize: '32px', 
        color: '#1890ff', 
        opacity: 0.2
      }}>
        "
      </div>
    </Paragraph>
  </Card>
);

const Reviews = () => {
  // Desktop view shows 3 reviews at a time
  const renderDesktopView = () => (
    <Row gutter={[24, 24]}>
      {reviews.map(review => (
        <Col xs={24} sm={12} md={8} key={review.id}>
          <ReviewCard review={review} />
        </Col>
      ))}
    </Row>
  );

  // Mobile view shows reviews in a carousel
  const renderMobileView = () => (
    <Carousel
      autoplay
      dots={{ className: 'custom-carousel-dots' }}
      style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px 0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      {reviews.map(review => (
        <div key={review.id} style={{ padding: '0 16px' }}>
          <ReviewCard review={review} />
        </div>
      ))}
    </Carousel>
  );

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={2} style={{ color: '#1890ff', marginBottom: '16px' }}>
          What Our Customers Say
        </Title>
        <Paragraph style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Don't just take our word for it. See what travelers around the world have to say about their experience with TravelRider.
        </Paragraph>
      </div>
      
      {/* Show carousel on mobile, grid on desktop */}
      <div className="desktop-only">
        {renderDesktopView()}
      </div>
      <div className="mobile-only">
        {renderMobileView()}
      </div>
    </div>
  );
};

export default Reviews;
