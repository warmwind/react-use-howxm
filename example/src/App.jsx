import React from "react";
import { useEffect } from "react";

import useHowxm from "react-use-howxm";

const myLogger = console.info;

const App = () => {
  const { initHowxm, identifyHowxm, showHowxm, checkHowxm } = useHowxm();
  const campaignId = "801e8eece8f9fc334726562a4d19e6e1";
  const uid = "my-uid";
  useEffect(() => {
    const isReady = initHowxm("d8874325-2d50-480b-9c59-458dd616736f", myLogger);
    if (isReady) {
      identifyHowxm({ uid });
    }
  }, [initHowxm, identifyHowxm]);

  const handleShowClick = () => {
    showHowxm(campaignId, { uid }, { price: 150 }, () => {
      myLogger("showHowxm finished");
    });
  };
  const handleCheckClick = () => {
    checkHowxm(
      campaignId,
      uid,
      () => {
        myLogger("checkHowxm success");
      },
      () => {
        myLogger("checkHowxm failed");
      }
    );
  };

  return (
    <>
      <h1>Howxm SDK Example</h1>
      <button onClick={handleShowClick}>Show</button>
      <button onClick={handleCheckClick}>Check</button>
    </>
  );
};
export default App;
