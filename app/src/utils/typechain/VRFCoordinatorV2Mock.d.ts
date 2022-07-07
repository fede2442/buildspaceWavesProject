/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VRFCoordinatorV2MockInterface extends ethers.utils.Interface {
  functions: {
    "BASE_FEE()": FunctionFragment;
    "GAS_PRICE_LINK()": FunctionFragment;
    "acceptSubscriptionOwnerTransfer(uint64)": FunctionFragment;
    "addConsumer(uint64,address)": FunctionFragment;
    "cancelSubscription(uint64,address)": FunctionFragment;
    "createSubscription()": FunctionFragment;
    "fulfillRandomWords(uint256,address)": FunctionFragment;
    "fundSubscription(uint64,uint96)": FunctionFragment;
    "getRequestConfig()": FunctionFragment;
    "getSubscription(uint64)": FunctionFragment;
    "removeConsumer(uint64,address)": FunctionFragment;
    "requestRandomWords(bytes32,uint64,uint16,uint32,uint32)": FunctionFragment;
    "requestSubscriptionOwnerTransfer(uint64,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BASE_FEE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "GAS_PRICE_LINK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptSubscriptionOwnerTransfer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addConsumer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSubscription",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createSubscription",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fulfillRandomWords",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "fundSubscription",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSubscription",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeConsumer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "requestRandomWords",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestSubscriptionOwnerTransfer",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "BASE_FEE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "GAS_PRICE_LINK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptSubscriptionOwnerTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fulfillRandomWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestRandomWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestSubscriptionOwnerTransfer",
    data: BytesLike
  ): Result;

  events: {
    "RandomWordsFulfilled(uint256,uint256,uint96,bool)": EventFragment;
    "RandomWordsRequested(bytes32,uint256,uint256,uint64,uint16,uint32,uint32,address)": EventFragment;
    "SubscriptionCanceled(uint64,address,uint256)": EventFragment;
    "SubscriptionCreated(uint64,address)": EventFragment;
    "SubscriptionFunded(uint64,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RandomWordsFulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RandomWordsRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionFunded"): EventFragment;
}

export type RandomWordsFulfilledEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, boolean] & {
    requestId: BigNumber;
    outputSeed: BigNumber;
    payment: BigNumber;
    success: boolean;
  }
>;

export type RandomWordsRequestedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, number, number, number, string] & {
    keyHash: string;
    requestId: BigNumber;
    preSeed: BigNumber;
    subId: BigNumber;
    minimumRequestConfirmations: number;
    callbackGasLimit: number;
    numWords: number;
    sender: string;
  }
>;

export type SubscriptionCanceledEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    subId: BigNumber;
    to: string;
    amount: BigNumber;
  }
>;

export type SubscriptionCreatedEvent = TypedEvent<
  [BigNumber, string] & { subId: BigNumber; owner: string }
>;

export type SubscriptionFundedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber] & {
    subId: BigNumber;
    oldBalance: BigNumber;
    newBalance: BigNumber;
  }
>;

export class VRFCoordinatorV2Mock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VRFCoordinatorV2MockInterface;

  functions: {
    BASE_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    GAS_PRICE_LINK(overrides?: CallOverrides): Promise<[BigNumber]>;

    acceptSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[void]>;

    addConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<[void]>;

    cancelSubscription(
      _subId: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    fulfillRandomWords(
      _requestId: BigNumberish,
      _consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    fundSubscription(
      _subId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRequestConfig(
      overrides?: CallOverrides
    ): Promise<[number, number, string[]]>;

    getSubscription(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, string, string[]] & {
        balance: BigNumber;
        reqCount: BigNumber;
        owner: string;
        consumers: string[];
      }
    >;

    removeConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<[void]>;

    requestRandomWords(
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  BASE_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  GAS_PRICE_LINK(overrides?: CallOverrides): Promise<BigNumber>;

  acceptSubscriptionOwnerTransfer(
    _subId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<void>;

  addConsumer(
    _subId: BigNumberish,
    _consumer: string,
    overrides?: CallOverrides
  ): Promise<void>;

  cancelSubscription(
    _subId: BigNumberish,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createSubscription(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  fulfillRandomWords(
    _requestId: BigNumberish,
    _consumer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  fundSubscription(
    _subId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRequestConfig(
    overrides?: CallOverrides
  ): Promise<[number, number, string[]]>;

  getSubscription(
    _subId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, string, string[]] & {
      balance: BigNumber;
      reqCount: BigNumber;
      owner: string;
      consumers: string[];
    }
  >;

  removeConsumer(
    _subId: BigNumberish,
    _consumer: string,
    overrides?: CallOverrides
  ): Promise<void>;

  requestRandomWords(
    _keyHash: BytesLike,
    _subId: BigNumberish,
    _minimumRequestConfirmations: BigNumberish,
    _callbackGasLimit: BigNumberish,
    _numWords: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestSubscriptionOwnerTransfer(
    _subId: BigNumberish,
    _newOwner: string,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    BASE_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    GAS_PRICE_LINK(overrides?: CallOverrides): Promise<BigNumber>;

    acceptSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelSubscription(
      _subId: BigNumberish,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    createSubscription(overrides?: CallOverrides): Promise<BigNumber>;

    fulfillRandomWords(
      _requestId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    fundSubscription(
      _subId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getRequestConfig(
      overrides?: CallOverrides
    ): Promise<[number, number, string[]]>;

    getSubscription(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, string, string[]] & {
        balance: BigNumber;
        reqCount: BigNumber;
        owner: string;
        consumers: string[];
      }
    >;

    removeConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    requestRandomWords(
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "RandomWordsFulfilled(uint256,uint256,uint96,bool)"(
      requestId?: BigNumberish | null,
      outputSeed?: null,
      payment?: null,
      success?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, boolean],
      {
        requestId: BigNumber;
        outputSeed: BigNumber;
        payment: BigNumber;
        success: boolean;
      }
    >;

    RandomWordsFulfilled(
      requestId?: BigNumberish | null,
      outputSeed?: null,
      payment?: null,
      success?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, boolean],
      {
        requestId: BigNumber;
        outputSeed: BigNumber;
        payment: BigNumber;
        success: boolean;
      }
    >;

    "RandomWordsRequested(bytes32,uint256,uint256,uint64,uint16,uint32,uint32,address)"(
      keyHash?: BytesLike | null,
      requestId?: null,
      preSeed?: null,
      subId?: BigNumberish | null,
      minimumRequestConfirmations?: null,
      callbackGasLimit?: null,
      numWords?: null,
      sender?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, number, number, number, string],
      {
        keyHash: string;
        requestId: BigNumber;
        preSeed: BigNumber;
        subId: BigNumber;
        minimumRequestConfirmations: number;
        callbackGasLimit: number;
        numWords: number;
        sender: string;
      }
    >;

    RandomWordsRequested(
      keyHash?: BytesLike | null,
      requestId?: null,
      preSeed?: null,
      subId?: BigNumberish | null,
      minimumRequestConfirmations?: null,
      callbackGasLimit?: null,
      numWords?: null,
      sender?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, number, number, number, string],
      {
        keyHash: string;
        requestId: BigNumber;
        preSeed: BigNumber;
        subId: BigNumber;
        minimumRequestConfirmations: number;
        callbackGasLimit: number;
        numWords: number;
        sender: string;
      }
    >;

    "SubscriptionCanceled(uint64,address,uint256)"(
      subId?: BigNumberish | null,
      to?: null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { subId: BigNumber; to: string; amount: BigNumber }
    >;

    SubscriptionCanceled(
      subId?: BigNumberish | null,
      to?: null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { subId: BigNumber; to: string; amount: BigNumber }
    >;

    "SubscriptionCreated(uint64,address)"(
      subId?: BigNumberish | null,
      owner?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { subId: BigNumber; owner: string }
    >;

    SubscriptionCreated(
      subId?: BigNumberish | null,
      owner?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { subId: BigNumber; owner: string }
    >;

    "SubscriptionFunded(uint64,uint256,uint256)"(
      subId?: BigNumberish | null,
      oldBalance?: null,
      newBalance?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { subId: BigNumber; oldBalance: BigNumber; newBalance: BigNumber }
    >;

    SubscriptionFunded(
      subId?: BigNumberish | null,
      oldBalance?: null,
      newBalance?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { subId: BigNumber; oldBalance: BigNumber; newBalance: BigNumber }
    >;
  };

  estimateGas: {
    BASE_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    GAS_PRICE_LINK(overrides?: CallOverrides): Promise<BigNumber>;

    acceptSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelSubscription(
      _subId: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    fulfillRandomWords(
      _requestId: BigNumberish,
      _consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    fundSubscription(
      _subId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRequestConfig(overrides?: CallOverrides): Promise<BigNumber>;

    getSubscription(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestRandomWords(
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BASE_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    GAS_PRICE_LINK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelSubscription(
      _subId: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    fulfillRandomWords(
      _requestId: BigNumberish,
      _consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    fundSubscription(
      _subId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRequestConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSubscription(
      _subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeConsumer(
      _subId: BigNumberish,
      _consumer: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requestRandomWords(
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestSubscriptionOwnerTransfer(
      _subId: BigNumberish,
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}