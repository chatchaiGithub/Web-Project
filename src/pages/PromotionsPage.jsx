import React from 'react';
import { Typography, Card, Row, Col, Tag, Button, Divider, Tabs, Space, Badge, Carousel } from 'antd';
import { 
  StarOutlined, 
  ClockCircleOutlined, 
  PercentageOutlined, 
  GlobalOutlined, 
  FireOutlined, 
  RocketOutlined, 
  CreditCardOutlined,
  GiftOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Mock promotional data
const specialDeals = [
  {
    id: 1,
    title: 'Summer Flash Sale',
    description: 'Get up to 40% off on all domestic flights within Thailand! Book by July 31, 2025.',
    discount: '40%',
    expires: '31 Jul 2025',
    image: 'https://images.unsplash.com/photo-1490119551293-c52fcfd96381?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Hot Deal',
    tagColor: '#ff4d4f',
    code: 'SUMMER40'
  },
  {
    id: 2,
    title: 'Singapore Weekend Getaway',
    description: 'Fly to Singapore for a weekend escape with our special round-trip fares.',
    discount: '25%',
    expires: '30 Sep 2025',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Weekend',
    tagColor: '#1890ff',
    code: 'SGWEEKEND'
  },
  {
    id: 3,
    title: 'Japan Autumn Escape',
    description: 'Experience the beauty of autumn in Japan with reduced fares to Tokyo, Osaka, and Kyoto.',
    discount: '30%',
    expires: '15 Aug 2025',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'International',
    tagColor: '#722ed1',
    code: 'JPNAUTUMN'
  },
  {
    id: 4,
    title: 'Family Holiday Package',
    description: 'Children fly for free! Book a family trip and get a free ticket for children under 12.',
    discount: 'Kids Fly Free',
    expires: '31 Dec 2025',
    image: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Family',
    tagColor: '#52c41a',
    code: 'FAMILYFUN'
  }
];

const seasonalPromotions = [
  {
    id: 5,
    title: 'Songkran Festival Special',
    description: 'Celebrate Thai New Year with special rates on flights across Thailand.',
    discount: '35%',
    expires: '30 Apr 2026',
    image: 'https://images.unsplash.com/photo-1588084603723-41322976dc66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Festival',
    tagColor: '#faad14'
  },
  {
    id: 6,
    title: 'Christmas & New Year Deals',
    description: 'Plan your year-end holiday with our festive season specials to popular destinations.',
    discount: '30%',
    expires: '15 Dec 2025',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Seasonal',
    tagColor: '#fa541c'
  }
];

const partnerPromotions = [
  {
    id: 7,
    title: 'Hotel & Flight Bundle',
    description: 'Book your flight and get 50% off on partner hotels in Southeast Asia.',
    partner: 'Hilton Hotels',
    expires: '31 Oct 2025',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Bundle',
    tagColor: '#2f54eb'
  },
  {
    id: 8,
    title: 'Car Rental Discount',
    description: 'Get 25% off on car rentals at your destination when you book a flight.',
    partner: 'Avis Car Rental',
    expires: '31 Dec 2025',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Transport',
    tagColor: '#13c2c2'
  },
  {
    id: 9,
    title: '2x Miles with Mastercard',
    description: 'Earn double loyalty miles when you pay with a Mastercard credit card.',
    partner: 'Mastercard',
    expires: '30 Sep 2025',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    tag: 'Points',
    tagColor: '#eb2f96'
  }
];

const PromotionCard = ({ promotion }) => (
  <Card
    hoverable
    style={{ 
      borderRadius: '12px',
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }}
    cover={
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          alt={promotion.title} 
          src={promotion.image} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: promotion.tagColor,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 'bold',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
        }}>
          {promotion.tag}
        </div>
        {promotion.discount && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(255, 77, 79, 0.9)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <PercentageOutlined style={{ marginRight: '4px' }} /> {promotion.discount}
          </div>
        )}
      </div>
    }
  >
    <div style={{ marginBottom: '16px' }}>
      <Title level={4} style={{ marginBottom: '8px', color: '#1890ff' }}>{promotion.title}</Title>
      <Paragraph style={{ marginBottom: '16px', height: '48px', overflow: 'hidden' }}>
        {promotion.description}
      </Paragraph>
    </div>
    
    <div style={{ marginBottom: '16px' }}>
      {promotion.expires && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <ClockCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
          <Text type="secondary">Expires: {promotion.expires}</Text>
        </div>
      )}
      
      {promotion.partner && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <GlobalOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
          <Text type="secondary">Partner: {promotion.partner}</Text>
        </div>
      )}
      
      {promotion.code && (
        <div style={{ 
          background: '#f5f5f5',
          padding: '8px 12px',
          borderRadius: '4px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text strong>Code: {promotion.code}</Text>
          <Button 
            size="small" 
            type="link"
            onClick={() => {
              // Simulate copying to clipboard
              openNotification({
                message: 'Promo Code Copied!',
                description: `The code ${promotion.code} has been copied to your clipboard.`,
                type: 'success',
              });
            }}
          >
            Copy
          </Button>
        </div>
      )}
    </div>
    
    <Button 
      type="primary" 
      block 
      style={{ borderRadius: '6px' }}
      onClick={() => {
        openNotification({
          message: 'Promotion Applied',
          description: `The ${promotion.title} promotion has been applied. Continue to booking to see your discounted price.`,
          type: 'success',
        });
      }}
    >
      Book Now
    </Button>
  </Card>
);

const PromotionsPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ color: '#1890ff', marginBottom: '16px' }}>
          <PercentageOutlined style={{ marginRight: '16px' }} />
          Special Promotions
        </Title>
        <Paragraph style={{ fontSize: '16px' }}>
          Discover our latest promotions and exclusive deals to make your next journey even more enjoyable and affordable.
        </Paragraph>
      </div>
      
      {/* Featured Promotion Banner */}
      <Carousel autoplay className="promotion-carousel" style={{ marginBottom: '40px' }}>
        <div>
          <div style={{ 
            position: 'relative', 
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Special Promotion" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              padding: '32px',
              color: 'white'
            }}>
              <Badge 
                count="EXCLUSIVE OFFER" 
                style={{ 
                  backgroundColor: '#ff4d4f',
                  marginBottom: '16px'
                }} 
              />
              <Title level={2} style={{ color: 'white', margin: '16px 0' }}>
                Early Bird Summer 2026 Sale
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
                Book now for Summer 2026 and get up to 50% off on international flights. Limited time offer!
              </Paragraph>
              <Space>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<RocketOutlined />}
                  style={{ 
                    background: '#ff4d4f', 
                    borderColor: '#ff4d4f',
                    boxShadow: '0 4px 12px rgba(255, 77, 79, 0.4)'
                  }}
                >
                  Book Now
                </Button>
                <Button 
                  ghost 
                  size="large"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  Learn More
                </Button>
              </Space>
            </div>
          </div>
        </div>
        <div>
          <div style={{ 
            position: 'relative', 
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Beach Resort Deal" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              padding: '32px',
              color: 'white'
            }}>
              <Badge 
                count="WEEKEND GETAWAY" 
                style={{ 
                  backgroundColor: '#1890ff',
                  marginBottom: '16px'
                }} 
              />
              <Title level={2} style={{ color: 'white', margin: '16px 0' }}>
                Phuket Escape Package
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
                Flight + 3 nights at luxury resort starting at just ฿9,999. Book by July 31, 2025.
              </Paragraph>
              <Space>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<RocketOutlined />}
                  style={{ 
                    background: '#1890ff', 
                    borderColor: '#1890ff',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.4)'
                  }}
                >
                  View Package
                </Button>
                <Button 
                  ghost 
                  size="large"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  Learn More
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Carousel>
      
      <Tabs defaultActiveKey="1" size="large">
        <TabPane 
          tab={
            <span>
              <FireOutlined /> Hot Deals
            </span>
          } 
          key="1"
        >
          <Row gutter={[24, 24]}>
            {specialDeals.map(deal => (
              <Col xs={24} sm={12} md={8} lg={6} key={deal.id}>
                <PromotionCard promotion={deal} />
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CalendarOutlined /> Seasonal Offers
            </span>
          } 
          key="2"
        >
          <Row gutter={[24, 24]}>
            {seasonalPromotions.map(promo => (
              <Col xs={24} sm={12} key={promo.id}>
                <PromotionCard promotion={promo} />
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <GiftOutlined /> Partner Deals
            </span>
          } 
          key="3"
        >
          <Row gutter={[24, 24]}>
            {partnerPromotions.map(promo => (
              <Col xs={24} sm={12} md={8} key={promo.id}>
                <PromotionCard promotion={promo} />
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CreditCardOutlined /> Credit Card Offers
            </span>
          } 
          key="4"
        >
          <div style={{ padding: '24px', background: '#f5f5f5', borderRadius: '12px', marginBottom: '24px' }}>
            <Title level={4} style={{ marginBottom: '16px' }}>Exclusive Credit Card Offers</Title>
            <Paragraph>
              Use your eligible credit card when booking to enjoy these exclusive benefits and discounts.
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                hoverable
                style={{ borderRadius: '12px', overflow: 'hidden' }}
                cover={
                  <img
                    alt="Credit Card Offer"
                    src="https://images.unsplash.com/photo-1523362289600-a70b4a0e09aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Badge.Ribbon text="MASTERCARD" color="#EB001B">
                  <Title level={4}>10% Cashback on International Flights</Title>
                  <Paragraph>
                    Get 10% cashback (up to ฿2,000) when you book international flights with your Mastercard.
                  </Paragraph>
                  <Divider />
                  <Space>
                    <Button type="primary">Learn More</Button>
                    <Button>Book Now</Button>
                  </Space>
                </Badge.Ribbon>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card
                hoverable
                style={{ borderRadius: '12px', overflow: 'hidden' }}
                cover={
                  <img
                    alt="Credit Card Offer"
                    src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Badge.Ribbon text="VISA" color="#1A1F71">
                  <Title level={4}>Complimentary Travel Insurance</Title>
                  <Paragraph>
                    Enjoy complimentary travel insurance worth ฿1,500 when you book with your Visa Signature or Infinite card.
                  </Paragraph>
                  <Divider />
                  <Space>
                    <Button type="primary">Learn More</Button>
                    <Button>Book Now</Button>
                  </Space>
                </Badge.Ribbon>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      
      <div style={{ marginTop: '40px', padding: '24px', background: '#f0f5ff', borderRadius: '12px' }}>
        <Title level={4} style={{ display: 'flex', alignItems: 'center' }}>
          <StarOutlined style={{ color: '#faad14', marginRight: '12px' }} /> Join Our Rewards Program
        </Title>
        <Paragraph>
          Sign up for our rewards program to get access to exclusive promotions, early-bird offers, and earn points on every booking!
        </Paragraph>
        <Button type="primary" size="large">
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default PromotionsPage;
