import { BaseService } from "../types";
import type { IBaseRequest } from "@aevatar-react-sdk/types";
import type {
  IAddSubAgentsParams,
  IAddSubAgentsResponse,
  IAgentInfo,
  IAgentInfoDetail,
  IAgentRelationship,
  IAgentsConfiguration,
  IAgentService,
  ICreateAgentParams,
  IGetAgentsParams,
  IRemoveSubAgentsParams,
  IRemoveSubAgentsResponse,
  IUpdateAgentInfo,
} from "../types/agent";

export class AgentService<T extends IBaseRequest = IBaseRequest>
  extends BaseService<T>
  implements IAgentService
{
  getAgentInfo(id: string): Promise<IAgentInfoDetail> {
    return this._request.send({
      method: "GET",
      url: "/api/agent",
      params: { guid: id },
      headers: this._headers,
    });
  }
  updateAgentInfo(
    id: string,
    params: IUpdateAgentInfo
  ): Promise<IAgentInfoDetail> {
    return this._request.send({
      method: "PUT",
      url: `/api/agent/${id}`,
      params,
      headers: this._headers,
    });
  }
  deleteAgent(id: string): Promise<void> {
    return this._request.send({
      method: "DELETE",
      url: `/api/agent/${id}`,
      headers: this._headers,
    });
  }
  addSubAgents(
    id: string,
    params: IAddSubAgentsParams
  ): Promise<IAddSubAgentsResponse> {
    return this._request.send({
      method: "POST",
      url: `/api/agent/${id}/add-subagent`,
      params,
      headers: this._headers,
    });
  }
  removeSubAgents(
    id: string,
    params: IRemoveSubAgentsParams
  ): Promise<IRemoveSubAgentsResponse> {
    return this._request.send({
      method: "POST",
      url: `/api/agent/${id}/remove-subagent`,
      params,
      headers: this._headers,
    });
  }
  removeAllSubAgent(id: string): Promise<void> {
    return this._request.send({
      method: "POST",
      url: `/api/agent/${id}/remove-all-subagent`,
      headers: this._headers,
    });
  }
  getAgentRelationship(id: string): Promise<IAgentRelationship> {
    return this._request.send({
      method: "GET",
      url: `/api/agent/${id}/relationship`,
      headers: this._headers,
    });
  }
  getAllAgentsConfiguration(): Promise<IAgentsConfiguration[]> {
    // TODO change url  /api/all-agents

    return this._request.send({
      method: "GET",
      url: "/all-agents",
      headers: this._headers,
    });
  }
  getAgents(params: IGetAgentsParams): Promise<IAgentInfo[]> {
    return this._request.send({
      method: "GET",
      url: "/api/atomic-agents",
      params,
      headers: this._headers,
    });
  }
  createAgent(params: ICreateAgentParams): Promise<IAgentInfo> {
    // TODO change url  /api/agent
    return this._request.send({
      method: "POST",
      url: "/agent",
      params,
      headers: this._headers,
    });
  }
}
