export interface IConnectToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface IClientAuthTokenParams {
  grant_type: string;
  scope: string;
  client_id: string;
  client_secret: string;
}
export interface IConnectService {
  getConnectToken(config: RefreshTokenConfig): Promise<IConnectToken>;
  getAuthTokenWithClient(
    config: IClientAuthTokenParams
  ): Promise<IConnectToken>;
}

export type RefreshTokenConfig = {
  pubkey: string;
  signature: string;
  plain_text: string;
  ca_hash?: string;
  chain_id?: string;
  source: string;
  client_id: "AevatarAuthServer" | string;
  grant_type: "signature" | string;
};
