import React, { useState } from 'react';
import { Typography, Card, Row, Col, Tag, Button, Divider, Tabs, Space, Badge, Carousel, Input, Rate, Avatar, Statistic } from 'antd';
import { 
  StarOutlined, 
  StarFilled,
  EnvironmentOutlined, 
  HeartOutlined, 
  HeartFilled,
  GlobalOutlined, 
  CameraOutlined, 
  CompassOutlined,
  CalendarOutlined,
  SearchOutlined,
  TeamOutlined,
  DollarOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

// Mock destinations data
const destinations = [
  {
    id: 1,
    name: 'Bangkok',
    country: 'Thailand',
    description: 'Experience the vibrant street life, magnificent temples, and world-famous cuisine of Thailand\'s capital city.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.i4H0U1konshOToVFNMdtqgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    rating: 4.7,
    type: 'City',
    mustSee: ['Grand Palace', 'Wat Arun', 'Chatuchak Market'],
    bestTime: 'November to February',
    flights: 24,
    hotels: 568,
    popular: true
  },
  {
    id: 2,
    name: 'Phuket',
    country: 'Thailand',
    description: 'Enjoy stunning beaches, crystal-clear waters, and vibrant nightlife on Thailand\'s largest island.',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.5,
    type: 'Beach',
    mustSee: ['Patong Beach', 'Big Buddha', 'Phi Phi Islands'],
    bestTime: 'November to April',
    flights: 16,
    hotels: 432,
    popular: true
  },
  {
    id: 3,
    name: 'Chiang Mai',
    country: 'Thailand',
    description: 'Discover ancient temples, mountainous landscapes, and traditional northern Thai culture.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    type: 'Cultural',
    mustSee: ['Doi Suthep', 'Old City Temples', 'Night Bazaar'],
    bestTime: 'October to February',
    flights: 12,
    hotels: 326,
    popular: true
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    description: 'Explore the perfect blend of traditional culture and cutting-edge technology in Japan\'s dynamic capital.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.9,
    type: 'City',
    mustSee: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree'],
    bestTime: 'March to May (Cherry Blossoms)',
    flights: 14,
    hotels: 492,
    popular: true
  },
  {
    id: 5,
    name: 'Bali',
    country: 'Indonesia',
    description: 'Relax on beautiful beaches, explore lush rice terraces, and immerse yourself in Balinese spirituality.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.6,
    type: 'Beach',
    mustSee: ['Ubud', 'Uluwatu Temple', 'Tegallalang Rice Terraces'],
    bestTime: 'April to October',
    flights: 18,
    hotels: 587,
    popular: true
  },
  {
    id: 6,
    name: 'Singapore',
    country: 'Singapore',
    description: 'Experience a multicultural city-state with futuristic architecture, lush gardens, and incredible food.',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    type: 'City',
    mustSee: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island'],
    bestTime: 'February to April',
    flights: 28,
    hotels: 384,
    popular: true
  },
  {
    id: 7,
    name: 'Seoul',
    country: 'South Korea',
    description: 'Discover a vibrant metropolis where ancient palaces stand alongside modern skyscrapers.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.7,
    type: 'City',
    mustSee: ['Gyeongbokgung Palace', 'Myeongdong', 'Namsan Tower'],
    bestTime: 'April to June or September to October',
    flights: 16,
    hotels: 412,
    popular: false
  },
  {
    id: 8,
    name: 'Krabi',
    country: 'Thailand',
    description: 'Explore stunning limestone cliffs, emerald waters, and secluded beaches in this tropical paradise.',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.5,
    type: 'Beach',
    mustSee: ['Railay Beach', 'Phi Phi Islands', 'Tiger Cave Temple'],
    bestTime: 'November to March',
    flights: 10,
    hotels: 278,
    popular: false
  },
];

// Featured destinations
const featuredDestinations = [
  {
    title: 'Beach Escapes',
    subtitle: 'Sun, sand & sea',
    destinations: destinations.filter(dest => dest.type === 'Beach').slice(0, 3),
    color: '#1890ff',
    icon: <GlobalOutlined />
  },
  {
    title: 'City Explorations',
    subtitle: 'Urban adventures',
    destinations: destinations.filter(dest => dest.type === 'City').slice(0, 3),
    color: '#722ed1',
    icon: <CompassOutlined />
  },
  {
    title: 'Cultural Journeys',
    subtitle: 'Discover traditions',
    destinations: destinations.filter(dest => dest.type === 'Cultural').slice(0, 3),
    color: '#eb2f96',
    icon: <CameraOutlined />
  }
];

const DestinationsPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      openNotification('info', 'Removed from favorites', 'This destination has been removed from your favorites.');
    } else {
      setFavorites([...favorites, id]);
      openNotification('success', 'Added to favorites', 'This destination has been added to your favorites.');
    }
  };

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <Carousel autoplay effect="fade" style={{ marginBottom: '32px' }}>
        <div>
          <div style={{ 
            height: '400px', 
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80)`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
              Discover Your Next Adventure
            </Title>
            <Paragraph style={{ color: 'white', fontSize: '18px', maxWidth: '700px', marginBottom: '24px' }}>
              Explore the world's most breathtaking destinations and create memories that last a lifetime
            </Paragraph>
            <Search
              placeholder="Search for a destination"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={value => setSearchTerm(value)}
              style={{ width: '60%', maxWidth: '500px' }}
            />
          </div>
        </div>
        <div>
          <div style={{ 
            height: '400px', 
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80)`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
              Tropical Paradise Awaits
            </Title>
            <Paragraph style={{ color: 'white', fontSize: '18px', maxWidth: '700px', marginBottom: '24px' }}>
              White sand beaches, crystal clear waters, and unforgettable sunsets
            </Paragraph>
            <Button type="primary" size="large">
              Explore Beach Destinations
            </Button>
          </div>
        </div>
        <div>
          <div style={{ 
            height: '400px', 
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80)`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
              Adventure Is Calling
            </Title>
            <Paragraph style={{ color: 'white', fontSize: '18px', maxWidth: '700px', marginBottom: '24px' }}>
              Hiking, trekking, and outdoor experiences in the world's most beautiful landscapes
            </Paragraph>
            <Button type="primary" size="large">
              Discover Adventure Destinations
            </Button>
          </div>
        </div>
      </Carousel>

      {/* Popular Destinations */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0 }}>
            <StarFilled style={{ color: '#faad14', marginRight: '8px' }} /> Popular Destinations
          </Title>
          <Button type="link">View All <ArrowRightOutlined /></Button>
        </div>

        <Row gutter={[24, 24]}>
          {destinations.filter(dest => dest.popular).map(destination => (
            <Col xs={24} sm={12} md={8} lg={6} key={destination.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      alt={destination.name} 
                      src={destination.image} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Button 
                      type="text" 
                      icon={favorites.includes(destination.id) ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
                      onClick={() => toggleFavorite(destination.id)}
                      style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '10px', 
                      left: '10px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '4px',
                      padding: '4px 8px'
                    }}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>{destination.type}</Text>
                    </div>
                  </div>
                }
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <Tag color="blue">{destination.country}</Tag>
                  <Rate disabled defaultValue={destination.rating} style={{ fontSize: '12px', float: 'right' }} />
                </div>
                <Title level={5} style={{ marginTop: 0, marginBottom: '8px' }}>
                  {destination.name}
                </Title>
                <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '16px', height: '48px' }}>
                  {destination.description}
                </Paragraph>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Space>
                    <Badge count={destination.flights} showZero color="#1890ff" overflowCount={999}>
                      <Button size="small" icon={<GlobalOutlined />} />
                    </Badge>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Flights</Text>
                  </Space>
                  <Space>
                    <Badge count={destination.hotels} showZero color="#52c41a" overflowCount={999}>
                      <Button size="small" icon={<EnvironmentOutlined />} />
                    </Badge>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Hotels</Text>
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Featured Collections */}
      <div style={{ marginBottom: '40px' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>
          <CompassOutlined style={{ color: '#1890ff', marginRight: '8px' }} /> Curated Collections
        </Title>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab} 
          type="card"
          tabBarStyle={{ marginBottom: '24px' }}
        >
          {featuredDestinations.map((featured, index) => (
            <TabPane 
              tab={
                <span>
                  {featured.icon} {featured.title}
                </span>
              } 
              key={(index + 1).toString()}
            >
              <Row gutter={[24, 24]}>
                {featured.destinations.map(destination => (
                  <Col xs={24} md={8} key={destination.id}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                          <img 
                            alt={destination.name} 
                            src={destination.image} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                            padding: '20px 16px 16px',
                            borderRadius: '0 0 8px 8px'
                          }}>
                            <Text style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{destination.name}</Text>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                              <EnvironmentOutlined style={{ color: 'white', marginRight: '4px' }} />
                              <Text style={{ color: 'white' }}>{destination.country}</Text>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '16px' }}>
                        {destination.description}
                      </Paragraph>
                      <div style={{ marginBottom: '16px' }}>
                        <Title level={5} style={{ marginBottom: '8px' }}>Must See:</Title>
                        <div>
                          {destination.mustSee.map((place, i) => (
                            <Tag color="blue" key={i} style={{ marginBottom: '8px' }}>{place}</Tag>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Space direction="vertical" size={0}>
                          <Text type="secondary">Best Time to Visit:</Text>
                          <Text strong>{destination.bestTime}</Text>
                        </Space>
                        <Button type="primary">
                          Explore
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          ))}
        </Tabs>
      </div>

      {/* Destination Stats */}
      <div style={{ marginBottom: '40px' }}>
        <Card 
          title={<Title level={4}>Why Choose Our Destinations</Title>} 
          bordered={false}
          style={{ background: '#f8f9fa', borderRadius: '12px' }}
        >
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="Destinations" 
                value={150} 
                prefix={<GlobalOutlined />} 
                valueStyle={{ color: '#1890ff' }}
              />
              <Paragraph>Handpicked locations across Asia</Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="Hotels" 
                value={4500} 
                prefix={<EnvironmentOutlined />} 
                valueStyle={{ color: '#52c41a' }}
              />
              <Paragraph>Quality accommodations at all price points</Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="Happy Travelers" 
                value={1.2} 
                suffix="M" 
                prefix={<TeamOutlined />} 
                valueStyle={{ color: '#722ed1' }}
              />
              <Paragraph>Satisfied customers and counting</Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="Price Guarantee" 
                value={100} 
                suffix="%" 
                prefix={<DollarOutlined />} 
                valueStyle={{ color: '#eb2f96' }}
              />
              <Paragraph>We'll match any lower price you find</Paragraph>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Newsletter */}
      <div style={{ 
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
          Get Inspired for Your Next Trip
        </Title>
        <Paragraph style={{ color: 'white', fontSize: '16px', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
          Subscribe to our newsletter and receive personalized destination recommendations, travel tips, and exclusive deals.
        </Paragraph>
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={8}>
            <Input.Group compact>
              <Input 
                style={{ width: 'calc(100% - 100px)' }} 
                placeholder="Your email address" 
                size="large"
              />
              <Button type="primary" size="large" style={{ width: '100px' }}>
                Subscribe
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DestinationsPage;
