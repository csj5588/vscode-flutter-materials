import React from 'react';
import utils from 'utils';
import styles from './index.less';

const cx = utils.classnames('prefix-materials', styles);

class Materials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'index',
    };
  }

  render() {
    return (
      <div className={cx('root')}>
        ReactClass
      </div>
    );
  }
}

export default Materials;
