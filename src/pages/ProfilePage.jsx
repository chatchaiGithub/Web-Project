import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  Row, 
  Col, 
  List, 
  Tag, 
  Badge, 
  Divider, 
  Statistic, 
  Timeline, 
  Space, 
  Alert, 
  Modal
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  EditOutlined, 
  CreditCardOutlined, 
  SafetyCertificateOutlined, 
  HistoryOutlined, 
  SettingOutlined, 
  HeartOutlined, 
  UploadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  LockOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { openNotification } from '../components/Notification';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock travel history data
const travelHistory = [
  {
    id: 'BKK-SIN-1234',
    from: 'Bangkok (BKK)',
    to: 'Singapore (SIN)',
    date: '2023-09-15',
    airline: 'Thai Airways',
    status: 'Completed',
    price: '3,450 THB',
  },
  {
    id: 'BKK-HKT-5678',
    from: 'Bangkok (BKK)',
    to: 'Phuket (HKT)',
    date: '2023-08-22',
    airline: 'AirAsia',
    status: 'Completed',
    price: '1,230 THB',
  },
  {
    id: 'CNX-BKK-9012',
    from: 'Chiang Mai (CNX)',
    to: 'Bangkok (BKK)',
    date: '2023-07-05',
    airline: 'Nok Air',
    status: 'Completed',
    price: '1,560 THB',
  },
];

// Mock saved destinations
const savedDestinations = [
  { name: 'Tokyo, Japan', code: 'TYO', saved: '2023-10-01' },
  { name: 'Bali, Indonesia', code: 'DPS', saved: '2023-09-20' },
  { name: 'Seoul, South Korea', code: 'ICN', saved: '2023-09-15' },
  { name: 'Phuket, Thailand', code: 'HKT', saved: '2023-08-30' },
];

// Mock payment methods
const paymentMethods = [
  { 
    type: 'Credit Card', 
    name: 'Visa ending in 4567', 
    expiry: '05/25', 
    isDefault: true 
  },
  { 
    type: 'Credit Card', 
    name: 'Mastercard ending in 8901', 
    expiry: '10/24', 
    isDefault: false 
  },
  { 
    type: 'Saved Account', 
    name: 'Bangkok Bank', 
    accountNumber: '****5678', 
    isDefault: false 
  },
];

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+66 89 123 4567',
    address: '123 Sukhumvit Road, Bangkok, Thailand',
    dateJoined: 'September 2022',
    memberLevel: 'Gold',
    loyaltyPoints: 2450,
    passwordLastChanged: '2023-08-15',
  });

  const handleEdit = () => {
    form.setFieldsValue(userData);
    setEditing(true);
  };

  const handleSave = (values) => {
    setUserData({
      ...userData,
      ...values,
    });
    setEditing(false);
    openNotification({
      message: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
      type: 'success',
    });
  };

  const handlePasswordChange = (values) => {
    passwordForm.resetFields();
    setChangePasswordVisible(false);
    openNotification({
      message: 'Password Changed',
      description: 'Your password has been successfully updated.',
      type: 'success',
    });
  };

  const handleDeletePaymentMethod = (index) => {
    Modal.confirm({
      title: 'Remove Payment Method',
      content: 'Are you sure you want to remove this payment method?',
      okText: 'Yes, Remove',
      cancelText: 'Cancel',
      onOk: () => {
        openNotification({
          message: 'Payment Method Removed',
          description: 'The payment method has been successfully removed from your account.',
          type: 'success',
        });
      },
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
        <UserOutlined style={{ marginRight: '12px' }} />
        My Profile
      </Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
          <Card 
            className="profile-card"
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src="https://randomuser.me/api/portraits/men/32.jpg"
                style={{ 
                  border: '4px solid #1890ff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Upload showUploadList={false}>
                <Button 
                  icon={<UploadOutlined />} 
                  type="link"
                  style={{ marginTop: '8px' }}
                >
                  Change Photo
                </Button>
              </Upload>
            </div>
            
            <Title level={4} style={{ textAlign: 'center', margin: '0 0 4px' }}>
              {userData.firstName} {userData.lastName}
            </Title>
            
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Tag color="gold" style={{ borderRadius: '12px', padding: '4px 12px' }}>
                {userData.memberLevel} Member
              </Tag>
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div style={{ marginBottom: '8px' }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>Member since</Text>
              <div>{userData.dateJoined}</div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>Email</Text>
              <div>{userData.email}</div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>Phone</Text>
              <div>{userData.phone}</div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>Loyalty Points</Text>
              <div>
                <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>{userData.loyaltyPoints}</span> points
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={16} lg={18} xl={18}>
          <Card 
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              marginBottom: '24px'
            }}
          >
            <Tabs defaultActiveKey="1" size="large">
              <TabPane 
                tab={
                  <span>
                    <UserOutlined />
                    Personal Information
                  </span>
                } 
                key="1"
              >
                {!editing ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                      <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={handleEdit}
                        style={{ borderRadius: '6px' }}
                      >
                        Edit Profile
                      </Button>
                    </div>
                    
                    <Row gutter={[24, 16]}>
                      <Col span={12}>
                        <Text type="secondary">First Name</Text>
                        <Paragraph style={{ fontSize: '16px' }}>{userData.firstName}</Paragraph>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">Last Name</Text>
                        <Paragraph style={{ fontSize: '16px' }}>{userData.lastName}</Paragraph>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">Email</Text>
                        <Paragraph style={{ fontSize: '16px' }}>{userData.email}</Paragraph>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">Phone</Text>
                        <Paragraph style={{ fontSize: '16px' }}>{userData.phone}</Paragraph>
                      </Col>
                      <Col span={24}>
                        <Text type="secondary">Address</Text>
                        <Paragraph style={{ fontSize: '16px' }}>{userData.address}</Paragraph>
                      </Col>
                    </Row>
                    
                    <Divider />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Title level={5} style={{ margin: 0 }}>Security</Title>
                      <Button 
                        type="default" 
                        onClick={() => setChangePasswordVisible(true)}
                        style={{ borderRadius: '6px' }}
                      >
                        Change Password
                      </Button>
                    </div>
                    
                    <Row gutter={[24, 16]}>
                      <Col span={24}>
                        <Text type="secondary">Password</Text>
                        <Paragraph style={{ fontSize: '16px' }}>
                          Last changed on {userData.passwordLastChanged}
                        </Paragraph>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={userData}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="firstName"
                          label="First Name"
                          rules={[{ required: true, message: 'Please enter your first name' }]}
                        >
                          <Input prefix={<UserOutlined />} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="lastName"
                          label="Last Name"
                          rules={[{ required: true, message: 'Please enter your last name' }]}
                        >
                          <Input prefix={<UserOutlined />} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                          ]}
                        >
                          <Input prefix={<MailOutlined />} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="phone"
                          label="Phone"
                          rules={[{ required: true, message: 'Please enter your phone number' }]}
                        >
                          <Input prefix={<PhoneOutlined />} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Form.Item
                      name="address"
                      label="Address"
                      rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                      <Input.TextArea rows={3} prefix={<HomeOutlined />} />
                    </Form.Item>
                    
                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          Save Changes
                        </Button>
                        <Button onClick={() => setEditing(false)}>
                          Cancel
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                )}
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <HistoryOutlined />
                    Travel History
                  </span>
                } 
                key="2"
              >
                <div style={{ marginBottom: '20px' }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic 
                        title="Total Trips" 
                        value={travelHistory.length} 
                        prefix={<GlobalOutlined />} 
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Countries Visited" 
                        value={2} 
                        prefix={<GlobalOutlined />} 
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Total Spent" 
                        value="6,240 THB" 
                        prefix={<CreditCardOutlined />} 
                      />
                    </Col>
                  </Row>
                </div>
                
                <List
                  itemLayout="horizontal"
                  dataSource={travelHistory}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button type="link">Details</Button>,
                        <Button type="link">Receipt</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={<GlobalOutlined />} 
                            style={{ 
                              backgroundColor: '#1890ff',
                              boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
                            }} 
                          />
                        }
                        title={
                          <Space>
                            <Text strong>{item.from} to {item.to}</Text>
                            <Tag 
                              color="green"
                              style={{ borderRadius: '12px', marginLeft: '12px' }}
                            >
                              {item.status}
                            </Tag>
                          </Space>
                        }
                        description={
                          <>
                            <Text type="secondary">
                              <ClockCircleOutlined style={{ marginRight: '8px' }} />
                              {item.date} • {item.airline} • ID: {item.id}
                            </Text>
                            <div style={{ marginTop: '4px' }}>
                              <Text strong>{item.price}</Text>
                            </div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <HeartOutlined />
                    Saved Destinations
                  </span>
                } 
                key="3"
              >
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
                  dataSource={savedDestinations}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        hoverable
                        style={{ borderRadius: '12px', overflow: 'hidden' }}
                        cover={
                          <div style={{ 
                            height: '160px', 
                            backgroundImage: `url(https://source.unsplash.com/400x200/?${item.name})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                          }}>
                            <div style={{ 
                              position: 'absolute', 
                              top: '12px', 
                              right: '12px',
                              background: 'rgba(255,255,255,0.9)',
                              borderRadius: '50%',
                              padding: '8px',
                              cursor: 'pointer'
                            }}>
                              <HeartOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
                            </div>
                          </div>
                        }
                      >
                        <Card.Meta
                          title={item.name}
                          description={
                            <>
                              <div>Code: {item.code}</div>
                              <div style={{ marginTop: '8px' }}>
                                <Text type="secondary">Saved on {item.saved}</Text>
                              </div>
                              <div style={{ marginTop: '16px' }}>
                                <Button type="primary" style={{ borderRadius: '6px' }}>
                                  Search Flights
                                </Button>
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <CreditCardOutlined />
                    Payment Methods
                  </span>
                } 
                key="4"
              >
                <div style={{ marginBottom: '24px' }}>
                  <Button 
                    type="primary" 
                    style={{ borderRadius: '6px' }}
                    onClick={() => {
                      openNotification({
                        message: 'Feature Coming Soon',
                        description: 'Adding new payment methods will be available soon.',
                        type: 'info',
                      });
                    }}
                  >
                    Add New Payment Method
                  </Button>
                </div>
                
                <List
                  itemLayout="horizontal"
                  dataSource={paymentMethods}
                  renderItem={(item, index) => (
                    <List.Item
                      actions={[
                        <Button 
                          type="text" 
                          onClick={() => {
                            openNotification({
                              message: 'Feature Coming Soon',
                              description: 'Editing payment methods will be available soon.',
                              type: 'info',
                            });
                          }}
                        >
                          Edit
                        </Button>,
                        <Button 
                          type="text" 
                          danger
                          onClick={() => handleDeletePaymentMethod(index)}
                        >
                          Delete
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={<CreditCardOutlined />} 
                            style={{ 
                              backgroundColor: item.type === 'Credit Card' ? '#1890ff' : '#52c41a',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                        }
                        title={
                          <Space>
                            <Text strong>{item.name}</Text>
                            {item.isDefault && (
                              <Tag color="blue" style={{ borderRadius: '12px' }}>
                                Default
                              </Tag>
                            )}
                          </Space>
                        }
                        description={
                          <>
                            <div>{item.type}</div>
                            {item.expiry && <div>Expires: {item.expiry}</div>}
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <SettingOutlined />
                    Account Settings
                  </span>
                } 
                key="5"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Email Notifications',
                      description: 'Manage your email notification preferences',
                      icon: <MailOutlined />,
                    },
                    {
                      title: 'Privacy Settings',
                      description: 'Control how your information is used',
                      icon: <SafetyCertificateOutlined />,
                    },
                    {
                      title: 'Connected Accounts',
                      description: 'Manage connections with social accounts',
                      icon: <IdcardOutlined />,
                    },
                    {
                      title: 'Close Account',
                      description: 'Permanently close your TravelRider account',
                      icon: <LockOutlined />,
                      danger: true,
                    },
                  ]}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button 
                          type={item.danger ? 'danger' : 'default'} 
                          style={{ borderRadius: '6px' }}
                          onClick={() => {
                            if (item.danger) {
                              Modal.confirm({
                                title: 'Close Account',
                                content: 'Are you sure you want to close your account? This action cannot be undone.',
                                okText: 'Yes, Close Account',
                                cancelText: 'Cancel',
                                okButtonProps: { danger: true },
                              });
                            } else {
                              openNotification({
                                message: 'Feature Coming Soon',
                                description: 'This feature will be available soon.',
                                type: 'info',
                              });
                            }
                          }}
                        >
                          Manage
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={item.icon} 
                            style={{ 
                              backgroundColor: item.danger ? '#ff4d4f' : '#1890ff',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                        }
                        title={<Text strong>{item.title}</Text>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      
      <Modal
        title="Change Password"
        visible={changePasswordVisible}
        onCancel={() => setChangePasswordVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Alert
            message="Password Requirements"
            description="Your password must be at least 8 characters long and include a mix of letters, numbers, and special characters."
            type="info"
            style={{ marginBottom: '24px' }}
          />
          
          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button onClick={() => setChangePasswordVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Password
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
