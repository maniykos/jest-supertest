export interface TestUser {
  email?: string;
  password?: string;
  token?: string;
  refreshToken?: string;
  id?: number;
  wallets?: WalletInfo[];
  api_key?: string;
}
// Interface for user wallet data in tests
export interface WalletInfo {
  psys_cid: string;
  key: string;
  hash: string | null;
}

declare global {
  var testUser: TestUser;
  var currencies: string[];
  var cids: string[];
  var cashoutHashTo: string;
  var cashoutCidTo: string;
  var localIP: string;
}

export {}; 