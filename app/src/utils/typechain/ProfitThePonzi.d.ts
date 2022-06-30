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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ProfitThePonziInterface extends ethers.utils.Interface {
  functions: {
    "amountOfTickets()": FunctionFragment;
    "buyTicket(uint256)": FunctionFragment;
    "buyerOfTicket(uint256)": FunctionFragment;
    "getContractBalance()": FunctionFragment;
    "getJackpot()": FunctionFragment;
    "getTicketsBoughtBy(address)": FunctionFragment;
    "getTicketsSold()": FunctionFragment;
    "jackpot()": FunctionFragment;
    "lotteryId()": FunctionFragment;
    "pendingWinners(address)": FunctionFragment;
    "retrieveLoot()": FunctionFragment;
    "soldTicketsCounter()": FunctionFragment;
    "superJackpot()": FunctionFragment;
    "ticketOwners(uint256)": FunctionFragment;
    "ticketPrice()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "amountOfTickets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyerOfTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getJackpot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTicketsBoughtBy",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTicketsSold",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "jackpot", values?: undefined): string;
  encodeFunctionData(functionFragment: "lotteryId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingWinners",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "retrieveLoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "soldTicketsCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "superJackpot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ticketOwners",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ticketPrice",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "amountOfTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyTicket", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyerOfTicket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getJackpot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTicketsBoughtBy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTicketsSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "jackpot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lotteryId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingWinners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retrieveLoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "soldTicketsCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "superJackpot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ticketOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ticketPrice",
    data: BytesLike
  ): Result;

  events: {
    "BoughtTicket(uint256,address,uint256)": EventFragment;
    "NewLotteryStarted(uint256)": EventFragment;
    "SuperJackpot(uint256,uint256)": EventFragment;
    "Winner(uint256,address,uint256)": EventFragment;
    "Withdrawal(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BoughtTicket"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewLotteryStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SuperJackpot"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Winner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export type BoughtTicketEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    _lotteryId: BigNumber;
    buyer: string;
    ticketNumber: BigNumber;
  }
>;

export type NewLotteryStartedEvent = TypedEvent<
  [BigNumber] & { newLotteryId: BigNumber }
>;

export type SuperJackpotEvent = TypedEvent<
  [BigNumber, BigNumber] & { _lotteryId: BigNumber; _superJackpot: BigNumber }
>;

export type WinnerEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    _lotteryId: BigNumber;
    winner: string;
    vaultAmount: BigNumber;
  }
>;

export type WithdrawalEvent = TypedEvent<
  [string, BigNumber] & { winner: string; amountWitdrawed: BigNumber }
>;

export class ProfitThePonzi extends BaseContract {
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

  interface: ProfitThePonziInterface;

  functions: {
    amountOfTickets(overrides?: CallOverrides): Promise<[BigNumber]>;

    buyTicket(
      _ticketNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buyerOfTicket(
      _ticketNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getContractBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getJackpot(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTicketsBoughtBy(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ]
      ] & {
        _tickets: [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ];
      }
    >;

    getTicketsSold(
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ]
      ] & {
        _tickets: [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ];
      }
    >;

    jackpot(overrides?: CallOverrides): Promise<[BigNumber]>;

    lotteryId(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;

    pendingWinners(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    retrieveLoot(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    soldTicketsCounter(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;

    superJackpot(overrides?: CallOverrides): Promise<[BigNumber]>;

    ticketOwners(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ticketPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  amountOfTickets(overrides?: CallOverrides): Promise<BigNumber>;

  buyTicket(
    _ticketNumber: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buyerOfTicket(
    _ticketNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

  getTicketsBoughtBy(
    _owner: string,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ]
  >;

  getTicketsSold(
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ]
  >;

  jackpot(overrides?: CallOverrides): Promise<BigNumber>;

  lotteryId(overrides?: CallOverrides): Promise<BigNumber>;

  pendingWinners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  retrieveLoot(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  soldTicketsCounter(overrides?: CallOverrides): Promise<BigNumber>;

  superJackpot(overrides?: CallOverrides): Promise<BigNumber>;

  ticketOwners(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    amountOfTickets(overrides?: CallOverrides): Promise<BigNumber>;

    buyTicket(
      _ticketNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    buyerOfTicket(
      _ticketNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    getTicketsBoughtBy(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ]
    >;

    getTicketsSold(
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ]
    >;

    jackpot(overrides?: CallOverrides): Promise<BigNumber>;

    lotteryId(overrides?: CallOverrides): Promise<BigNumber>;

    pendingWinners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    retrieveLoot(overrides?: CallOverrides): Promise<void>;

    soldTicketsCounter(overrides?: CallOverrides): Promise<BigNumber>;

    superJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    ticketOwners(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "BoughtTicket(uint256,address,uint256)"(
      _lotteryId?: BigNumberish | null,
      buyer?: string | null,
      ticketNumber?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { _lotteryId: BigNumber; buyer: string; ticketNumber: BigNumber }
    >;

    BoughtTicket(
      _lotteryId?: BigNumberish | null,
      buyer?: string | null,
      ticketNumber?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { _lotteryId: BigNumber; buyer: string; ticketNumber: BigNumber }
    >;

    "NewLotteryStarted(uint256)"(
      newLotteryId?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { newLotteryId: BigNumber }>;

    NewLotteryStarted(
      newLotteryId?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { newLotteryId: BigNumber }>;

    "SuperJackpot(uint256,uint256)"(
      _lotteryId?: BigNumberish | null,
      _superJackpot?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { _lotteryId: BigNumber; _superJackpot: BigNumber }
    >;

    SuperJackpot(
      _lotteryId?: BigNumberish | null,
      _superJackpot?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { _lotteryId: BigNumber; _superJackpot: BigNumber }
    >;

    "Winner(uint256,address,uint256)"(
      _lotteryId?: BigNumberish | null,
      winner?: string | null,
      vaultAmount?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { _lotteryId: BigNumber; winner: string; vaultAmount: BigNumber }
    >;

    Winner(
      _lotteryId?: BigNumberish | null,
      winner?: string | null,
      vaultAmount?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { _lotteryId: BigNumber; winner: string; vaultAmount: BigNumber }
    >;

    "Withdrawal(address,uint256)"(
      winner?: string | null,
      amountWitdrawed?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { winner: string; amountWitdrawed: BigNumber }
    >;

    Withdrawal(
      winner?: string | null,
      amountWitdrawed?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { winner: string; amountWitdrawed: BigNumber }
    >;
  };

  estimateGas: {
    amountOfTickets(overrides?: CallOverrides): Promise<BigNumber>;

    buyTicket(
      _ticketNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buyerOfTicket(
      _ticketNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    getTicketsBoughtBy(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTicketsSold(overrides?: CallOverrides): Promise<BigNumber>;

    jackpot(overrides?: CallOverrides): Promise<BigNumber>;

    lotteryId(overrides?: CallOverrides): Promise<BigNumber>;

    pendingWinners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    retrieveLoot(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    soldTicketsCounter(overrides?: CallOverrides): Promise<BigNumber>;

    superJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    ticketOwners(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ticketPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    amountOfTickets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyTicket(
      _ticketNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buyerOfTicket(
      _ticketNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContractBalance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getJackpot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTicketsBoughtBy(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTicketsSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    jackpot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lotteryId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingWinners(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    retrieveLoot(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    soldTicketsCounter(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    superJackpot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ticketOwners(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ticketPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
