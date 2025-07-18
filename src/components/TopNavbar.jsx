import React, { useState } from 'react';
import { Menu, Button, Dropdown, Space, Badge, Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { 
  GlobalOutlined, 
  QuestionCircleOutlined, 
  CustomerServiceOutlined, 
  UserOutlined, 
  DownOutlined, 
  BellOutlined, 
  PhoneOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  IdcardOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const TopNavbar = () => {
  const languageOptions = [
    { key: 'en', label: 'English' },
    { key: 'th', label: 'ไทย' },
  ];

  const [language, setLanguage] = useState('en');
  // Simulate a logged in state to demonstrate both login button and user menu
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLanguageChange = ({ key }) => {
    setLanguage(key);
  };

  // User menu items
  const userMenuItems = [
    {
      key: 'dashboard',
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />
    },
    {
      key: 'profile',
      label: <Link to="/profile">My Profile</Link>,
      icon: <UserOutlined />
    },
    {
      key: 'bookings',
      label: <Link to="/dashboard">My Bookings</Link>,
      icon: <IdcardOutlined />
    },
    {
      key: 'settings',
      label: <Link to="/profile">Account Settings</Link>,
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => {
        setIsLoggedIn(false);
      }
    }
  ];

  return (
    <div className="top-navbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '12px 36px', 
      borderBottom: '1px solid #e8e8e8', 
      backgroundColor: '#f5f8ff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
    }}>
      {/* Left side - Contact info */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space size={24}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PhoneOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            <Text style={{ color: '#666' }}>+66 2 123 4567</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MailOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            <Text style={{ color: '#666' }}>contact@travelrider.com</Text>
          </div>
        </Space>
      </div>
      
      {/* Right side - Menu items */}
      <Space size={24} className="top-navbar-items">
        <Dropdown
          menu={{
            items: languageOptions,
            onClick: handleLanguageChange,
          }}
        >
          <Button type="text" className="top-navbar-button" style={{ 
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            padding: '4px 12px',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}>
            <GlobalOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span>{language === 'en' ? 'English' : 'ไทย'}</span>
            <DownOutlined style={{ fontSize: '10px', marginLeft: '6px' }} />
          </Button>
        </Dropdown>
        
        <Link to="/about">
          <Button type="text" className="top-navbar-button" style={{ 
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            padding: '4px 12px',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}>
            <QuestionCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span>About</span>
          </Button>
        </Link>
        
        <Link to="/support">
          <Button type="text" className="top-navbar-button" style={{ 
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            padding: '4px 12px',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}>
            <CustomerServiceOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span>Support</span>
          </Button>
        </Link>
        
        <Badge count={2} size="small">
          <Button type="text" className="top-navbar-button" style={{ 
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            padding: '4px 12px',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}>
            <BellOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <span>Notifications</span>
          </Button>
        </Badge>
        
        {isLoggedIn ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Space style={{ 
              cursor: 'pointer', 
              padding: '4px 8px', 
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(24, 144, 255, 0.1)'
              }
            }}>
              <Avatar 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                size={32}
                style={{ border: '2px solid #1890ff' }}
              />
              <span style={{ fontWeight: '500' }}>John Doe</span>
              <DownOutlined style={{ fontSize: '12px' }} />
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Link to="/login">
              <Button type="default" style={{
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderColor: '#1890ff',
                color: '#1890ff'
              }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="primary" icon={<UserOutlined />} style={{
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(24, 144, 255, 0.35)'
              }}>
                Sign Up
              </Button>
            </Link>
          </Space>
        )}
        
        {/* Login button that toggles the logged in state */}
        <Button 
          type="link" 
          size="small" 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{ marginLeft: '8px', color: '#8c8c8c' }}
        >
          (Demo: {isLoggedIn ? 'Switch to Logged Out' : 'Switch to Logged In'})
        </Button>
      </Space>
    </div>
  );
};

export default TopNavbar;
