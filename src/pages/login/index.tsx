import { Cell, Input, Form, Button } from '@taroify/core';
import { BaseEventOrig, FormProps, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import request from '@utils/request';

const Component = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { phone, password } = event.detail.value || {};
    request({
      url: '/auth/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        phone,
        password,
      },
    }).then((res: any) => {
      const { token } = res;
      Taro.setStorageSync('token', token);
    });
  };

  return (
    <View>
      <Form onSubmit={onSubmit}>
        <Cell.Group inset>
          <Form.Item name="phone" rules={[{ required: true, message: '请填写用户名' }]}>
            <Form.Label>用户名</Form.Label>
            <Form.Control>
              <Input placeholder="用户名" />
            </Form.Control>
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请填写密码' }]}>
            <Form.Label>密码</Form.Label>
            <Form.Control>
              <Input password placeholder="密码" />
            </Form.Control>
          </Form.Item>
        </Cell.Group>
        <View style={{ margin: '16px' }}>
          <Button shape="round" block color="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
};

export default Component;
