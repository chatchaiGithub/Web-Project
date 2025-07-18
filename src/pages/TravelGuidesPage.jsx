import React, { useState } from 'react';
import { Typography, Card, Row, Col, Tag, Button, Divider, Tabs, Space, Badge, Carousel, Input, List, Avatar, Skeleton } from 'antd';
import { 
  ReadOutlined, 
  BookOutlined, 
  GlobalOutlined, 
  CompassOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  DownloadOutlined,
  CameraOutlined,
  SearchOutlined,
  UserOutlined,
  ClockCircleOutlined,
  PushpinOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

// Mock travel guides data
const travelGuides = [
  {
    id: 1,
    title: 'Ultimate Bangkok Travel Guide',
    destination: 'Bangkok, Thailand',
    author: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'June 15, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'Discover the best temples, markets, street food, and hidden gems in Thailand\'s vibrant capital city.',
    likes: 432,
    comments: 28,
    tags: ['City Guide', 'Food', 'Culture', 'Budget Travel'],
    featured: true
  },
  {
    id: 2,
    title: 'Island Hopping in Thailand',
    destination: 'Southern Thailand',
    author: 'Mike Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'May 22, 2025',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'A comprehensive guide to exploring Thailand\'s most beautiful islands, from popular spots to hidden paradises.',
    likes: 286,
    comments: 42,
    tags: ['Islands', 'Beaches', 'Adventure', 'Photography'],
    featured: true
  },
  {
    id: 3,
    title: 'Tokyo on a Budget',
    destination: 'Tokyo, Japan',
    author: 'Emma Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    date: 'April 10, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'How to experience the best of Tokyo without breaking the bank - from free attractions to affordable eats.',
    likes: 518,
    comments: 47,
    tags: ['Budget Travel', 'City Guide', 'Food', 'Public Transport'],
    featured: true
  },
  {
    id: 4,
    title: 'Bali Beyond the Beaches',
    destination: 'Bali, Indonesia',
    author: 'David Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: 'March 8, 2025',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'Explore the cultural heart of Bali - ancient temples, lush rice terraces, and traditional villages away from tourist crowds.',
    likes: 362,
    comments: 31,
    tags: ['Culture', 'Nature', 'Photography', 'Off the Beaten Path'],
    featured: false
  },
  {
    id: 5,
    title: 'Singapore: The Perfect 3-Day Itinerary',
    destination: 'Singapore',
    author: 'Olivia Tan',
    authorAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    date: 'February 19, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'Make the most of a short visit to Singapore with this carefully crafted itinerary covering all the highlights.',
    likes: 245,
    comments: 18,
    tags: ['Itinerary', 'City Guide', 'Food', 'Shopping'],
    featured: false
  },
  {
    id: 6,
    title: 'Hiking Adventures in Chiang Mai',
    destination: 'Chiang Mai, Thailand',
    author: 'Ryan Park',
    authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    date: 'January 12, 2025',
    readTime: '11 min read',
    image: 'https://th.bing.com/th/id/R.6c503ed0381d314053f90cfe31f9fe12?rik=5fwOS2qCWNd%2fyw&pid=ImgRaw&r=0',
    excerpt: 'Guide to the best hiking trails around Chiang Mai, from easy walks to challenging mountain treks.',
    likes: 198,
    comments: 24,
    tags: ['Adventure', 'Hiking', 'Nature', 'Outdoors'],
    featured: false
  },
  {
    id: 7,
    title: 'Street Food Guide to Asia',
    destination: 'Various Cities, Asia',
    author: 'Jennifer Lee',
    authorAvatar: 'https://randomuser.me/api/portraits/women/86.jpg',
    date: 'December 5, 2024',
    readTime: '18 min read',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'Discover the most delicious street food across Asian cities, from Bangkok to Tokyo to Singapore.',
    likes: 476,
    comments: 53,
    tags: ['Food', 'Street Food', 'Culinary', 'Budget Travel'],
    featured: false
  },
  {
    id: 8,
    title: 'Family Travel in Southeast Asia',
    destination: 'Southeast Asia',
    author: 'Thomas Wright',
    authorAvatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    date: 'November 18, 2024',
    readTime: '13 min read',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80',
    excerpt: 'Tips, destinations, and activities for a successful family vacation in Southeast Asia.',
    likes: 324,
    comments: 37,
    tags: ['Family Travel', 'Kid-Friendly', 'Planning', 'Safety'],
    featured: false
  },
];

// Guide categories
const guideCategories = [
  {
    title: 'City Guides',
    icon: <EnvironmentOutlined />,
    color: '#1890ff'
  },
  {
    title: 'Food & Dining',
    icon: <CameraOutlined />,
    color: '#eb2f96'
  },
  {
    title: 'Adventure Travel',
    icon: <CompassOutlined />,
    color: '#52c41a'
  },
  {
    title: 'Budget Travel',
    icon: <BookOutlined />,
    color: '#722ed1'
  },
  {
    title: 'Family Trips',
    icon: <UserOutlined />,
    color: '#fa8c16'
  },
  {
    title: 'Photography Spots',
    icon: <CameraOutlined />,
    color: '#fa541c'
  },
];

// List of popular tags
const popularTags = [
  'Bangkok', 'Tokyo', 'Singapore', 'Bali', 'Beaches', 'Food', 'Temples', 
  'Budget Travel', 'Luxury', 'Adventure', 'Photography', 'Family', 'Solo Travel',
  'Islands', 'Hiking', 'City Break', 'Shopping', 'Culture', 'Festivals'
];

const TravelGuidesPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      openNotification('success', 'Guides Loaded', `${category} travel guides have been loaded.`);
    }, 1000);
  };

  const handleGuideClick = (guide) => {
    openNotification('info', 'Guide Selected', `You selected "${guide.title}". This feature is coming soon!`);
  };

  const filteredGuides = selectedCategory 
    ? travelGuides.filter(guide => guide.tags.some(tag => tag.includes(selectedCategory)))
    : travelGuides;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        height: '300px', 
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
          Travel Guides & Tips
        </Title>
        <Paragraph style={{ color: 'white', fontSize: '18px', maxWidth: '700px', marginBottom: '24px' }}>
          Expert advice, local insights, and travel inspiration to help you plan your perfect journey
        </Paragraph>
        <Search
          placeholder="Search for guides, destinations, or topics"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: '60%', maxWidth: '500px' }}
        />
      </div>

      {/* Categories Section */}
      <div style={{ marginBottom: '40px' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>
          <BookOutlined style={{ marginRight: '8px' }} /> Browse by Category
        </Title>
        
        <Row gutter={[16, 16]}>
          {guideCategories.map((category, index) => (
            <Col xs={12} sm={8} md={4} key={index}>
              <Card 
                hoverable 
                style={{ textAlign: 'center', borderRadius: '8px' }}
                onClick={() => handleCategoryClick(category.title)}
              >
                <div style={{ 
                  fontSize: '28px', 
                  color: category.color,
                  marginBottom: '8px' 
                }}>
                  {category.icon}
                </div>
                <Text strong>{category.title}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Featured Guides */}
      <div style={{ marginBottom: '40px' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>
          <StarOutlined style={{ color: '#faad14', marginRight: '8px' }} /> Featured Guides
        </Title>
        
        <Row gutter={[24, 24]}>
          {travelGuides.filter(guide => guide.featured).map(guide => (
            <Col xs={24} md={8} key={guide.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      alt={guide.title} 
                      src={guide.image} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '20px 16px 16px',
                    }}>
                      <Text style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{guide.destination}</Text>
                    </div>
                  </div>
                }
                onClick={() => handleGuideClick(guide)}
              >
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Space>
                    <Avatar src={guide.authorAvatar} size="small" />
                    <Text type="secondary">{guide.author}</Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                    {guide.readTime}
                  </Text>
                </div>
                
                <Title level={5} style={{ marginTop: 0, marginBottom: '12px' }}>
                  {guide.title}
                </Title>
                
                <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '16px' }}>
                  {guide.excerpt}
                </Paragraph>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <Button type="text" size="small" icon={<LikeOutlined />}>{guide.likes}</Button>
                    <Button type="text" size="small" icon={<MessageOutlined />}>{guide.comments}</Button>
                  </Space>
                  <Button type="link" size="small" icon={<ReadOutlined />}>
                    Read Guide
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* All Travel Guides */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0 }}>
            <GlobalOutlined style={{ color: '#1890ff', marginRight: '8px' }} /> 
            {selectedCategory ? `${selectedCategory} Guides` : 'All Travel Guides'}
          </Title>
          {selectedCategory && (
            <Button onClick={() => setSelectedCategory(null)}>
              View All Guides
            </Button>
          )}
        </div>

        <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={filteredGuides}
            renderItem={guide => (
              <List.Item>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  cover={
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img 
                        alt={guide.title} 
                        src={guide.image} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  }
                  onClick={() => handleGuideClick(guide)}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <Space wrap>
                      {guide.tags.slice(0, 2).map((tag, index) => (
                        <Tag color="blue" key={index}>{tag}</Tag>
                      ))}
                      {guide.tags.length > 2 && (
                        <Tag color="default">+{guide.tags.length - 2}</Tag>
                      )}
                    </Space>
                  </div>
                  
                  <Title level={5} style={{ marginTop: 0, marginBottom: '8px' }}>
                    {guide.title}
                  </Title>
                  
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <EnvironmentOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
                    <Text type="secondary">{guide.destination}</Text>
                  </div>
                  
                  <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '16px', height: '48px' }}>
                    {guide.excerpt}
                  </Paragraph>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <Avatar src={guide.authorAvatar} size="small" />
                      <Text type="secondary" style={{ fontSize: '12px' }}>{guide.author}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      <CalendarOutlined style={{ marginRight: '4px' }} />
                      {guide.date}
                    </Text>
                  </div>
                </Card>
              </List.Item>
            )}
            pagination={{
              onChange: page => {
                console.log(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
              pageSize: 6,
              hideOnSinglePage: true,
              showSizeChanger: false,
            }}
          />
        </Skeleton>
      </div>

      {/* Popular Tags Cloud */}
      <div style={{ marginBottom: '40px' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PushpinOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              <span>Popular Topics</span>
            </div>
          }
          style={{ borderRadius: '8px' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {popularTags.map((tag, index) => (
              <Tag 
                key={index} 
                color={index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'purple' : index % 4 === 2 ? 'green' : 'orange'}
                style={{ padding: '4px 8px', fontSize: '14px', cursor: 'pointer' }}
                onClick={() => handleCategoryClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </Card>
      </div>

      {/* Download Guides Section */}
      <div style={{ 
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
          Download Our PDF Travel Guides
        </Title>
        <Paragraph style={{ color: 'white', fontSize: '16px', maxWidth: '700px', marginBottom: '24px' }}>
          Access our premium travel guides offline. Perfect for your journey when you don't have internet access.
        </Paragraph>
        <Row gutter={[16, 16]} style={{ width: '100%', maxWidth: '900px' }}>
          <Col xs={24} md={8}>
            <Card style={{ textAlign: 'center', height: '100%' }}>
              <DownloadOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
              <Title level={5}>Bangkok Guide</Title>
              <Paragraph type="secondary">Complete 50-page guide</Paragraph>
              <Button type="primary" icon={<DownloadOutlined />}>
                Download
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ textAlign: 'center', height: '100%' }}>
              <DownloadOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
              <Title level={5}>Tokyo Itinerary</Title>
              <Paragraph type="secondary">7-day detailed plan</Paragraph>
              <Button type="primary" icon={<DownloadOutlined />}>
                Download
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ textAlign: 'center', height: '100%' }}>
              <DownloadOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
              <Title level={5}>Southeast Asia</Title>
              <Paragraph type="secondary">2-week adventure guide</Paragraph>
              <Button type="primary" icon={<DownloadOutlined />}>
                Download
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TravelGuidesPage;
