export type TUserInfo = Record<
  string,
  string | number | Date | boolean
>;

export interface IUseHowxm {
  readyState: boolean;
  initHowxm: (
    appId: string,
    logCallback?: (...data: unknown[]) => void
  ) => boolean;
  identifyHowxm: (
    userInfo: TUserInfo,
    logCallback?: (...data: unknown[]) => void
  ) => boolean;
}

export interface IWindowHowxmEmbedded extends Window {
  _howxm: (method: string, ...data: unknown[]) => void;
}
