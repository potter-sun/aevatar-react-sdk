import type { IAgentParams } from "@aevatar-react-sdk/services";

export type Theme = "light" | "dark";

export interface IConfigurationParams extends IAgentParams {
  value?: string;
}
