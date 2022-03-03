/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IStakingInterface extends utils.Interface {
  contractName: "IStaking";
  functions: {
    "claimFees()": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "totalFeesAccumulated()": FunctionFragment;
    "totalStaked()": FunctionFragment;
    "unstake(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "claimFees", values?: undefined): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "totalFeesAccumulated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalStaked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "claimFees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalFeesAccumulated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;

  events: {
    "FeesClaim(address,uint256)": EventFragment;
    "Staking(address,uint256)": EventFragment;
    "Unstaking(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeesClaim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staking"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstaking"): EventFragment;
}

export type FeesClaimEvent = TypedEvent<
  [string, BigNumber],
  { _staker: string; _amount: BigNumber }
>;

export type FeesClaimEventFilter = TypedEventFilter<FeesClaimEvent>;

export type StakingEvent = TypedEvent<
  [string, BigNumber],
  { _staker: string; _amount: BigNumber }
>;

export type StakingEventFilter = TypedEventFilter<StakingEvent>;

export type UnstakingEvent = TypedEvent<
  [string, BigNumber],
  { _staker: string; _amount: BigNumber }
>;

export type UnstakingEventFilter = TypedEventFilter<UnstakingEvent>;

export interface IStaking extends BaseContract {
  contractName: "IStaking";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStakingInterface;

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
    claimFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalStaked(overrides?: CallOverrides): Promise<[BigNumber]>;

    unstake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claimFees(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;

  totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

  unstake(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimFees(overrides?: CallOverrides): Promise<void>;

    stake(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    unstake(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "FeesClaim(address,uint256)"(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): FeesClaimEventFilter;
    FeesClaim(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): FeesClaimEventFilter;

    "Staking(address,uint256)"(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): StakingEventFilter;
    Staking(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): StakingEventFilter;

    "Unstaking(address,uint256)"(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): UnstakingEventFilter;
    Unstaking(
      _staker?: string | null,
      _amount?: BigNumberish | null
    ): UnstakingEventFilter;
  };

  estimateGas: {
    claimFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalFeesAccumulated(overrides?: CallOverrides): Promise<BigNumber>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    unstake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalFeesAccumulated(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalStaked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unstake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
