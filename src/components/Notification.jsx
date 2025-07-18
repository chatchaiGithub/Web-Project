import React from 'react';
import { notification } from 'antd';

export const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight',
    style: {
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: '1px solid #f0f0f0',
      padding: '16px',
      background: type === 'success' ? '#f6ffed' : 
                 type === 'error' ? '#fff2f0' : 
                 type === 'warning' ? '#fffbe6' : '#e6f7ff',
    },
  });
};

export default openNotification;
