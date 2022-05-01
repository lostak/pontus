/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "VelaChain.pontus.sea";

export interface PoolPair {
  alphaDenom: string;
  betaDenom: string;
  alphaAmount: string;
  betaAmount: string;
  shareAmount: string;
  swapFee: string;
  exitFee: string;
}

const basePoolPair: object = {
  alphaDenom: "",
  betaDenom: "",
  alphaAmount: "",
  betaAmount: "",
  shareAmount: "",
  swapFee: "",
  exitFee: "",
};

export const PoolPair = {
  encode(message: PoolPair, writer: Writer = Writer.create()): Writer {
    if (message.alphaDenom !== "") {
      writer.uint32(10).string(message.alphaDenom);
    }
    if (message.betaDenom !== "") {
      writer.uint32(18).string(message.betaDenom);
    }
    if (message.alphaAmount !== "") {
      writer.uint32(26).string(message.alphaAmount);
    }
    if (message.betaAmount !== "") {
      writer.uint32(34).string(message.betaAmount);
    }
    if (message.shareAmount !== "") {
      writer.uint32(42).string(message.shareAmount);
    }
    if (message.swapFee !== "") {
      writer.uint32(50).string(message.swapFee);
    }
    if (message.exitFee !== "") {
      writer.uint32(58).string(message.exitFee);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PoolPair {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolPair } as PoolPair;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alphaDenom = reader.string();
          break;
        case 2:
          message.betaDenom = reader.string();
          break;
        case 3:
          message.alphaAmount = reader.string();
          break;
        case 4:
          message.betaAmount = reader.string();
          break;
        case 5:
          message.shareAmount = reader.string();
          break;
        case 6:
          message.swapFee = reader.string();
          break;
        case 7:
          message.exitFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolPair {
    const message = { ...basePoolPair } as PoolPair;
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
    if (object.alphaAmount !== undefined && object.alphaAmount !== null) {
      message.alphaAmount = String(object.alphaAmount);
    } else {
      message.alphaAmount = "";
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

  toJSON(message: PoolPair): unknown {
    const obj: any = {};
    message.alphaDenom !== undefined && (obj.alphaDenom = message.alphaDenom);
    message.betaDenom !== undefined && (obj.betaDenom = message.betaDenom);
    message.alphaAmount !== undefined &&
      (obj.alphaAmount = message.alphaAmount);
    message.betaAmount !== undefined && (obj.betaAmount = message.betaAmount);
    message.shareAmount !== undefined &&
      (obj.shareAmount = message.shareAmount);
    message.swapFee !== undefined && (obj.swapFee = message.swapFee);
    message.exitFee !== undefined && (obj.exitFee = message.exitFee);
    return obj;
  },

  fromPartial(object: DeepPartial<PoolPair>): PoolPair {
    const message = { ...basePoolPair } as PoolPair;
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
    if (object.alphaAmount !== undefined && object.alphaAmount !== null) {
      message.alphaAmount = object.alphaAmount;
    } else {
      message.alphaAmount = "";
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
