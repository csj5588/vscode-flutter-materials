import React, { memo, useState, useCallback } from 'react';

export default memo(props => {
  const [loading, setLoading] = useState(false);

  const handle = useCallback(
    (val) => {
      console.log(val)
    },
    [],
  );

  return (
    <div>
      ReactHooks
    </div>
  )
})
