import { IWindowHowxmEmbedded, TAttribute, TCustomerInfo } from "./types";

export const appendHeadScript = (
  scriptText: string,
  scriptId: string
): boolean => {
  try {
    const existentScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement;
    const script = existentScript || document.createElement("script");
    script.id = scriptId;
    script.innerText = scriptText;
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);

    return true;
  } catch {
    return false;
  }
};

export function initScript(appId: string): boolean {
  const hasWindow = typeof window !== "undefined";
  if (!hasWindow) throw Error("Howxm depends on window. Window is undefined.");

  const scriptCode = `function _howxm(){_howxmQueue.push(arguments)} window._howxmQueue=window._howxmQueue||[]; _howxm("setAppID","${appId}"); (function(){var e=document.createElement("script"), t=document.getElementsByTagName("script")[0]; e.type="text/javascript"; e.defer=!0;e.src="https://static.howxm.com/sdk.js"; t.parentNode.insertBefore(e,t)})(); `;
  const isAppended = appendHeadScript(scriptCode, "howxm-init-script");
  if (
    isAppended &&
    hasWindow &&
    (window as unknown as IWindowHowxmEmbedded)._howxm
  ) {
    return true;
  }

  throw Error("Howxm initialization failed!");
}

export function identifyScript(customerInfo: TCustomerInfo): void {
  const hasWindow = typeof window !== "undefined";
  if (hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm(
      "identify",
      customerInfo
    );
  }

  throw Error("Howxm is not available! Is Howxm initialized?");
}

export function showScript(
  campaignId: string,
  customer?: TCustomerInfo,
  extra?: TAttribute,
  onCompleted?: (data: { success: boolean; errMsg?: string }) => void
): void {
  const hasWindow = typeof window !== "undefined";
  if (hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm("show", {
      campaignId,
      customer,
      extra,
      onCompleted,
    });
  }

  throw Error("Howxm is not available! Is Howxm initialized?");
}

export function checkScript(
  campaignId: string,
  uid: string,
  onSuccess?: () => void,
  onFailed?: (errMsg?: string) => void
): void {
  const hasWindow = typeof window !== "undefined";
  if (hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm("check", {
      campaignId,
      uid,
      onSuccess,
      onFailed,
    });
  }

  throw Error("Howxm is not available! Is Howxm initialized?");
}

export function checkReadyState(): boolean {
  const hasWindow = typeof window !== "undefined";
  return !!(hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm);
}
