import React from 'react';
import { Card, List, Image, Typography, Rate, Tag, Space, Button } from 'antd';
import { GlobalOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// Sample travel packages data
const travelPackages = [
  {
    id: 1,
    title: 'Tokyo Explorer',
    location: 'Tokyo, Japan',
    duration: '5 days, 4 nights',
    price: 45000,
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    description: 'Explore the vibrant city of Tokyo, from traditional temples to modern skyscrapers.',
    highlights: ['Visit Tokyo Skytree', 'Explore Senso-ji Temple', 'Experience Shibuya Crossing', 'Day trip to Mt. Fuji'],
  },
  {
    id: 2,
    title: 'Singapore City Break',
    location: 'Singapore',
    duration: '4 days, 3 nights',
    price: 28000,
    rating: 4.5,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170',
    description: 'Discover the Garden City with its unique blend of cultures, cuisine, and attractions.',
    highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island', 'Hawker Centers Food Tour'],
  },
  {
    id: 3,
    title: 'Seoul K-Culture Tour',
    location: 'Seoul, South Korea',
    duration: '6 days, 5 nights',
    price: 38000,
    rating: 4.8,
    reviewCount: 117,
    image: 'https://th.bing.com/th/id/R.66c73d52da3dcefd8208baa1d5fcda47?rik=a1C401JWLenM%2bQ&pid=ImgRaw&r=0',
    description: 'Immerse yourself in Korean culture, from K-pop to traditional palaces.',
    highlights: ['Gyeongbokgung Palace', 'Bukchon Hanok Village', 'K-pop Experience', 'Korean Cooking Class'],
  },
  {
    id: 4,
    title: 'Hong Kong Adventure',
    location: 'Hong Kong',
    duration: '5 days, 4 nights',
    price: 32000,
    rating: 4.6,
    reviewCount: 85,
    image: 'https://tse4.mm.bing.net/th/id/OIP.yt-Jnjxt0-eYrIprKrn3KgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Experience the perfect blend of East and West in this dynamic city.',
    highlights: ['Victoria Peak', 'Hong Kong Disneyland', 'Lantau Island', 'Temple Street Night Market'],
  },
  {
    id: 5,
    title: 'Bali Paradise',
    location: 'Bali, Indonesia',
    duration: '7 days, 6 nights',
    price: 35000,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    description: 'Relax and rejuvenate in the Island of Gods with beautiful beaches and rich culture.',
    highlights: ['Ubud Monkey Forest', 'Uluwatu Temple', 'Tegalalang Rice Terraces', 'Balinese Spa Treatment'],
  },
];

const TravelTripPage = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '20px' }}>
          Explore Travel Packages
        </Title>
        
        <Paragraph style={{ marginBottom: '24px' }}>
          Discover our handpicked travel packages to the most popular destinations. All packages include flights, accommodation, and selected activities.
        </Paragraph>
        
        <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={travelPackages}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <Image 
                    alt={item.title}
                    src={item.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                    fallback="data:image/png;base64,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"
                  />
                }
              >
                <div style={{ marginBottom: '12px' }}>
                  <Tag color="blue">{item.duration}</Tag>
                  <Tag color="green">Flight Included</Tag>
                </div>
                
                <Title level={4} style={{ marginBottom: '8px' }}>
                  {item.title}
                </Title>
                
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  <Space>
                    <EnvironmentOutlined />
                    <Text>{item.location}</Text>
                  </Space>
                  
                  <Space>
                    <Rate disabled defaultValue={item.rating} style={{ fontSize: '14px' }} />
                    <Text>({item.reviewCount} reviews)</Text>
                  </Space>
                  
                  <Paragraph>{item.description}</Paragraph>
                  
                  <div>
                    <Text strong>Highlights:</Text>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      {item.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                        ฿{item.price.toLocaleString()}
                      </Text>
                      <div style={{ fontSize: '12px', color: '#999' }}>per person</div>
                    </div>
                    
                    <Button type="primary">View Details</Button>
                  </div>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default TravelTripPage;
