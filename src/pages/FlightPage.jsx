import React, { useState } from 'react';
import { Card, Form, Select, DatePicker, Button, Radio, Divider, List, Tag, Space, Typography, Row, Col, Tooltip, Badge, Steps, Alert, Skeleton, Input } from 'antd';
import { 
  SwapOutlined, 
  SearchOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  FilterOutlined, 
  InfoCircleOutlined, 
  CheckCircleOutlined, 
  CreditCardOutlined,
  BankOutlined,
  RocketOutlined,
  StarOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';
import Reviews from '../components/Reviews';
import countryCodes from '../data/countryCodes';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// Thai airports data
const thaiAirports = [
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok' },
  { code: 'DMK', name: 'Don Mueang International Airport', city: 'Bangkok' },
  { code: 'CNX', name: 'Chiang Mai International Airport', city: 'Chiang Mai' },
  { code: 'HKT', name: 'Phuket International Airport', city: 'Phuket' },
  { code: 'KBV', name: 'Krabi International Airport', city: 'Krabi' },
  { code: 'USM', name: 'Samui International Airport', city: 'Koh Samui' },
  { code: 'CEI', name: 'Chiang Rai International Airport', city: 'Chiang Rai' },
  { code: 'HDY', name: 'Hat Yai International Airport', city: 'Hat Yai' },
];

// International airports data
const internationalAirports = [
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
];

// Airlines data
const airlines = ['Thai Airways', 'Bangkok Airways', 'Thai Lion Air', 'AirAsia', 'Nok Air', 'Singapore Airlines', 'Emirates', 'Cathay Pacific', 'Japan Airlines', 'Korean Air'];

// Function to generate random flight number
const generateFlightNumber = (airline) => {
  const prefix = airline.substring(0, 2).toUpperCase();
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}${number}`;
};

// Function to generate random price
const generatePrice = (international) => {
  const basePrice = international ? 10000 : 2000;
  const variance = international ? 15000 : 3000;
  return Math.floor(basePrice + Math.random() * variance);
};

const FlightPage = () => {
  const [form] = Form.useForm();
  const [passengerForm] = Form.useForm();
  const [tripType, setTripType] = useState('oneway');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSwapAirports = () => {
    const fromAirport = form.getFieldValue('fromAirport');
    const toAirport = form.getFieldValue('toAirport');
    
    form.setFieldsValue({
      fromAirport: toAirport,
      toAirport: fromAirport
    });
  };

  const handleSearch = () => {
    form.validateFields()
      .then(values => {
        // Check if origin and destination are the same
        if (values.fromAirport === values.toAirport) {
          openNotification(
            'error',
            'Invalid Route',
            'Origin and destination cannot be the same. Please select different airports.'
          );
          return;
        }
        
        setLoading(true);
        setSearchCompleted(false);
        setCurrentStep(0);
        setSelectedFlight(null);
        
        // Simulate API call
        setTimeout(() => {
          const fromAirport = thaiAirports.find(airport => airport.code === values.fromAirport);
          const toAirport = [...thaiAirports, ...internationalAirports].find(airport => airport.code === values.toAirport);
          const isInternational = internationalAirports.some(airport => airport.code === values.toAirport);
          
          // Generate random flights
          const generatedFlights = [];
          const flightCount = Math.floor(Math.random() * 5) + 3; // 3-7 flights
          
          for (let i = 0; i < flightCount; i++) {
            const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
            const departureHour = 6 + Math.floor(Math.random() * 16); // 6 AM to 10 PM
            const departureMins = Math.floor(Math.random() * 60);
            const flightDuration = isInternational ? 
              Math.floor(Math.random() * 5) + 2 : // 2-6 hours for international
              Math.floor(Math.random() * 2) + 1;  // 1-2 hours for domestic
            
            const arrivalHour = (departureHour + flightDuration) % 24;
            const arrivalMins = departureMins;
            
            // Generate random aircraft type
            const aircraftTypes = ["Boeing 737-800", "Airbus A320", "Boeing 777-300ER", "Airbus A350-900", "Boeing 787-9"];
            const randomAircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];
            
            // Generate amenities
            const amenities = [];
            if (Math.random() > 0.5) amenities.push("Wi-Fi");
            if (Math.random() > 0.5) amenities.push("In-flight Entertainment");
            if (Math.random() > 0.7) amenities.push("Power Outlets");
            if (Math.random() > 0.6) amenities.push("Complimentary Meal");
            
            generatedFlights.push({
              id: i + 1,
              airline: randomAirline,
              flightNumber: generateFlightNumber(randomAirline),
              departure: {
                airport: fromAirport,
                time: `${departureHour.toString().padStart(2, '0')}:${departureMins.toString().padStart(2, '0')}`,
                terminal: Math.floor(Math.random() * 3) + 1,
                gate: String.fromCharCode(65 + Math.floor(Math.random() * 20)) + Math.floor(Math.random() * 20)
              },
              arrival: {
                airport: toAirport,
                time: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMins.toString().padStart(2, '0')}`,
                terminal: Math.floor(Math.random() * 3) + 1,
                gate: String.fromCharCode(65 + Math.floor(Math.random() * 20)) + Math.floor(Math.random() * 20)
              },
              duration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
              price: generatePrice(isInternational),
              stops: Math.random() > 0.7 ? 1 : 0, // 30% chance of having 1 stop
              aircraft: randomAircraft,
              amenities: amenities,
              seatsAvailable: Math.floor(Math.random() * 50) + 10,
              baggage: {
                carryon: "7 kg",
                checked: isInternational ? "30 kg" : "20 kg"
              },
              refundable: Math.random() > 0.7,
              discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0
            });
          }
          
          // Sort flights by price
          generatedFlights.sort((a, b) => a.price - b.price);
          
          setFlights(generatedFlights);
          setLoading(false);
          setSearchCompleted(true);
          
          openNotification(
            'success', 
            'Flights found!', 
            `We found ${flightCount} flights from ${fromAirport.city} to ${toAirport.city} on the selected date.`
          );
        }, 1500);
      });
  };

  const selectFlight = (flight) => {
    setSelectedFlight(flight);
    setCurrentStep(1);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Booking Steps */}
      {searchCompleted && (
        <Card style={{ marginBottom: '24px' }}>
          <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
            <Step title="Select Flight" description="Choose your preferred flight" />
            <Step title="Passenger Details" description="Fill in passenger information" disabled={!selectedFlight} />
            <Step title="Payment" description="Complete your payment" disabled={!selectedFlight || currentStep < 1} />
            <Step title="Confirmation" description="Booking confirmed" disabled={!selectedFlight || currentStep < 2} />
          </Steps>
        </Card>
      )}

      {/* Search Form Card */}
      <Card>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <RocketOutlined style={{ marginRight: '10px' }} /> Search for Flights
        </Title>
        
        <Form form={form} layout="vertical" initialValues={{ tripType: 'oneway' }}>
          <div style={{ marginBottom: '16px' }}>
            <Radio.Group 
              value={tripType} 
              onChange={(e) => setTripType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="oneway">One Way</Radio.Button>
              <Radio.Button value="roundtrip">Round Trip</Radio.Button>
              <Radio.Button value="multicity">Multi-City</Radio.Button>
            </Radio.Group>
          </div>
          
          <div style={{ display: 'flex', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item 
              name="fromAirport" 
              label={
                <span>
                  From <Tooltip title="Select departure airport"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please select departure airport' }]}
              style={{ flex: 1, minWidth: '240px' }}
            >
              <Select
                showSearch
                placeholder="Select departure airport"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                size="large"
              >
                {thaiAirports.map(airport => (
                  <Option key={airport.code} value={airport.code}>
                    {airport.city} - {airport.name} ({airport.code})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '28px' }}>
              <Button 
                type="primary" 
                shape="circle" 
                icon={<SwapOutlined />} 
                onClick={handleSwapAirports}
                style={{ background: '#1890ff' }}
                size="large"
              />
            </div>
            
            <Form.Item 
              name="toAirport" 
              label={
                <span>
                  To <Tooltip title="Select arrival airport"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                </span>
              }
              rules={[
                { required: true, message: 'Please select arrival airport' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('fromAirport') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Origin and destination cannot be the same'));
                  },
                }),
              ]}
              style={{ flex: 1, minWidth: '240px' }}
            >
              <Select
                showSearch
                placeholder="Select arrival airport"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                size="large"
              >
                {[...thaiAirports, ...internationalAirports].map(airport => (
                  <Option key={airport.code} value={airport.code}>
                    {airport.city} - {airport.name} ({airport.code})
                    {airport.country && ` - ${airport.country}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <div style={{ display: 'flex', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item 
              name="departDate" 
              label={
                <span>
                  Departure Date <Tooltip title="Select your travel date"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please select departure date' }]}
              style={{ flex: 1, minWidth: '240px' }}
            >
              <DatePicker style={{ width: '100%' }} size="large" format="YYYY-MM-DD" />
            </Form.Item>
            
            {tripType === 'roundtrip' && (
              <Form.Item 
                name="returnDate" 
                label={
                  <span>
                    Return Date <Tooltip title="Select your return date"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                  </span>
                }
                rules={[{ required: tripType === 'roundtrip', message: 'Please select return date' }]}
                style={{ flex: 1, minWidth: '240px' }}
              >
                <DatePicker style={{ width: '100%' }} size="large" format="YYYY-MM-DD" />
              </Form.Item>
            )}
            
            <Form.Item 
              name="passengers" 
              label={
                <span>
                  Passengers <Tooltip title="Select number of passengers"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                </span>
              }
              initialValue="1 Adult"
              style={{ flex: 1, minWidth: '240px' }}
            >
              <Select size="large">
                <Option value="1 Adult">1 Adult</Option>
                <Option value="2 Adults">2 Adults</Option>
                <Option value="3 Adults">3 Adults</Option>
                <Option value="4 Adults">4 Adults</Option>
                <Option value="1 Adult, 1 Child">1 Adult, 1 Child</Option>
                <Option value="2 Adults, 1 Child">2 Adults, 1 Child</Option>
                <Option value="2 Adults, 2 Children">2 Adults, 2 Children</Option>
              </Select>
            </Form.Item>
          </div>
          
          <div style={{ display: 'flex', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item
              name="cabinClass"
              label="Cabin Class"
              initialValue="Economy"
              style={{ flex: 1, minWidth: '240px' }}
            >
              <Select size="large">
                <Option value="Economy">Economy</Option>
                <Option value="Premium Economy">Premium Economy</Option>
                <Option value="Business">Business</Option>
                <Option value="First Class">First Class</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="preferredAirline"
              label="Preferred Airline (Optional)"
              style={{ flex: 1, minWidth: '240px' }}
            >
              <Select size="large" allowClear placeholder="Any Airline">
                {airlines.map(airline => (
                  <Option key={airline} value={airline}>{airline}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <Form.Item>
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={handleSearch} 
              loading={loading}
              size="large"
              style={{ width: '100%', height: '48px', fontSize: '16px', background: '#1890ff' }}
            >
              Search Flights
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      {/* Flight Selection Step */}
      {searchCompleted && currentStep === 0 && (
        <div style={{ marginTop: '24px' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Title level={4} style={{ margin: 0 }}>
                Available Flights
              </Title>
              
              <div>
                <Button icon={<FilterOutlined />}>
                  Filter
                </Button>
              </div>
            </div>
            
            {loading ? (
              <div>
                {[1, 2, 3].map(item => (
                  <Card key={item} style={{ marginBottom: '16px' }}>
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {flights.length === 0 ? (
                  <Alert 
                    type="info" 
                    message="No Flights Found" 
                    description="Please try different search criteria or dates." 
                    showIcon 
                  />
                ) : (
                  <List
                    itemLayout="vertical"
                    dataSource={flights}
                    renderItem={flight => (
                      <Card 
                        style={{ 
                          marginBottom: '16px', 
                          borderLeft: flight.discount > 0 ? '4px solid #f5222d' : 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
                        }}
                        hoverable
                      >
                        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
                          <div style={{ minWidth: '200px' }}>
                            <div style={{ marginBottom: '12px' }}>
                              <Text strong style={{ fontSize: '16px' }}>{flight.airline}</Text>
                              <div style={{ marginTop: '4px' }}>
                                <Tag color="blue">{flight.flightNumber}</Tag>
                                {flight.stops === 0 ? 
                                  <Tag color="green">Direct</Tag> : 
                                  <Tag color="orange">{flight.stops} Stop</Tag>
                                }
                                {flight.seatsAvailable < 20 && (
                                  <Tag color="red">Only {flight.seatsAvailable} seats left</Tag>
                                )}
                              </div>
                              <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                                <div>Aircraft: {flight.aircraft}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ flex: 1, minWidth: '300px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div>
                                <Text strong style={{ fontSize: '20px' }}>{flight.departure.time}</Text>
                                <div style={{ fontSize: '14px' }}>{flight.departure.airport.code}</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Terminal {flight.departure.terminal}, Gate {flight.departure.gate}</div>
                                <div style={{ fontSize: '14px' }}>{flight.departure.airport.city}</div>
                              </div>
                              
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: '#666', fontSize: '13px' }}>
                                  <ClockCircleOutlined /> {flight.duration}
                                </div>
                                <div style={{ width: '120px', height: '2px', background: '#1890ff', margin: '8px 0', position: 'relative' }}>
                                  <div style={{ 
                                    position: 'absolute', 
                                    left: '0', 
                                    top: '-4px', 
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    background: '#1890ff' 
                                  }} />
                                  <div style={{ 
                                    position: 'absolute', 
                                    right: '0', 
                                    top: '-4px', 
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    background: '#1890ff' 
                                  }} />
                                </div>
                                <div style={{ color: '#666', fontSize: '13px' }}>
                                  {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop`}
                                </div>
                              </div>
                              
                              <div style={{ textAlign: 'right' }}>
                                <Text strong style={{ fontSize: '20px' }}>{flight.arrival.time}</Text>
                                <div style={{ fontSize: '14px' }}>{flight.arrival.airport.code}</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>Terminal {flight.arrival.terminal}, Gate {flight.arrival.gate}</div>
                                <div style={{ fontSize: '14px' }}>{flight.arrival.airport.city}</div>
                              </div>
                            </div>
                            
                            <Divider style={{ margin: '12px 0' }} />
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              <div style={{ fontSize: '13px', color: '#666' }}>
                                <Text strong>Baggage:</Text> Carry-on {flight.baggage.carryon}, Checked {flight.baggage.checked}
                              </div>
                              
                              <Divider type="vertical" />
                              
                              <div style={{ fontSize: '13px', color: '#666' }}>
                                <Text strong>Amenities:</Text> {flight.amenities.join(', ')}
                              </div>
                              
                              {flight.refundable && (
                                <>
                                  <Divider type="vertical" />
                                  <div style={{ fontSize: '13px', color: '#52c41a' }}>
                                    <CheckCircleOutlined /> Refundable
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                            {flight.discount > 0 && (
                              <Badge.Ribbon text={`${flight.discount}% OFF`} color="red">
                                <div style={{ height: '20px' }}></div>
                              </Badge.Ribbon>
                            )}
                            
                            <div>
                              {flight.discount > 0 && (
                                <Text delete style={{ color: '#999', fontSize: '16px' }}>
                                  ฿{Math.floor(flight.price / (1 - flight.discount / 100)).toLocaleString()}
                                </Text>
                              )}
                              <Text strong style={{ fontSize: '24px', color: '#1890ff', display: 'block' }}>
                                ฿{flight.price.toLocaleString()}
                              </Text>
                              <div style={{ color: '#999', fontSize: '13px', marginBottom: '12px' }}>per passenger</div>
                            </div>
                            
                            <Button 
                              type="primary" 
                              size="large"
                              onClick={() => selectFlight(flight)}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  />
                )}
              </>
            )}
          </Card>
        </div>
      )}
      
      {/* Passenger Details Step */}
      {selectedFlight && currentStep === 1 && (
        <div style={{ marginTop: '24px' }}>
          <Card>
            <Title level={4} style={{ marginBottom: '24px' }}>
              <UserOutlined /> Passenger Details
            </Title>
            
            <div style={{ marginBottom: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
              <Title level={5} style={{ marginBottom: '16px' }}>Your Selected Flight</Title>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  <Text strong>{selectedFlight?.airline} - {selectedFlight?.flightNumber}</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{selectedFlight?.departure?.airport?.city} to {selectedFlight?.arrival?.airport?.city}</Text>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text strong>
                    {selectedFlight?.departure?.time} - {selectedFlight?.arrival?.time}
                  </Text>
                  <div style={{ marginTop: '8px', color: '#666' }}>
                    Duration: {selectedFlight?.duration}
                  </div>
                </div>
              </div>
            </div>
            
            <Form layout="vertical" form={passengerForm} initialValues={{ countryCode: "+66" }}>
              <Title level={5} style={{ marginBottom: '16px' }}>Passenger 1 (Adult)</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please select title' }]}
                  >
                    <Select placeholder="Select title">
                      <Option value="mr">Mr.</Option>
                      <Option value="mrs">Mrs.</Option>
                      <Option value="ms">Ms.</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name' }]}
                  >
                    <Input placeholder="First name as in passport/ID" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter last name' }]}
                  >
                    <Input placeholder="Last name as in passport/ID" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="Email for ticket confirmation" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input 
                      addonBefore={
                        <Form.Item name="countryCode" noStyle initialValue="+66">
                          <Select 
                            style={{ width: 120 }} 
                            dropdownMatchSelectWidth={false}
                            optionLabelProp="label"
                          >
                            {countryCodes.map((country) => (
                              <Option 
                                key={country.code} 
                                value={country.code} 
                                label={`${country.flag} ${country.code}`}
                              >
                                <Space>
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                  <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{country.country}</span>
                                </Space>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      } 
                      placeholder="Phone number" 
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider />
              
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  onClick={() => setCurrentStep(0)}
                >
                  Back to Flights
                </Button>
                <Button 
                  type="primary" 
                  onClick={() => {
                    passengerForm.validateFields().then(() => {
                      setCurrentStep(2);
                    });
                  }}
                >
                  Continue to Payment
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}
      
      {/* Payment Step */}
      {selectedFlight && currentStep === 2 && (
        <div style={{ marginTop: '24px' }}>
          <Card>
            <Title level={4} style={{ marginBottom: '24px' }}>
              <CreditCardOutlined /> Payment
            </Title>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} md={16}>
                <Card title="Payment Method" style={{ marginBottom: '24px' }}>
                  <Form layout="vertical">
                    <Form.Item name="paymentMethod" initialValue="card">
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio value="card">
                            <Space>
                              <CreditCardOutlined /> Credit/Debit Card
                            </Space>
                          </Radio>
                          <Radio value="bank">
                            <Space>
                              <BankOutlined /> Bank Transfer
                            </Space>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    
                    <div style={{ marginTop: '24px' }}>
                      <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[{ required: true, message: 'Please enter card number' }]}
                      >
                        <Input placeholder="Card number" />
                      </Form.Item>
                      
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="expiryDate"
                            label="Expiry Date"
                            rules={[{ required: true, message: 'Please enter expiry date' }]}
                          >
                            <Input placeholder="MM/YY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="cvv"
                            label="CVV"
                            rules={[{ required: true, message: 'Please enter CVV' }]}
                          >
                            <Input placeholder="CVV" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Form.Item
                        name="cardholderName"
                        label="Cardholder Name"
                        rules={[{ required: true, message: 'Please enter cardholder name' }]}
                      >
                        <Input placeholder="Name on card" />
                      </Form.Item>
                    </div>
                  </Form>
                </Card>
                
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    onClick={() => setCurrentStep(1)}
                  >
                    Back to Passenger Details
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={() => setCurrentStep(3)}
                  >
                    Complete Payment
                  </Button>
                </div>
              </Col>
              
              <Col xs={24} md={8}>
                <Card title="Price Summary" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text>Base Fare</Text>
                    <Text>฿{(selectedFlight?.price * 0.9).toFixed(0)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text>Taxes & Fees</Text>
                    <Text>฿{(selectedFlight?.price * 0.1).toFixed(0)}</Text>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <Text strong>Total</Text>
                    <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>฿{selectedFlight?.price.toLocaleString()}</Text>
                  </div>
                </Card>
                
                <Alert
                  message="Secure Payment"
                  description="All payment information is encrypted and secure."
                  type="info"
                  showIcon
                />
              </Col>
            </Row>
          </Card>
        </div>
      )}
      
      {/* Confirmation Step */}
      {selectedFlight && currentStep === 3 && (
        <div style={{ marginTop: '24px' }}>
          <Card>
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ 
                fontSize: '64px', 
                color: '#52c41a',
                margin: '0 auto 24px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#f6ffed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #b7eb8f'
              }}>
                <CheckCircleOutlined />
              </div>
              
              <Title level={3} style={{ color: '#52c41a', marginBottom: '16px' }}>
                Booking Confirmed!
              </Title>
              
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                Your booking has been confirmed and your ticket has been sent to your email.
              </Paragraph>
              
              <div style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '8px', 
                display: 'inline-block',
                marginBottom: '24px'
              }}>
                <Text strong style={{ fontSize: '16px' }}>Booking Reference: </Text>
                <Text style={{ fontSize: '16px' }}>{`TW${Math.floor(10000000 + Math.random() * 90000000)}`}</Text>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <Paragraph>
                  <Text style={{ fontSize: '16px' }}>
                    Please check your email for your e-ticket and booking details.
                  </Text>
                </Paragraph>
              </div>
              
              <Button type="primary" size="large" onClick={() => window.location.reload()}>
                Book Another Flight
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Popular Destinations */}
      {!searchCompleted && (
        <div style={{ marginTop: '24px' }}>
          <Card>
            <Title level={4} style={{ marginBottom: '16px' }}>
              <StarOutlined style={{ marginRight: '8px' }} /> Popular Destinations
            </Title>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Card 
                  hoverable 
                  cover={
                    <img 
                      alt="Tokyo" 
                      src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                      style={{ height: '160px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta 
                    title="Tokyo" 
                    description={
                      <div>
                        <div>Starting from <Text strong style={{ color: '#1890ff' }}>฿15,000</Text></div>
                        <div style={{ marginTop: '8px' }}>
                          <Tag color="blue">Top Destination</Tag>
                        </div>
                      </div>
                    } 
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card 
                  hoverable 
                  cover={
                    <img 
                      alt="Singapore" 
                      src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                      style={{ height: '160px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta 
                    title="Singapore" 
                    description={
                      <div>
                        <div>Starting from <Text strong style={{ color: '#1890ff' }}>฿8,500</Text></div>
                        <div style={{ marginTop: '8px' }}>
                          <Tag color="green">Special Offer</Tag>
                        </div>
                      </div>
                    } 
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card 
                  hoverable 
                  cover={
                    <img 
                      alt="Seoul" 
                      src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                      style={{ height: '160px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta 
                    title="Seoul" 
                    description={
                      <div>
                        <div>Starting from <Text strong style={{ color: '#1890ff' }}>฿12,200</Text></div>
                        <div style={{ marginTop: '8px' }}>
                          <Tag color="volcano">Hot Deal</Tag>
                        </div>
                      </div>
                    } 
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      )}

      {/* Add Reviews section after the flight search */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 24px'
      }}>
        <Reviews />
      </div>
    </div>
  );
};

export default FlightPage;
