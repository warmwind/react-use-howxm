import React from "react";
import { useEffect } from "react";

import useHowxm from "react-use-howxm";

const myLogger = console.info;

const App = () => {
  const { initHowxm, identifyHowxm, openHowxm, checkOpenHowxm } = useHowxm();
  const campaignId = "<Your Campaign ID>";
  const appId = "<Your App ID>";
  const uid = "my-uid";
  useEffect(() => {
    const isReady = initHowxm(appId, myLogger);
    if (isReady) {
      identifyHowxm({ uid });
    }
  }, [initHowxm, identifyHowxm]);

  const handleOpenClick = () => {
    openHowxm(campaignId, { uid }, { price: 150 }, () => {
      myLogger("opwnHowxm finished");
    });
  };

  const handleCheckOpenClick = () => {
    checkOpenHowxm(
        campaignId,
        uid,
        () => {
          myLogger("checkOpenHowxm success");
        },
        () => {
          myLogger("checkOpenHowxm failed");
        }
    );
  };

  const handleTriggerEvent = () => {
    eventHowxm('test1', {}, () => {
      myLogger("triggerEvent success");
    });
  };

  return (
    <>
      <h1>Howxm SDK Example</h1>
      <button onClick={handleOpenClick}>Open</button>
      <button onClick={handleCheckOpenClick}>CheckOpen</button>
      <button onClick={handleTriggerEvent}>TriggerEvent</button>
    </>
  );
};
export default App;
