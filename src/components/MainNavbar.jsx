import React, { useState, useEffect } from 'react';
import { Menu, Badge, Tooltip } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  RocketOutlined, 
  SearchOutlined, 
  CompassOutlined, 
  HomeFilled, 
  StarFilled, 
  InfoCircleFilled, 
  ThunderboltFilled
} from '@ant-design/icons';

const MainNavbar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  
  // Update current when location changes
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const items = [
    {
      label: (
        <Link to="/" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
          <RocketOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
          <span>Flight</span>
          <Badge 
            count="Hot" 
            style={{ 
              marginLeft: '8px',
              backgroundColor: '#ff4d4f',
              fontSize: '10px'
            }} 
          />
        </Link>
      ),
      key: '/',
    },
    {
      label: (
        <Link to="/check-flight" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
          <SearchOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
          <span>Check Flight</span>
        </Link>
      ),
      key: '/check-flight',
    },
    {
      label: (
        <Link to="/travel-trip" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
          <CompassOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
          <span>Travel Trip</span>
          <Badge 
            count="New" 
            style={{ 
              marginLeft: '8px', 
              backgroundColor: '#52c41a',
              fontSize: '10px'
            }} 
          />
        </Link>
      ),
      key: '/travel-trip',
    },
    {
      label: (
        <Tooltip title="Special Promotions">
          <Link to="/promotions" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <StarFilled style={{ fontSize: '18px', marginRight: '8px' }} />
            <span>Promotions</span>
          </Link>
        </Tooltip>
      ),
      key: '/promotions',
    },
    {
      label: (
        <Tooltip title="Popular Destinations">
          <Link to="/destinations" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <HomeFilled style={{ fontSize: '18px', marginRight: '8px' }} />
            <span>Destinations</span>
          </Link>
        </Tooltip>
      ),
      key: '/destinations',
    },
    {
      label: (
        <Tooltip title="Travel Tips & Guides">
          <Link to="/travel-guides" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <InfoCircleFilled style={{ fontSize: '18px', marginRight: '8px' }} />
            <span>Travel Guides</span>
          </Link>
        </Tooltip>
      ),
      key: '/travel-guides',
    },
    {
      label: (
        <Tooltip title="Quick Booking">
          <Link to="/quick-booking" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <ThunderboltFilled style={{ fontSize: '18px', marginRight: '8px' }} />
            <span>Quick Booking</span>
          </Link>
        </Tooltip>
      ),
      key: '/quick-booking',
    }
  ];

  return (
    <div className="main-navbar-container" style={{ 
      background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      boxShadow: '0 4px 12px rgba(24, 144, 255, 0.2)',
    }}>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ 
          padding: '0 36px', 
          fontWeight: 'bold',
          background: 'transparent',
          border: 'none',
          color: 'white',
          justifyContent: 'center',
          height: '60px',
          lineHeight: '60px'
        }}
        className="main-navbar"
      />
    </div>
  );
};

export default MainNavbar;
