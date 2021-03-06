import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Field, Button, Toast } from '@antmjs/vantui';
import request from '@utils/request';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const {
      store: { userStore },
    } = props;

    const { login } = userStore;

    const [phone, setPhone] = useState('');
    // const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');

    const onSubmit = () => {
      const uPhone = phone.trim();
      const uPwd = password.trim();
      const uRPwd = rPassword.trim();

      if (!uPhone) {
        Toast.show('账号不能为空!');
        return;
      }

      if (!uPwd) {
        Toast.show('密码不能为空!');
        return;
      }

      // if (uRPwd !== uPwd) {
      //   Toast.show('两次密码不相同!');
      //   return;
      // }

      if (uPwd.length < 6) {
        Toast.show('密码需要大于6位!');
        return;
      }

      request({
        url: '/user/login',
        method: 'POST',
        data: {
          phone,
          password,
        },
      }).then((userInfo: any) => {
        const { token } = userInfo;
        login(userInfo);
        Taro.setStorageSync('token', token);
        Taro.setStorageSync('userInfo', JSON.stringify(userInfo));
        Taro.navigateBack();
      });
    };

    return (
      <View className={styles.container}>
        <View className={styles.form}>
          <Field
            value={phone}
            required
            clearable
            label="账号"
            icon="questionO"
            placeholder="请输入账号"
            maxlength={30}
            onChange={(e) => {
              setPhone(e.detail);
            }}
          />
          {/* <Field
            value={name}
            clearable
            label="昵称"
            icon="questionO"
            placeholder="请输入昵称"
            maxlength={30}
            onChange={(e) => {
              setName(e.detail);
            }}
          /> */}
          <Field
            value={password}
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            border={false}
            maxlength={30}
            onChange={(e) => {
              setPassword(e.detail);
            }}
          />
          {/* <Field
            value={rPassword}
            type="password"
            label="确认密码"
            placeholder="请输入密码"
            required
            border={false}
            maxlength={30}
            onChange={(e) => {
              setRPassword(e.detail);
            }}
          /> */}
        </View>
        <View className={styles.submit_wrap}>
          <Text className={styles.prompt}>登录即注册</Text>
          <Button type="info" size="large" className={styles.submit} onClick={onSubmit}>
            登录/注册
          </Button>
        </View>
        <Toast id="vanToast" />
      </View>
    );
  }),
);

export default Component;
