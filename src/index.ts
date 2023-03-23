import * as React from "react";
import {
  checkReadyState,
  checkOpenScript,
  identifyScript,
  initScript,
  openScript, eventScript, setExtraAttributesScript,
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

  const checkOpenHowxm = useCallback(
    (
      campaignId: string,
      uid: string,
      onSuccess?: () => void,
      onFailed?: (errMsg?: string) => void
    ): void => {
      try {
        checkOpenScript(campaignId, uid, onSuccess, onFailed);
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);
      }
    },
    []
  );

  const openHowxm = useCallback(
    (
      campaignId: string,
      customer?: TCustomerInfo,
      extra?: TAttribute,
      onCompleted?: (data: { success: boolean; errMsg?: string }) => void
    ): void => {
      try {
        openScript(campaignId, customer, extra, onCompleted);
      } catch (error) {
        console.error(`Howxm error: ${(error as Error).message}`);
      }
    },
    []
  );

  const eventHowxm = useCallback(
      (
          eventCode: string,
          eventAttrs?: TAttribute,
          logCallback?: (...data: unknown[]) => void
      ): void => {
        try {
          eventScript(eventCode, eventAttrs);
          if (logCallback && typeof logCallback === "function") {
            logCallback(`Howxm event trigger success.`);
          }
        } catch (error) {
          console.error(`Howxm error: ${(error as Error).message}`);
        }
      },
      []
  );

  const setExtraAttributes = useCallback(
      (
          eventAttrs: TAttribute,
          logCallback?: (...data: unknown[]) => void
      ): void => {
        try {
          setExtraAttributesScript(eventAttrs);
          if (logCallback && typeof logCallback === "function") {
            logCallback(`Howxm set extra attributes success.`);
          }
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
      checkOpenHowxm,
      openHowxm,
      eventHowxm,
      setExtraAttributes,
    }),
    [readyState, initHowxm, identifyHowxm, checkOpenHowxm, openHowxm, eventHowxm, setExtraAttributes]
  );
}
