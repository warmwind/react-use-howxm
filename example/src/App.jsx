import React from "react";
import { useEffect } from "react";

import useHowxm from "react-use-howxm";

const myLogger = console.info;

const App = () => {
  const { initHowxm, identifyHowxm, showHowxm, checkHowxm } = useHowxm();
  const campaignId = "<Your Campaign ID>";
  const appId = "<Your App ID>";
  const uid = "my-uid";
  useEffect(() => {
    const isReady = initHowxm(appId, myLogger);
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
