import { BaseEventOrig, FormProps, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Form, Field, Button, FormItem } from '@antmjs/vantui';
import request from '@utils/request';

const Component = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { phone, password } = event.detail.value || {};
    request({
      url: '/auth/login',
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

  const getPhoneNumber = (e) => {
    Taro.login({
      success(res) {
        if (res.code) {
          console.log(res);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
    });
    console.log(e);
  };

  return (
    <View>
      <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber}>
        获取手机号
      </Button>
      <Form onFinish={() => {}}>
        <FormItem label="用户名" name="phone" required>
          <Field placeholder="用户名" />
        </FormItem>

        <FormItem label="密码" name="password">
          <Field password placeholder="密码" />
        </FormItem>
        <View style={{ margin: '16px' }}>
          <Button type="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
};

export default Component;
