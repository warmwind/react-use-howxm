import * as React from 'react';
import {
  checkReadyState,
  identifyScript,
  initScript,
} from './dependencies';
import { IUseHowxm, TUserInfo } from './types';
import {useCallback, useMemo} from "react";

export default function useHowxm(): IUseHowxm {
  const isReadyState = checkReadyState();
  const [readyState, setReadyState] = React.useState(
    useMemo(() => isReadyState, [isReadyState])
  );

  const initHowxm = useCallback(
    (
      appId: string,
      logCallback?: (...data: unknown[]) => void
    ): boolean => {
      try {
        initScript(appId);
        setReadyState(true);
        if (logCallback && typeof logCallback === 'function')
          logCallback(`Howxm ready: true`);

        return true;
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);
        return false;
      }
    },
    []
  );

  const identifyHowxm = useCallback(
    (
      userInfo: TUserInfo,
      logCallback?: (...data: unknown[]) => void
    ): boolean => {
      try {
        identifyScript(userInfo);

        if (logCallback && typeof logCallback === 'function')
          logCallback(`Howxm identified`);

        return true;
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  return useMemo(
    () => ({
      readyState,
      initHowxm: initHowxm,
      identifyHowxm: identifyHowxm,
    }),
    [readyState, initHowxm, identifyHowxm]
  );
}
