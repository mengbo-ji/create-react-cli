import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { FC } from 'react';
import moment from 'moment';

const Overview: FC = () => {
  return (
    <Form>
      <Row>
        <Col span={4}>
          <Form.Item label={'时间组件'}>
            <DatePicker defaultValue={moment()}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label={'选择框组件'}>
            <Select placeholder={'请选择'}/>
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item label={'Input组件'}>
            <Input placeholder={'请输入'}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Overview;
