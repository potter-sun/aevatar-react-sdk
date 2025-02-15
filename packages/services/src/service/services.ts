import type { IBaseRequest } from "@aevatar-react-sdk/types";
import type { IServices } from "../types/services";
import { AgentService } from "./agent";
import type { IAgentService } from "../types";

export class Services<T extends IBaseRequest = IBaseRequest>
  implements IServices
{
  readonly agent: IAgentService;
  constructor(request: T) {
    this.agent = new AgentService(request);
  }
}
