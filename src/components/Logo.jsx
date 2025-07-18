import React from 'react';
import { Typography } from 'antd';
import { RocketOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
        padding: '8px 16px',  // Reduced from 10px 18px
        borderRadius: '10px', // Reduced from 12px
        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)', // Reduced shadow
        transition: 'all 0.3s ease',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        transform: 'scale(0.95)' // Added scale to make the entire logo a bit smaller
      }} className="logo-container">
        <div style={{
          background: 'white',
          borderRadius: '50%',
          width: '40px',  // Reduced from 46px
          height: '40px', // Reduced from 46px
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px', // Reduced from 14px
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)', // Reduced shadow
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px', // Reduced from 4px
            background: 'linear-gradient(90deg, #ff4d4f, #faad14, #52c41a, #1890ff)'
          }} />
          <RocketOutlined style={{ 
            fontSize: '24px',  // Reduced from 28px
            color: '#1890ff',
            transform: 'rotate(45deg)' 
          }} />
        </div>
        <div>
          <Title level={3} style={{ 
            margin: 0, 
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
            letterSpacing: '0.5px',
            fontSize: '20px'  // Reduced from 24px to 20px
          }}>
            <span style={{ fontWeight: 800 }}>Travel</span>
            <span style={{ fontWeight: 400 }}>Rider</span>
            {/* Removed GlobalOutlined icon */}
          </Title>
          <div style={{ 
            fontSize: '10px',  // Reduced from 12px
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: '-2px',
            letterSpacing: '1.2px', // Reduced from 1.5px
            fontWeight: '500',
            textTransform: 'uppercase',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
          }}>
            Fly with confidence
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
