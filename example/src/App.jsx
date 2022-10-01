import React from 'react'
import { useEffect } from 'react'

import useHowxm from 'react-use-howxm';

const myLogger = console.info;

const App = () => {
  const {initHowxm, identifyHowxm} = useHowxm()
  useEffect(() => {
    const isReady = initHowxm('d8874325-2d50-480b-9c59-458dd616736f', myLogger);
    if (isReady) {
      identifyHowxm({'uid': 'my-uid'});
    }
  }, [initHowxm, identifyHowxm]);

  return (
    <div>
      <h1>Howxm Example</h1>
    </div>
  )
}
export default App
