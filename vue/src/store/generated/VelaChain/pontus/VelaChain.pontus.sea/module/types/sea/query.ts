/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../sea/params";
import { Provider } from "../sea/provider";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { PoolPair } from "../sea/pool_pair";

export const protobufPackage = "VelaChain.pontus.sea";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetProviderRequest {
  poolName: string;
  address: string;
}

export interface QueryGetProviderResponse {
  provider: Provider | undefined;
}

export interface QueryAllProviderRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllProviderResponse {
  provider: Provider[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPoolPairRequest {
  alphaDenom: string;
  betaDenom: string;
}

export interface QueryGetPoolPairResponse {
  poolPair: PoolPair | undefined;
}

export interface QueryAllPoolPairRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPoolPairResponse {
  poolPair: PoolPair[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetProviderRequest: object = { poolName: "", address: "" };

export const QueryGetProviderRequest = {
  encode(
    message: QueryGetProviderRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolName !== "") {
      writer.uint32(10).string(message.poolName);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetProviderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetProviderRequest,
    } as QueryGetProviderRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolName = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetProviderRequest {
    const message = {
      ...baseQueryGetProviderRequest,
    } as QueryGetProviderRequest;
    if (object.poolName !== undefined && object.poolName !== null) {
      message.poolName = String(object.poolName);
    } else {
      message.poolName = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryGetProviderRequest): unknown {
    const obj: any = {};
    message.poolName !== undefined && (obj.poolName = message.poolName);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetProviderRequest>
  ): QueryGetProviderRequest {
    const message = {
      ...baseQueryGetProviderRequest,
    } as QueryGetProviderRequest;
    if (object.poolName !== undefined && object.poolName !== null) {
      message.poolName = object.poolName;
    } else {
      message.poolName = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryGetProviderResponse: object = {};

export const QueryGetProviderResponse = {
  encode(
    message: QueryGetProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.provider !== undefined) {
      Provider.encode(message.provider, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetProviderResponse,
    } as QueryGetProviderResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = Provider.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetProviderResponse {
    const message = {
      ...baseQueryGetProviderResponse,
    } as QueryGetProviderResponse;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = Provider.fromJSON(object.provider);
    } else {
      message.provider = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetProviderResponse): unknown {
    const obj: any = {};
    message.provider !== undefined &&
      (obj.provider = message.provider
        ? Provider.toJSON(message.provider)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetProviderResponse>
  ): QueryGetProviderResponse {
    const message = {
      ...baseQueryGetProviderResponse,
    } as QueryGetProviderResponse;
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = Provider.fromPartial(object.provider);
    } else {
      message.provider = undefined;
    }
    return message;
  },
};

const baseQueryAllProviderRequest: object = {};

export const QueryAllProviderRequest = {
  encode(
    message: QueryAllProviderRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllProviderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllProviderRequest,
    } as QueryAllProviderRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllProviderRequest {
    const message = {
      ...baseQueryAllProviderRequest,
    } as QueryAllProviderRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllProviderRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllProviderRequest>
  ): QueryAllProviderRequest {
    const message = {
      ...baseQueryAllProviderRequest,
    } as QueryAllProviderRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllProviderResponse: object = {};

export const QueryAllProviderResponse = {
  encode(
    message: QueryAllProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.provider) {
      Provider.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllProviderResponse,
    } as QueryAllProviderResponse;
    message.provider = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider.push(Provider.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllProviderResponse {
    const message = {
      ...baseQueryAllProviderResponse,
    } as QueryAllProviderResponse;
    message.provider = [];
    if (object.provider !== undefined && object.provider !== null) {
      for (const e of object.provider) {
        message.provider.push(Provider.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllProviderResponse): unknown {
    const obj: any = {};
    if (message.provider) {
      obj.provider = message.provider.map((e) =>
        e ? Provider.toJSON(e) : undefined
      );
    } else {
      obj.provider = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllProviderResponse>
  ): QueryAllProviderResponse {
    const message = {
      ...baseQueryAllProviderResponse,
    } as QueryAllProviderResponse;
    message.provider = [];
    if (object.provider !== undefined && object.provider !== null) {
      for (const e of object.provider) {
        message.provider.push(Provider.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetPoolPairRequest: object = { alphaDenom: "", betaDenom: "" };

export const QueryGetPoolPairRequest = {
  encode(
    message: QueryGetPoolPairRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.alphaDenom !== "") {
      writer.uint32(10).string(message.alphaDenom);
    }
    if (message.betaDenom !== "") {
      writer.uint32(18).string(message.betaDenom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetPoolPairRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPoolPairRequest,
    } as QueryGetPoolPairRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alphaDenom = reader.string();
          break;
        case 2:
          message.betaDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolPairRequest {
    const message = {
      ...baseQueryGetPoolPairRequest,
    } as QueryGetPoolPairRequest;
    if (object.alphaDenom !== undefined && object.alphaDenom !== null) {
      message.alphaDenom = String(object.alphaDenom);
    } else {
      message.alphaDenom = "";
    }
    if (object.betaDenom !== undefined && object.betaDenom !== null) {
      message.betaDenom = String(object.betaDenom);
    } else {
      message.betaDenom = "";
    }
    return message;
  },

  toJSON(message: QueryGetPoolPairRequest): unknown {
    const obj: any = {};
    message.alphaDenom !== undefined && (obj.alphaDenom = message.alphaDenom);
    message.betaDenom !== undefined && (obj.betaDenom = message.betaDenom);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPoolPairRequest>
  ): QueryGetPoolPairRequest {
    const message = {
      ...baseQueryGetPoolPairRequest,
    } as QueryGetPoolPairRequest;
    if (object.alphaDenom !== undefined && object.alphaDenom !== null) {
      message.alphaDenom = object.alphaDenom;
    } else {
      message.alphaDenom = "";
    }
    if (object.betaDenom !== undefined && object.betaDenom !== null) {
      message.betaDenom = object.betaDenom;
    } else {
      message.betaDenom = "";
    }
    return message;
  },
};

const baseQueryGetPoolPairResponse: object = {};

export const QueryGetPoolPairResponse = {
  encode(
    message: QueryGetPoolPairResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolPair !== undefined) {
      PoolPair.encode(message.poolPair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetPoolPairResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPoolPairResponse,
    } as QueryGetPoolPairResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolPair = PoolPair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolPairResponse {
    const message = {
      ...baseQueryGetPoolPairResponse,
    } as QueryGetPoolPairResponse;
    if (object.poolPair !== undefined && object.poolPair !== null) {
      message.poolPair = PoolPair.fromJSON(object.poolPair);
    } else {
      message.poolPair = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetPoolPairResponse): unknown {
    const obj: any = {};
    message.poolPair !== undefined &&
      (obj.poolPair = message.poolPair
        ? PoolPair.toJSON(message.poolPair)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPoolPairResponse>
  ): QueryGetPoolPairResponse {
    const message = {
      ...baseQueryGetPoolPairResponse,
    } as QueryGetPoolPairResponse;
    if (object.poolPair !== undefined && object.poolPair !== null) {
      message.poolPair = PoolPair.fromPartial(object.poolPair);
    } else {
      message.poolPair = undefined;
    }
    return message;
  },
};

const baseQueryAllPoolPairRequest: object = {};

export const QueryAllPoolPairRequest = {
  encode(
    message: QueryAllPoolPairRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllPoolPairRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllPoolPairRequest,
    } as QueryAllPoolPairRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPoolPairRequest {
    const message = {
      ...baseQueryAllPoolPairRequest,
    } as QueryAllPoolPairRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllPoolPairRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllPoolPairRequest>
  ): QueryAllPoolPairRequest {
    const message = {
      ...baseQueryAllPoolPairRequest,
    } as QueryAllPoolPairRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllPoolPairResponse: object = {};

export const QueryAllPoolPairResponse = {
  encode(
    message: QueryAllPoolPairResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.poolPair) {
      PoolPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllPoolPairResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllPoolPairResponse,
    } as QueryAllPoolPairResponse;
    message.poolPair = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolPair.push(PoolPair.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPoolPairResponse {
    const message = {
      ...baseQueryAllPoolPairResponse,
    } as QueryAllPoolPairResponse;
    message.poolPair = [];
    if (object.poolPair !== undefined && object.poolPair !== null) {
      for (const e of object.poolPair) {
        message.poolPair.push(PoolPair.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllPoolPairResponse): unknown {
    const obj: any = {};
    if (message.poolPair) {
      obj.poolPair = message.poolPair.map((e) =>
        e ? PoolPair.toJSON(e) : undefined
      );
    } else {
      obj.poolPair = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllPoolPairResponse>
  ): QueryAllPoolPairResponse {
    const message = {
      ...baseQueryAllPoolPairResponse,
    } as QueryAllPoolPairResponse;
    message.poolPair = [];
    if (object.poolPair !== undefined && object.poolPair !== null) {
      for (const e of object.poolPair) {
        message.poolPair.push(PoolPair.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Provider by index. */
  Provider(request: QueryGetProviderRequest): Promise<QueryGetProviderResponse>;
  /** Queries a list of Provider items. */
  ProviderAll(
    request: QueryAllProviderRequest
  ): Promise<QueryAllProviderResponse>;
  /** Queries a PoolPair by index. */
  PoolPair(request: QueryGetPoolPairRequest): Promise<QueryGetPoolPairResponse>;
  /** Queries a list of PoolPair items. */
  PoolPairAll(
    request: QueryAllPoolPairRequest
  ): Promise<QueryAllPoolPairResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Provider(
    request: QueryGetProviderRequest
  ): Promise<QueryGetProviderResponse> {
    const data = QueryGetProviderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Query",
      "Provider",
      data
    );
    return promise.then((data) =>
      QueryGetProviderResponse.decode(new Reader(data))
    );
  }

  ProviderAll(
    request: QueryAllProviderRequest
  ): Promise<QueryAllProviderResponse> {
    const data = QueryAllProviderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Query",
      "ProviderAll",
      data
    );
    return promise.then((data) =>
      QueryAllProviderResponse.decode(new Reader(data))
    );
  }

  PoolPair(
    request: QueryGetPoolPairRequest
  ): Promise<QueryGetPoolPairResponse> {
    const data = QueryGetPoolPairRequest.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Query",
      "PoolPair",
      data
    );
    return promise.then((data) =>
      QueryGetPoolPairResponse.decode(new Reader(data))
    );
  }

  PoolPairAll(
    request: QueryAllPoolPairRequest
  ): Promise<QueryAllPoolPairResponse> {
    const data = QueryAllPoolPairRequest.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Query",
      "PoolPairAll",
      data
    );
    return promise.then((data) =>
      QueryAllPoolPairResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
