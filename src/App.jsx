import React from 'react';
import { ConfigProvider } from 'antd';
import AppRouter from './AppRouter';
import './assets/styles.css';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorInfo: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#f5222d',
          borderRadius: 6,
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;