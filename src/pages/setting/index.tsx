import { Cell, CellGroup, Checkbox } from '@antmjs/vantui';
import PageView from '@components/PageView';
import { inject, observer } from 'mobx-react';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const { store } = props;
    const { configStore } = store;
    const { watermark, setWatermark } = configStore;

    return (
      <PageView className={styles.container}>
        <CellGroup>
          <Cell title="水印" clickable onClick={() => setWatermark(!watermark)}>
            <Checkbox style={{ justifyContent: 'flex-end' }} value={watermark} />
          </Cell>
        </CellGroup>
      </PageView>
    );
  }),
);
export default Component;
