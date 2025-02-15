import type { IBaseRequest } from "@aevatar-react-sdk/types";
import { BaseService } from "../types";
import queryString from "query-string";
import type {
  IClientAuthTokenParams,
  IConnectService,
  IConnectToken,
  RefreshTokenConfig,
} from "../types/connect";

export class Connect<T extends IBaseRequest = IBaseRequest>
  extends BaseService<T>
  implements IConnectService
{
  getAuthTokenWithClient(
    config: IClientAuthTokenParams
  ): Promise<IConnectToken> {
    return this._request.send({
      method: "POST",
      url: "/connect/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify(config),
    });
  }
  getConnectToken(config: RefreshTokenConfig): Promise<IConnectToken> {
    return this._request.send({
      method: "POST",
      url: "/connect/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify(config),
    });
  }
}
