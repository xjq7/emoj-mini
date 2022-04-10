import { View, ViewProps } from '@tarojs/components';
import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props extends ViewProps, React.Props<any> {}

function Component(props: Props) {
  const { className, style, ...restProps } = props;
  return (
    <View className={classnames(styles.container, className)} style={style} {...restProps}>
      {props.children}
    </View>
  );
}

export default Component;
