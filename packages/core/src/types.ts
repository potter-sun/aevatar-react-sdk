import type { IConfig } from "@aevatar-react-sdk/types";
import type {
  ICreateAgentParams,
  IAgentInfo,
  RefreshTokenConfig,
  IClientAuthTokenParams,
} from "@aevatar-react-sdk/services";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface IAevatarAI {}

export interface IAevatarAIMethods {
  createGAevatar(params: ICreateAgentParams): Promise<IAgentInfo>;
  getAuthToken(params: RefreshTokenConfig): Promise<string>;
  getAuthTokenWithClient(params: IClientAuthTokenParams): Promise<string>;
}

export interface IAevatarConfig {
  setConfig(options: IConfig): void;
}
