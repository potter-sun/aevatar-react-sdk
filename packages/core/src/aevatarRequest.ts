import { FetchRequest } from "@portkey/request";
import type {
  RequestOpts,
  IBaseRequest,
  HTTPHeaders,
} from "@aevatar-react-sdk/types";

export interface IAevatarRequest extends IBaseRequest {
  commonHeaders: HTTPHeaders;
  setHeaders(headers: HTTPHeaders): void;
}

export class AevatarRequest extends FetchRequest implements IAevatarRequest {
  commonHeaders!: HTTPHeaders;

  async send(config: RequestOpts) {
    try {
      const mergedHeaders = { ...this.commonHeaders, ...config.headers };

      const result = await super.send({
        ...config,
        headers: mergedHeaders,
      });
      if (result?.data) return result.data;
      // get jwt token
      if (result?.access_token) return result;
      throw result;
    } catch (error) {
      console.log(error, "error===send=AevatarRequest");
      throw error;
    }
  }

  public setHeaders(headers: HTTPHeaders): void {
    this.commonHeaders = headers;
  }
}
