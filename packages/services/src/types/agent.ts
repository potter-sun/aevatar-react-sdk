export interface ICreateAgentParams {
  agentType: string;
  name: string;
  properties: Record<string, any>;
}

export interface IAgentInfo {
  id: string;
  agentType: string;
  name: string;
  properties: Record<string, any>;
  grainId: string;
}

export interface IAgentInfoDetail extends IAgentInfo {
  grainId: string;
}

export interface IGetAgentsParams {
  userAddress: string;
  pageIndex: number;
  pageSize: number;
}

export interface IUpdateAgentInfo {
  name?: string;
  properties?: Record<string, any>;
}

export interface IAddSubAgentsParams {
  subAgents: string[];
}

export interface IAddSubAgentsResponse {
  id: string;
  subAgents: string[];
}

export interface IRemoveSubAgentsParams {
  removedSubAgents: string[];
}

export interface IRemoveSubAgentsResponse {
  id: string;
  subAgents: string[];
}

export interface IAgentRelationship {
  parentAgent: string;
  subAgents: string[];
}

export interface IAgentParams {
  name: string;
  type: string;
}

export interface IAgentsConfiguration {
  agentType: string;
  agentParams: null | IAgentParams;
}

export interface IAgentService {
  createAgent(params: ICreateAgentParams): Promise<IAgentInfo>;
  getAgents(params: IGetAgentsParams): Promise<IAgentInfo[]>;
  getAgentInfo(id: string): Promise<IAgentInfoDetail>;
  updateAgentInfo(
    id: string,
    params: IUpdateAgentInfo
  ): Promise<IAgentInfoDetail>;
  deleteAgent(id: string): Promise<void>;
  addSubAgents(
    id: string,
    params: IAddSubAgentsParams
  ): Promise<IAddSubAgentsResponse>;
  removeSubAgents(
    id: string,
    params: IRemoveSubAgentsParams
  ): Promise<IRemoveSubAgentsResponse>;
  removeAllSubAgent(id: string): Promise<void>;

  getAgentRelationship(id: string): Promise<IAgentRelationship>;

  getAllAgentsConfiguration(): Promise<IAgentsConfiguration[]>;
}
