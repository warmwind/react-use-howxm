import * as React from "react";
import {
  checkReadyState,
  checkScript,
  identifyScript,
  initScript,
  showScript,
} from "./dependencies";
import { IUseHowxm, TAttribute, TCustomerInfo } from "./types";
import { useCallback, useMemo } from "react";

export default function useHowxm(): IUseHowxm {
  const isReadyState = checkReadyState();
  const [readyState, setReadyState] = React.useState(
    useMemo(() => isReadyState, [isReadyState])
  );

  const initHowxm = useCallback(
    (appId: string, logCallback?: (...data: unknown[]) => void): boolean => {
      try {
        initScript(appId);
        setReadyState(true);
        if (logCallback && typeof logCallback === "function")
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
      customerInfo: TCustomerInfo,
      logCallback?: (...data: unknown[]) => void
    ): boolean => {
      try {
        identifyScript(customerInfo);

        if (logCallback && typeof logCallback === "function")
          logCallback(`Howxm identified`);

        return true;
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  const checkHowxm = useCallback(
    (
      campaignId: string,
      uid: string,
      onSuccess?: () => void,
      onFailed?: (errMsg?: string) => void
    ): void => {
      try {
        checkScript(campaignId, uid, onSuccess, onFailed);
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);
      }
    },
    []
  );

  const showHowxm = useCallback(
    (
      campaignId: string,
      customer?: TCustomerInfo,
      extra?: TAttribute,
      onCompleted?: (data: { success: boolean; errMsg?: string }) => void
    ): void => {
      try {
        showScript(campaignId, customer, extra, onCompleted);
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);
      }
    },
    []
  );

  return useMemo(
    () => ({
      readyState,
      initHowxm,
      identifyHowxm,
      checkHowxm,
      showHowxm,
    }),
    [readyState, initHowxm, identifyHowxm, checkHowxm, showHowxm]
  );
}
