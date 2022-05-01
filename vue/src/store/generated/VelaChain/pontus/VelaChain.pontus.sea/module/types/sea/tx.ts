/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "VelaChain.pontus.sea";

export interface MsgCreatePoolPair {
  creator: string;
  alphaDenom: string;
  alphaAmount: string;
  betaDenom: string;
  betaAmount: string;
  shareAmount: string;
  swapFee: string;
  exitFee: string;
}

export interface MsgCreatePoolPairResponse {}

const baseMsgCreatePoolPair: object = {
  creator: "",
  alphaDenom: "",
  alphaAmount: "",
  betaDenom: "",
  betaAmount: "",
  shareAmount: "",
  swapFee: "",
  exitFee: "",
};

export const MsgCreatePoolPair = {
  encode(message: MsgCreatePoolPair, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.alphaDenom !== "") {
      writer.uint32(18).string(message.alphaDenom);
    }
    if (message.alphaAmount !== "") {
      writer.uint32(26).string(message.alphaAmount);
    }
    if (message.betaDenom !== "") {
      writer.uint32(34).string(message.betaDenom);
    }
    if (message.betaAmount !== "") {
      writer.uint32(42).string(message.betaAmount);
    }
    if (message.shareAmount !== "") {
      writer.uint32(50).string(message.shareAmount);
    }
    if (message.swapFee !== "") {
      writer.uint32(58).string(message.swapFee);
    }
    if (message.exitFee !== "") {
      writer.uint32(66).string(message.exitFee);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePoolPair {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePoolPair } as MsgCreatePoolPair;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.alphaDenom = reader.string();
          break;
        case 3:
          message.alphaAmount = reader.string();
          break;
        case 4:
          message.betaDenom = reader.string();
          break;
        case 5:
          message.betaAmount = reader.string();
          break;
        case 6:
          message.shareAmount = reader.string();
          break;
        case 7:
          message.swapFee = reader.string();
          break;
        case 8:
          message.exitFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePoolPair {
    const message = { ...baseMsgCreatePoolPair } as MsgCreatePoolPair;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.alphaDenom !== undefined && object.alphaDenom !== null) {
      message.alphaDenom = String(object.alphaDenom);
    } else {
      message.alphaDenom = "";
    }
    if (object.alphaAmount !== undefined && object.alphaAmount !== null) {
      message.alphaAmount = String(object.alphaAmount);
    } else {
      message.alphaAmount = "";
    }
    if (object.betaDenom !== undefined && object.betaDenom !== null) {
      message.betaDenom = String(object.betaDenom);
    } else {
      message.betaDenom = "";
    }
    if (object.betaAmount !== undefined && object.betaAmount !== null) {
      message.betaAmount = String(object.betaAmount);
    } else {
      message.betaAmount = "";
    }
    if (object.shareAmount !== undefined && object.shareAmount !== null) {
      message.shareAmount = String(object.shareAmount);
    } else {
      message.shareAmount = "";
    }
    if (object.swapFee !== undefined && object.swapFee !== null) {
      message.swapFee = String(object.swapFee);
    } else {
      message.swapFee = "";
    }
    if (object.exitFee !== undefined && object.exitFee !== null) {
      message.exitFee = String(object.exitFee);
    } else {
      message.exitFee = "";
    }
    return message;
  },

  toJSON(message: MsgCreatePoolPair): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.alphaDenom !== undefined && (obj.alphaDenom = message.alphaDenom);
    message.alphaAmount !== undefined &&
      (obj.alphaAmount = message.alphaAmount);
    message.betaDenom !== undefined && (obj.betaDenom = message.betaDenom);
    message.betaAmount !== undefined && (obj.betaAmount = message.betaAmount);
    message.shareAmount !== undefined &&
      (obj.shareAmount = message.shareAmount);
    message.swapFee !== undefined && (obj.swapFee = message.swapFee);
    message.exitFee !== undefined && (obj.exitFee = message.exitFee);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreatePoolPair>): MsgCreatePoolPair {
    const message = { ...baseMsgCreatePoolPair } as MsgCreatePoolPair;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.alphaDenom !== undefined && object.alphaDenom !== null) {
      message.alphaDenom = object.alphaDenom;
    } else {
      message.alphaDenom = "";
    }
    if (object.alphaAmount !== undefined && object.alphaAmount !== null) {
      message.alphaAmount = object.alphaAmount;
    } else {
      message.alphaAmount = "";
    }
    if (object.betaDenom !== undefined && object.betaDenom !== null) {
      message.betaDenom = object.betaDenom;
    } else {
      message.betaDenom = "";
    }
    if (object.betaAmount !== undefined && object.betaAmount !== null) {
      message.betaAmount = object.betaAmount;
    } else {
      message.betaAmount = "";
    }
    if (object.shareAmount !== undefined && object.shareAmount !== null) {
      message.shareAmount = object.shareAmount;
    } else {
      message.shareAmount = "";
    }
    if (object.swapFee !== undefined && object.swapFee !== null) {
      message.swapFee = object.swapFee;
    } else {
      message.swapFee = "";
    }
    if (object.exitFee !== undefined && object.exitFee !== null) {
      message.exitFee = object.exitFee;
    } else {
      message.exitFee = "";
    }
    return message;
  },
};

const baseMsgCreatePoolPairResponse: object = {};

export const MsgCreatePoolPairResponse = {
  encode(
    _: MsgCreatePoolPairResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreatePoolPairResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePoolPairResponse,
    } as MsgCreatePoolPairResponse;
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

  fromJSON(_: any): MsgCreatePoolPairResponse {
    const message = {
      ...baseMsgCreatePoolPairResponse,
    } as MsgCreatePoolPairResponse;
    return message;
  },

  toJSON(_: MsgCreatePoolPairResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreatePoolPairResponse>
  ): MsgCreatePoolPairResponse {
    const message = {
      ...baseMsgCreatePoolPairResponse,
    } as MsgCreatePoolPairResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreatePoolPair(
    request: MsgCreatePoolPair
  ): Promise<MsgCreatePoolPairResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreatePoolPair(
    request: MsgCreatePoolPair
  ): Promise<MsgCreatePoolPairResponse> {
    const data = MsgCreatePoolPair.encode(request).finish();
    const promise = this.rpc.request(
      "VelaChain.pontus.sea.Msg",
      "CreatePoolPair",
      data
    );
    return promise.then((data) =>
      MsgCreatePoolPairResponse.decode(new Reader(data))
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
