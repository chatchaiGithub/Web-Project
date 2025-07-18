import React from 'react';
import { Layout, BackTop } from 'antd';
import { Outlet } from 'react-router-dom';
import { UpCircleFilled } from '@ant-design/icons';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import Logo from './Logo';
import Newsletter from './Newsletter';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: 'white', 
        padding: 0, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        display: 'flex', 
        flexDirection: 'column', 
        height: 'auto', 
        lineHeight: 'normal' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '12px 36px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <Logo />
          <TopNavbar />
        </div>
        <MainNavbar />
      </Header>
      
      <Content style={{ background: '#f5f8ff', minHeight: 'calc(100vh - 64px - 70px)' }}>
        <Outlet />
      </Content>
      
      <Footer style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)', 
        color: 'white', 
        padding: '40px 24px',
        boxShadow: '0 -4px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            marginBottom: '24px' 
          }}>
            <div style={{ flex: 1, minWidth: '200px', marginBottom: '24px', textAlign: 'left' }}>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '16px', 
                fontSize: '22px',
                borderLeft: '4px solid #1890ff',
                paddingLeft: '12px'
              }}>TravelRider</h3>
              <p style={{ lineHeight: '1.8' }}>Your trusted partner for flight bookings and travel packages around the world. We make your travel dreams come true with ease and comfort.</p>
            </div>
            <div style={{ flex: 1, minWidth: '200px', marginBottom: '24px', textAlign: 'left', paddingLeft: '32px' }}>
              <h4 style={{ 
                color: 'white', 
                marginBottom: '16px', 
                fontSize: '18px',
                borderLeft: '4px solid #1890ff',
                paddingLeft: '12px'
              }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}><a href="/" style={{ color: 'white', transition: 'all 0.3s ease' }}>Home</a></li>
                <li style={{ marginBottom: '12px' }}><a href="/about" style={{ color: 'white', transition: 'all 0.3s ease' }}>About Us</a></li>
                <li style={{ marginBottom: '12px' }}><a href="/support" style={{ color: 'white', transition: 'all 0.3s ease' }}>Support</a></li>
                <li style={{ marginBottom: '12px' }}><a href="/travel-trip" style={{ color: 'white', transition: 'all 0.3s ease' }}>Travel Packages</a></li>
                <li style={{ marginBottom: '12px' }}><a href="/dashboard" style={{ color: 'white', transition: 'all 0.3s ease' }}>Dashboard</a></li>
                <li style={{ marginBottom: '12px' }}><a href="/profile" style={{ color: 'white', transition: 'all 0.3s ease' }}>My Profile</a></li>
              </ul>
            </div>
            <div style={{ flex: 1, minWidth: '200px', marginBottom: '24px', textAlign: 'left', paddingLeft: '32px' }}>
              <h4 style={{ 
                color: 'white', 
                marginBottom: '16px', 
                fontSize: '18px',
                borderLeft: '4px solid #1890ff',
                paddingLeft: '12px'
              }}>Contact</h4>
              <p style={{ marginBottom: '12px', lineHeight: '1.8' }}>Email: contact@travelrider.com</p>
              <p style={{ marginBottom: '12px', lineHeight: '1.8' }}>Phone: +66 2 123 4567</p>
              <p style={{ lineHeight: '1.8' }}>123 Sukhumvit Road, Bangkok, Thailand</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <Newsletter />
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>TravelRider © {new Date().getFullYear()} - All Rights Reserved</div>
              <div>
                <a href="/terms" style={{ color: 'rgba(255,255,255,0.7)', marginRight: '16px' }}>Terms & Conditions</a>
                <a href="/privacy" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </Footer>
      
      <BackTop>
        <div style={{ 
          height: 40, 
          width: 40, 
          lineHeight: '40px', 
          borderRadius: '50%', 
          backgroundColor: '#1890ff', 
          color: '#fff', 
          textAlign: 'center', 
          fontSize: 24,
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}>
          <UpCircleFilled />
        </div>
      </BackTop>
    </Layout>
  );
};

export default AppLayout;
