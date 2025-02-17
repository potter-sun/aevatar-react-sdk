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

  setHeaders(headers: HTTPHeaders): void {
    this.commonHeaders = headers;
  }
  async send(config: RequestOpts) {
    const result = await super.send({
      ...config,
      headers: { ...this.commonHeaders, ...config.headers },
    });
    console.log(result, "result==send=AevatarRequest");
    if (result?.data) return result.data;
    throw result;
  }
}
