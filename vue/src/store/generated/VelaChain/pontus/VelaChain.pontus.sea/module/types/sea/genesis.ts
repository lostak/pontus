/* eslint-disable */
import { Params } from "../sea/params";
import { Provider } from "../sea/provider";
import { PoolPair } from "../sea/pool_pair";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "VelaChain.pontus.sea";

/** GenesisState defines the sea module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  port_id: string;
  providerList: Provider[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  poolPairList: PoolPair[];
}

const baseGenesisState: object = { port_id: "" };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    for (const v of message.providerList) {
      Provider.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.poolPairList) {
      PoolPair.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.providerList = [];
    message.poolPairList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.port_id = reader.string();
          break;
        case 3:
          message.providerList.push(Provider.decode(reader, reader.uint32()));
          break;
        case 4:
          message.poolPairList.push(PoolPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.providerList = [];
    message.poolPairList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.port_id = String(object.port_id);
    } else {
      message.port_id = "";
    }
    if (object.providerList !== undefined && object.providerList !== null) {
      for (const e of object.providerList) {
        message.providerList.push(Provider.fromJSON(e));
      }
    }
    if (object.poolPairList !== undefined && object.poolPairList !== null) {
      for (const e of object.poolPairList) {
        message.poolPairList.push(PoolPair.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.port_id !== undefined && (obj.port_id = message.port_id);
    if (message.providerList) {
      obj.providerList = message.providerList.map((e) =>
        e ? Provider.toJSON(e) : undefined
      );
    } else {
      obj.providerList = [];
    }
    if (message.poolPairList) {
      obj.poolPairList = message.poolPairList.map((e) =>
        e ? PoolPair.toJSON(e) : undefined
      );
    } else {
      obj.poolPairList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.providerList = [];
    message.poolPairList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.port_id = object.port_id;
    } else {
      message.port_id = "";
    }
    if (object.providerList !== undefined && object.providerList !== null) {
      for (const e of object.providerList) {
        message.providerList.push(Provider.fromPartial(e));
      }
    }
    if (object.poolPairList !== undefined && object.poolPairList !== null) {
      for (const e of object.poolPairList) {
        message.poolPairList.push(PoolPair.fromPartial(e));
      }
    }
    return message;
  },
};

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
