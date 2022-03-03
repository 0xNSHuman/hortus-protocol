/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ITreasuryInterface extends utils.Interface {
  contractName: "ITreasury";
  functions: {
    "stakerFeeDisributionFraction()": FunctionFragment;
    "totalFeesAccumulated()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "stakerFeeDisributionFraction",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalFeesAccumulated",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "stakerFeeDisributionFraction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalFeesAccumulated",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ITreasury extends BaseContract {
  contractName: "ITreasury";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITreasuryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    stakerFeeDisributionFraction(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  stakerFeeDisributionFraction(overrides?: CallOverrides): Promise<BigNumber>;

  totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    stakerFeeDisributionFraction(overrides?: CallOverrides): Promise<BigNumber>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    stakerFeeDisributionFraction(overrides?: CallOverrides): Promise<BigNumber>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    stakerFeeDisributionFraction(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalFeesAccumulated(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}