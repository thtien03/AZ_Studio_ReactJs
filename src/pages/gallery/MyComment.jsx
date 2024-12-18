import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MyComment = ({ author, content, datetime }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Avatar icon={<UserOutlined />} style={{ marginRight: '16px' }} />
      <div>
        <Text strong>{author}</Text>
        <div>{content}</div>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {datetime}
        </Text>
      </div>
    </div>
  );
};

export default MyComment;
