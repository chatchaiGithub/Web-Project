import React, { useState } from 'react';
import { Card, Input, Button, Typography, Form, Space, Row, Col, Timeline, Badge, Divider, Collapse, Alert, Skeleton, Tabs, Statistic, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  CheckCircleOutlined, 
  InfoCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  RocketOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const CheckFlightPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState(null);
  const [flightNotFound, setFlightNotFound] = useState(false);

  const handleSearch = () => {
    form.validateFields().then(values => {
      setLoading(true);
      setFlightData(null);
      setFlightNotFound(false);
      
      // Simulate API call
      setTimeout(() => {
        if (values.flightNumber.match(/^[A-Z]{2}\d{4}$/)) {
          // Generate random flight data
          const flightStatuses = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived'];
          const randomStatus = flightStatuses[Math.floor(Math.random() * flightStatuses.length)];
          
          const flightInfo = {
            flightNumber: values.flightNumber,
            airline: getAirlineName(values.flightNumber.substring(0, 2)),
            status: randomStatus,
            departure: {
              airport: 'Suvarnabhumi Airport (BKK)',
              city: 'Bangkok',
              terminal: Math.floor(Math.random() * 3) + 1,
              gate: String.fromCharCode(65 + Math.floor(Math.random() * 20)) + Math.floor(Math.random() * 20),
              scheduledTime: '10:30',
              actualTime: randomStatus === 'Delayed' ? '11:15' : '10:30',
              date: '2023-07-15'
            },
            arrival: {
              airport: 'Changi Airport (SIN)',
              city: 'Singapore',
              terminal: Math.floor(Math.random() * 3) + 1,
              gate: String.fromCharCode(65 + Math.floor(Math.random() * 20)) + Math.floor(Math.random() * 20),
              scheduledTime: '14:00',
              actualTime: randomStatus === 'Delayed' ? '14:45' : '14:00',
              date: '2023-07-15'
            },
            aircraft: 'Boeing 787-9 Dreamliner',
            duration: '3h 30m',
            statusUpdates: [
              { time: '08:30', status: 'Check-in Open', completed: true },
              { time: '09:45', status: 'Boarding Pass Issued', completed: true },
              { time: '10:00', status: 'Security Check', completed: randomStatus !== 'On Time' },
              { time: '10:15', status: 'Boarding', completed: ['Departed', 'Arrived'].includes(randomStatus) },
              { time: '10:30', status: 'Departure', completed: ['Departed', 'Arrived'].includes(randomStatus) },
              { time: '14:00', status: 'Arrival', completed: randomStatus === 'Arrived' }
            ],
            baggageClaim: 'Belt 12'
          };
          
          setFlightData(flightInfo);
          
          openNotification(
            'success',
            'Flight found',
            `Flight ${values.flightNumber} status: ${randomStatus}`
          );
        } else {
          setFlightNotFound(true);
          openNotification(
            'error',
            'Flight not found',
            `We couldn't find flight ${values.flightNumber}. Please check the flight number and try again.`
          );
        }
        setLoading(false);
      }, 1500);
    });
  };
  
  // Helper function to get airline name from code
  const getAirlineName = (code) => {
    const airlines = {
      'TG': 'Thai Airways',
      'SQ': 'Singapore Airlines',
      'CX': 'Cathay Pacific',
      'JL': 'Japan Airlines',
      'KE': 'Korean Air',
      'FD': 'Thai AirAsia',
      'TR': 'Scoot',
      'VZ': 'Thai Vietjet',
      'DD': 'Nok Air',
      'PG': 'Bangkok Airways'
    };
    
    return airlines[code] || `${code} Airlines`;
  };
  
  // Function to render status badge
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'On Time':
        return <Badge status="success" text={<Text strong style={{ color: '#52c41a' }}>{status}</Text>} />;
      case 'Delayed':
        return <Badge status="warning" text={<Text strong style={{ color: '#faad14' }}>{status}</Text>} />;
      case 'Boarding':
        return <Badge status="processing" text={<Text strong style={{ color: '#1890ff' }}>{status}</Text>} />;
      case 'Departed':
        return <Badge status="processing" text={<Text strong style={{ color: '#1890ff' }}>{status}</Text>} />;
      case 'Arrived':
        return <Badge status="success" text={<Text strong style={{ color: '#52c41a' }}>{status}</Text>} />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <FileSearchOutlined style={{ marginRight: '10px' }} /> Check Flight Status
        </Title>
        
        <Paragraph style={{ marginBottom: '24px' }}>
          Enter your flight number to check the current status of your flight. Get real-time updates on departures, arrivals, and any delays.
        </Paragraph>
        
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={16}>
              <Form.Item
                name="flightNumber"
                label={
                  <span>
                    Flight Number <Tooltip title="Enter airline code followed by flight number (e.g., TG123)"><InfoCircleOutlined style={{ color: '#1890ff' }} /></Tooltip>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter a flight number' },
                  { 
                    pattern: /^[A-Z0-9]{2,}\d{1,4}$/, 
                    message: 'Please enter a valid flight number (e.g., TG123, SQ1234)' 
                  }
                ]}
              >
                <Input 
                  prefix={<RocketOutlined style={{ color: '#1890ff' }} />}
                  placeholder="Enter flight number (e.g., TG123)" 
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label=" " style={{ marginTop: '4px' }}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  loading={loading}
                  size="large"
                  style={{ width: '100%', height: '40px' }}
                >
                  Check Flight Status
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
        {loading && (
          <div style={{ marginTop: '24px' }}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        )}
        
        {flightNotFound && !loading && (
          <Alert
            message="Flight Not Found"
            description="We couldn't find the flight you're looking for. Please check the flight number and try again."
            type="error"
            showIcon
            icon={<CloseCircleOutlined />}
            style={{ marginTop: '24px' }}
          />
        )}
        
        {flightData && !loading && (
          <div style={{ marginTop: '24px' }}>
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: '18px' }}>{flightData.airline} - {flightData.flightNumber}</Text>
                  </div>
                  <div>
                    {renderStatusBadge(flightData.status)}
                  </div>
                </div>
              }
              style={{ marginBottom: '24px' }}
              extra={
                <Button 
                  type="text" 
                  icon={<BellOutlined />} 
                  onClick={() => {
                    openNotification(
                      'success',
                      'Notification Enabled',
                      `You will now receive real-time updates about ${flightData.airline} flight ${flightData.flightNumber}. We'll notify you of any changes to the flight status.`
                    );
                  }}
                >
                  Subscribe to Updates
                </Button>
              }
            >
              <Tabs defaultActiveKey="1">
                <TabPane 
                  tab={
                    <span>
                      <InfoCircleOutlined /> Flight Info
                    </span>
                  } 
                  key="1"
                >
                  <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} md={12}>
                      <Card 
                        title={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <EnvironmentOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                            <span>Departure</span>
                          </div>
                        } 
                        style={{ height: '100%' }}
                        bordered={false}
                        className="inner-card"
                      >
                        <div style={{ marginBottom: '12px' }}>
                          <Text style={{ fontSize: '16px', display: 'block' }}>{flightData.departure.airport}</Text>
                          <Text type="secondary">{flightData.departure.city}</Text>
                        </div>
                        
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Scheduled Time</Text>
                              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {flightData.departure.scheduledTime}
                              </div>
                            </div>
                          </Col>
                          
                          {flightData.status === 'Delayed' && (
                            <Col span={12}>
                              <div>
                                <Text type="secondary">Expected Time</Text>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#faad14' }}>
                                  {flightData.departure.actualTime}
                                </div>
                              </div>
                            </Col>
                          )}
                        </Row>
                        
                        <Divider style={{ margin: '12px 0' }} />
                        
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Terminal</Text>
                              <div>{flightData.departure.terminal}</div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Gate</Text>
                              <div>{flightData.departure.gate}</div>
                            </div>
                          </Col>
                        </Row>
                        
                        <div style={{ marginTop: '16px' }}>
                          <Text type="secondary">Date</Text>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarOutlined style={{ marginRight: '8px' }} />
                            {flightData.departure.date}
                          </div>
                        </div>
                      </Card>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Card 
                        title={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <EnvironmentOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                            <span>Arrival</span>
                          </div>
                        } 
                        style={{ height: '100%' }}
                        bordered={false}
                        className="inner-card"
                      >
                        <div style={{ marginBottom: '12px' }}>
                          <Text style={{ fontSize: '16px', display: 'block' }}>{flightData.arrival.airport}</Text>
                          <Text type="secondary">{flightData.arrival.city}</Text>
                        </div>
                        
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Scheduled Time</Text>
                              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {flightData.arrival.scheduledTime}
                              </div>
                            </div>
                          </Col>
                          
                          {flightData.status === 'Delayed' && (
                            <Col span={12}>
                              <div>
                                <Text type="secondary">Expected Time</Text>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#faad14' }}>
                                  {flightData.arrival.actualTime}
                                </div>
                              </div>
                            </Col>
                          )}
                        </Row>
                        
                        <Divider style={{ margin: '12px 0' }} />
                        
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Terminal</Text>
                              <div>{flightData.arrival.terminal}</div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <Text type="secondary">Gate</Text>
                              <div>{flightData.arrival.gate}</div>
                            </div>
                          </Col>
                        </Row>
                        
                        <div style={{ marginTop: '16px' }}>
                          <Text type="secondary">Date</Text>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarOutlined style={{ marginRight: '8px' }} />
                            {flightData.arrival.date}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                      <Statistic 
                        title="Flight Duration" 
                        value={flightData.duration} 
                        prefix={<ClockCircleOutlined />} 
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Statistic 
                        title="Aircraft" 
                        value={flightData.aircraft} 
                        prefix={<RocketOutlined />} 
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Statistic 
                        title="Baggage Claim" 
                        value={flightData.baggageClaim} 
                      />
                    </Col>
                  </Row>
                </TabPane>
                
                <TabPane 
                  tab={
                    <span>
                      <ClockCircleOutlined /> Flight Status
                    </span>
                  } 
                  key="2"
                >
                  <Timeline mode="left">
                    {flightData.statusUpdates.map((update, index) => (
                      <Timeline.Item 
                        key={index}
                        color={update.completed ? 'green' : 'gray'}
                        label={update.time}
                      >
                        <div style={{ fontWeight: update.completed ? 'bold' : 'normal' }}>
                          {update.status}
                          {update.completed && (
                            <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                          )}
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                  
                  {flightData.status === 'Delayed' && (
                    <Alert
                      message="Flight Delay Information"
                      description="This flight is currently delayed. The new departure time is estimated to be 11:15. We apologize for any inconvenience."
                      type="warning"
                      showIcon
                      style={{ marginTop: '16px' }}
                    />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </div>
        )}
      </Card>
      
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card title={<span><UserOutlined /> Passenger Tips</span>}>
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="When should I arrive at the airport?" key="1">
                <Paragraph>
                  For domestic flights, we recommend arriving at least 2 hours before your scheduled departure time. For international flights, please arrive at least 3 hours before departure to allow time for check-in, security screening, and boarding procedures.
                </Paragraph>
              </Panel>
              
              <Panel header="What should I do if my flight is delayed?" key="2">
                <Paragraph>
                  If your flight is delayed, please check with the airline staff at the airport for the most up-to-date information. You can also use our flight status checker for real-time updates. Most airlines will accommodate passengers on delayed flights with refreshments or meal vouchers for extended delays.
                </Paragraph>
              </Panel>
              
              <Panel header="How do I track my baggage?" key="3">
                <Paragraph>
                  Most airlines provide baggage tracking services through their websites or mobile apps. You'll need your baggage tag number, which is printed on the stub attached to your boarding pass or bag tag. If your baggage is delayed or lost, please contact the airline's baggage service counter at the airport.
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card title={<span><InfoCircleOutlined /> Frequently Asked Questions</span>}>
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="How often is flight status updated?" key="1">
                <Paragraph>
                  Our flight status information is updated in real-time as we receive information from airlines and airports. Status changes are typically available immediately after they are announced by the airline.
                </Paragraph>
              </Panel>
              
              <Panel header="Can I get notifications for flight status changes?" key="2">
                <Paragraph>
                  Yes! Click the "Subscribe to Updates" button on the flight information page, and you can receive notifications via email or SMS about any changes to your flight status, including delays, gate changes, or cancellations.
                </Paragraph>
              </Panel>
              
              <Panel header="What does 'Boarding' status mean?" key="3">
                <Paragraph>
                  When a flight shows 'Boarding' status, it means passengers are currently being allowed to board the aircraft. This typically begins about 30-45 minutes before the scheduled departure time for domestic flights and 45-60 minutes for international flights.
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckFlightPage;
