import React, { memo, useState, useCallback } from 'react';
import utils from 'utils';

import styles from './index.less';

const cx = utils.classnames('prefix-materials', styles);

export default memo(props => {
  const [loading, setLoading] = useState(false);

  const handle = useCallback(
    (val) => {
      console.log(val)
    },
    [],
  );

  return (
    <div className={cx('root')}>
      ReactHooks
    </div>
  )
})
