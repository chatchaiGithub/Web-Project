import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber, 
  Radio, 
  Divider, 
  Space, 
  List, 
  Avatar,
  Tag,
  Steps
} from 'antd';
import { 
  RocketOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  SearchOutlined,
  StarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  HomeOutlined,
  CarOutlined,
  GlobalOutlined,
  SafetyOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

// Mock popular destinations
const popularDestinations = [
  {
    id: 1,
    from: 'Bangkok (BKK)',
    to: 'Singapore (SIN)',
    airline: 'TravelRider Airlines',
    duration: '2h 30m',
    price: 89,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    departure: '10:30',
    arrival: '13:00'
  },
  {
    id: 2,
    from: 'Bangkok (BKK)',
    to: 'Tokyo (NRT)',
    airline: 'Japan Airlines',
    duration: '5h 45m',
    price: 280,
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    departure: '09:15',
    arrival: '15:00'
  },
  {
    id: 3,
    from: 'Bangkok (BKK)',
    to: 'Bali (DPS)',
    airline: 'Thai Airways',
    duration: '4h 15m',
    price: 160,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    departure: '08:40',
    arrival: '12:55'
  },
  {
    id: 4,
    from: 'Bangkok (BKK)',
    to: 'Hong Kong (HKG)',
    airline: 'Cathay Pacific',
    duration: '2h 40m',
    price: 145,
    image: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    departure: '14:20',
    arrival: '17:00'
  }
];

// Popular hotels
const popularHotels = [
  {
    id: 1,
    name: 'Grand Riverside Hotel',
    location: 'Bangkok, Thailand',
    price: 75,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
  },
  {
    id: 2,
    name: 'Ocean View Resort',
    location: 'Phuket, Thailand',
    price: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amenities: ['Beachfront', 'Pool', 'Breakfast', 'Bar']
  },
  {
    id: 3,
    name: 'City Center Suites',
    location: 'Singapore',
    price: 95,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amenities: ['City View', 'Gym', 'Restaurant', 'Lounge']
  },
  {
    id: 4,
    name: 'Mountain Retreat',
    location: 'Chiang Mai, Thailand',
    price: 65,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1501117716987-67454ba0dcd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    amenities: ['Nature View', 'Breakfast', 'Free WiFi', 'Spa']
  }
];

const QuickBookingPage = () => {
  const [form] = Form.useForm();
  const [searchType, setSearchType] = useState('flight');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = () => {
    form.validateFields().then(values => {
      setLoading(true);
      setFormData(values);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setCurrent(1);
        openNotification(
          'success',
          'Search Complete',
          `We found great ${searchType} options matching your criteria!`
        );
      }, 1500);
    });
  };

  const handleQuickBook = (item) => {
    setCurrent(2);
    openNotification(
      'success',
      'Booking Initiated',
      `You've selected ${searchType === 'flight' ? item.airline + ' to ' + item.to : item.name}. Complete your booking details.`
    );
  };

  const handleBookingComplete = () => {
    setCurrent(3);
    openNotification(
      'success',
      'Booking Confirmed',
      'Your booking has been confirmed! You will receive a confirmation email shortly.'
    );
  };

  // Render flight search form
  const renderFlightForm = () => (
    <>
      <Form.Item
        name="tripType"
        initialValue="roundTrip"
        style={{ marginBottom: '16px' }}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="roundTrip">Round Trip</Radio.Button>
          <Radio.Button value="oneWay">One Way</Radio.Button>
          <Radio.Button value="multiCity">Multi-City</Radio.Button>
        </Radio.Group>
      </Form.Item>
      
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="from"
            label="From"
            rules={[{ required: true, message: 'Please select departure city' }]}
          >
            <Select
              showSearch
              placeholder="City or Airport"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              suffixIcon={<EnvironmentOutlined style={{ color: '#1890ff' }} />}
              size="large"
            >
              <Option value="bangkok">Bangkok (BKK)</Option>
              <Option value="singapore">Singapore (SIN)</Option>
              <Option value="tokyo">Tokyo (NRT)</Option>
              <Option value="hongkong">Hong Kong (HKG)</Option>
              <Option value="seoul">Seoul (ICN)</Option>
              <Option value="kualalumpur">Kuala Lumpur (KUL)</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="to"
            label="To"
            rules={[{ required: true, message: 'Please select destination city' }]}
          >
            <Select
              showSearch
              placeholder="City or Airport"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              suffixIcon={<EnvironmentOutlined style={{ color: '#1890ff' }} />}
              size="large"
            >
              <Option value="singapore">Singapore (SIN)</Option>
              <Option value="tokyo">Tokyo (NRT)</Option>
              <Option value="hongkong">Hong Kong (HKG)</Option>
              <Option value="seoul">Seoul (ICN)</Option>
              <Option value="bali">Bali (DPS)</Option>
              <Option value="phuket">Phuket (HKT)</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="dates"
            label="Dates"
            rules={[{ required: true, message: 'Please select travel dates' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder={['Departure', 'Return']}
              size="large"
              suffixIcon={<CalendarOutlined style={{ color: '#1890ff' }} />}
              disabledDate={current => {
                return current && current < moment().startOf('day');
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="passengers"
            label="Passengers"
            initialValue={1}
            rules={[{ required: true, message: 'Please specify number of passengers' }]}
          >
            <InputNumber
              min={1}
              max={10}
              style={{ width: '100%' }}
              size="large"
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="class"
        label="Class"
        initialValue="economy"
      >
        <Select size="large">
          <Option value="economy">Economy</Option>
          <Option value="premium">Premium Economy</Option>
          <Option value="business">Business</Option>
          <Option value="first">First Class</Option>
        </Select>
      </Form.Item>
    </>
  );

  // Render hotel search form
  const renderHotelForm = () => (
    <>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Please select destination' }]}
          >
            <Select
              showSearch
              placeholder="City or Hotel"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              suffixIcon={<EnvironmentOutlined style={{ color: '#1890ff' }} />}
              size="large"
            >
              <Option value="bangkok">Bangkok, Thailand</Option>
              <Option value="singapore">Singapore</Option>
              <Option value="tokyo">Tokyo, Japan</Option>
              <Option value="phuket">Phuket, Thailand</Option>
              <Option value="bali">Bali, Indonesia</Option>
              <Option value="chiangmai">Chiang Mai, Thailand</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="hotelDates"
            label="Stay Dates"
            rules={[{ required: true, message: 'Please select stay dates' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder={['Check-in', 'Check-out']}
              size="large"
              suffixIcon={<CalendarOutlined style={{ color: '#1890ff' }} />}
              disabledDate={current => {
                return current && current < moment().startOf('day');
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="rooms"
            label="Rooms"
            initialValue={1}
            rules={[{ required: true, message: 'Please specify number of rooms' }]}
          >
            <InputNumber
              min={1}
              max={5}
              style={{ width: '100%' }}
              size="large"
              prefix={<HomeOutlined style={{ color: '#1890ff' }} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="guests"
            label="Guests"
            initialValue={2}
            rules={[{ required: true, message: 'Please specify number of guests' }]}
          >
            <InputNumber
              min={1}
              max={10}
              style={{ width: '100%' }}
              size="large"
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="priceRange"
        label="Price Range Per Night"
        initialValue={[50, 200]}
      >
        <Select size="large">
          <Option value={[0, 50]}>Under $50</Option>
          <Option value={[50, 100]}>$50 - $100</Option>
          <Option value={[100, 200]}>$100 - $200</Option>
          <Option value={[200, 500]}>$200 - $500</Option>
          <Option value={[500, 10000]}>$500+</Option>
        </Select>
      </Form.Item>
    </>
  );

  // Render search results
  const renderSearchResults = () => {
    if (searchType === 'flight') {
      return (
        <List
          itemLayout="horizontal"
          dataSource={popularDestinations}
          renderItem={item => (
            <List.Item
              actions={[
                <Button 
                  type="primary" 
                  key="book" 
                  onClick={() => handleQuickBook(item)}
                >
                  Quick Book
                </Button>
              ]}
            >
              <Card 
                hoverable
                style={{ width: '100%' }}
                bodyStyle={{ padding: '16px' }}
              >
                <Row gutter={16} align="middle">
                  <Col xs={24} md={6}>
                    <div style={{ 
                      width: '100%', 
                      height: '120px', 
                      overflow: 'hidden', 
                      borderRadius: '8px',
                      marginBottom: '12px'
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.to} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text strong style={{ fontSize: '16px' }}>{item.from} → {item.to}</Text>
                        <Tag color="blue">{item.duration}</Tag>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <Text type="secondary">{item.airline}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <Text style={{ fontSize: '14px' }}>{item.departure}</Text>
                          <Text type="secondary" style={{ margin: '0 8px' }}>—</Text>
                          <Text style={{ fontSize: '14px' }}>{item.arrival}</Text>
                        </div>
                        <div>
                          <Tag color="green">Non-stop</Tag>
                        </div>
                      </div>
                      <div>
                        <Tag icon={<ClockCircleOutlined />} color="default">
                          Departs Tomorrow
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={6} style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ color: '#1890ff', margin: '0 0 8px' }}>
                      ${item.price}
                    </Title>
                    <Text type="secondary">per person</Text>
                    <div style={{ marginTop: '16px' }}>
                      <Tag color="volcano" icon={<FireOutlined />}>Hot Deal</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      );
    } else {
      return (
        <Row gutter={[24, 24]}>
          {popularHotels.map(hotel => (
            <Col xs={24} sm={12} key={hotel.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img 
                      alt={hotel.name} 
                      src={hotel.image} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Title level={5} style={{ margin: 0 }}>{hotel.name}</Title>
                  <div>
                    <StarOutlined style={{ color: '#faad14' }} /> <Text strong>{hotel.rating}</Text>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <EnvironmentOutlined style={{ color: '#1890ff', marginRight: '4px' }} />
                  <Text type="secondary">{hotel.location}</Text>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  {hotel.amenities.map((amenity, index) => (
                    <Tag key={index} style={{ marginBottom: '4px' }}>{amenity}</Tag>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Title level={4} style={{ color: '#1890ff', margin: 0 }}>${hotel.price}</Title>
                    <Text type="secondary">per night</Text>
                  </div>
                  <Button 
                    type="primary" 
                    onClick={() => handleQuickBook(hotel)}
                  >
                    Quick Book
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
  };

  // Render booking form
  const renderBookingForm = () => (
    <Card>
      <Form layout="vertical">
        <Title level={4} style={{ marginBottom: '24px' }}>Complete Your Booking</Title>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        
        <Divider />
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Payment Method"
              name="payment"
              rules={[{ required: true, message: 'Please select a payment method' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="credit">Credit Card</Radio>
                  <Radio value="paypal">PayPal</Radio>
                  <Radio value="bank">Bank Transfer</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Special Requests"
              name="requests"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item>
          <Button type="primary" size="large" onClick={handleBookingComplete}>
            Complete Booking
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  // Render confirmation
  const renderConfirmation = () => (
    <Card style={{ textAlign: 'center', padding: '20px 0' }}>
      <CheckCircleOutlined style={{ fontSize: '72px', color: '#52c41a', marginBottom: '24px' }} />
      
      <Title level={3}>Booking Confirmed!</Title>
      
      <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
        Thank you for booking with TravelRider. Your booking has been confirmed and a confirmation email has been sent to your email address.
      </Paragraph>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        maxWidth: '500px', 
        margin: '0 auto 24px',
        textAlign: 'left'
      }}>
        <Title level={5}>Booking Details</Title>
        <Divider style={{ margin: '12px 0' }} />
        
        <Row gutter={[8, 16]}>
          <Col span={12}>
            <Text type="secondary">Booking Reference:</Text>
          </Col>
          <Col span={12}>
            <Text strong>TR-{Math.floor(Math.random() * 1000000)}</Text>
          </Col>
          
          <Col span={12}>
            <Text type="secondary">Type:</Text>
          </Col>
          <Col span={12}>
            <Text>{searchType.charAt(0).toUpperCase() + searchType.slice(1)}</Text>
          </Col>
          
          <Col span={12}>
            <Text type="secondary">{searchType === 'flight' ? 'Route:' : 'Hotel:'}</Text>
          </Col>
          <Col span={12}>
            <Text>{searchType === 'flight' ? 'Bangkok → Singapore' : 'Grand Riverside Hotel'}</Text>
          </Col>
          
          <Col span={12}>
            <Text type="secondary">Date:</Text>
          </Col>
          <Col span={12}>
            <Text>July 15, 2025 - July 22, 2025</Text>
          </Col>
          
          <Col span={12}>
            <Text type="secondary">Booking Status:</Text>
          </Col>
          <Col span={12}>
            <Tag color="green">Confirmed</Tag>
          </Col>
        </Row>
      </div>
      
      <Space>
        <Button type="primary">
          View Booking Details
        </Button>
        <Button>
          Make Another Booking
        </Button>
      </Space>
    </Card>
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card style={{ marginBottom: '24px' }}>
        <Steps current={current} style={{ marginBottom: '24px' }}>
          <Step title="Search" description="Find options" />
          <Step title="Results" description="Choose the best option" />
          <Step title="Book" description="Complete details" />
          <Step title="Confirmed" description="You're all set!" />
        </Steps>
      </Card>
      
      {current === 0 && (
        <Card>
          <Title level={4} style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <RocketOutlined style={{ marginRight: '10px', color: '#1890ff' }} /> 
            Quick Booking
          </Title>
          
          <Form form={form} layout="vertical" initialValues={{ tripType: 'roundTrip' }}>
            <Form.Item>
              <Radio.Group value={searchType} onChange={handleSearchTypeChange} buttonStyle="solid" size="large">
                <Radio.Button value="flight">
                  <RocketOutlined /> Flight
                </Radio.Button>
                <Radio.Button value="hotel">
                  <HomeOutlined /> Hotel
                </Radio.Button>
                <Radio.Button value="car" disabled>
                  <CarOutlined /> Car Rental
                </Radio.Button>
                <Radio.Button value="package" disabled>
                  <GlobalOutlined /> Package
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            
            {searchType === 'flight' ? renderFlightForm() : renderHotelForm()}
            
            <Form.Item>
              <Button 
                type="primary" 
                icon={<SearchOutlined />} 
                size="large" 
                onClick={handleSearch}
                loading={loading}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      
      {current === 1 && (
        <div>
          <Card style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0 }}>
                {searchType === 'flight' ? 'Available Flights' : 'Available Hotels'}
              </Title>
              <Button onClick={() => setCurrent(0)}>Modify Search</Button>
            </div>
          </Card>
          
          {renderSearchResults()}
        </div>
      )}
      
      {current === 2 && renderBookingForm()}
      
      {current === 3 && renderConfirmation()}
      
      {current === 0 && (
        <div style={{ marginTop: '40px' }}>
          <Title level={4} style={{ marginBottom: '24px' }}>
            <FireOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} /> 
            Popular {searchType === 'flight' ? 'Flights' : 'Hotels'}
          </Title>
          
          <Row gutter={[24, 24]}>
            {(searchType === 'flight' ? popularDestinations : popularHotels).slice(0, 4).map(item => (
              <Col xs={24} sm={12} md={6} key={item.id}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: '140px', overflow: 'hidden' }}>
                      <img 
                        alt={searchType === 'flight' ? item.to : item.name} 
                        src={item.image} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  }
                  bodyStyle={{ padding: '16px' }}
                >
                  {searchType === 'flight' ? (
                    <>
                      <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                        {item.from} → {item.to}
                      </Text>
                      <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                        {item.airline}
                      </Text>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text type="secondary">{item.duration}</Text>
                        <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>${item.price}</Text>
                      </div>
                    </>
                  ) : (
                    <>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        {item.name}
                      </Text>
                      <Text type="secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                        <EnvironmentOutlined style={{ marginRight: '4px' }} />
                        {item.location}
                      </Text>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <StarOutlined style={{ color: '#faad14', marginRight: '4px' }} />
                          <Text>{item.rating}</Text>
                        </div>
                        <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>${item.price}</Text>
                      </div>
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      
      {current === 0 && (
        <div style={{ marginTop: '40px' }}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}><SafetyOutlined style={{ marginRight: '8px' }} /> Why Book with TravelRider</Title>}
            style={{ background: '#f8f9fa' }}
          >
            <Row gutter={[32, 24]}>
              <Col xs={24} sm={8}>
                <Title level={5}>Best Price Guarantee</Title>
                <Paragraph>
                  Find a lower price? We'll match it and give you an additional discount.
                </Paragraph>
              </Col>
              <Col xs={24} sm={8}>
                <Title level={5}>No Hidden Fees</Title>
                <Paragraph>
                  What you see is what you pay. We're transparent about all costs.
                </Paragraph>
              </Col>
              <Col xs={24} sm={8}>
                <Title level={5}>24/7 Customer Support</Title>
                <Paragraph>
                  Our support team is available around the clock to assist you.
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuickBookingPage;
