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

export interface ICommunityDeploymentInterface extends utils.Interface {
  contractName: "ICommunityDeployment";
  functions: {
    "createCommunity(string,string,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createCommunity",
    values: [string, string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createCommunity",
    data: BytesLike
  ): Result;

  events: {
    "CommunityDeployment(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CommunityDeployment"): EventFragment;
}

export type CommunityDeploymentEvent = TypedEvent<
  [string, string],
  { creator: string; community: string }
>;

export type CommunityDeploymentEventFilter =
  TypedEventFilter<CommunityDeploymentEvent>;

export interface ICommunityDeployment extends BaseContract {
  contractName: "ICommunityDeployment";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICommunityDeploymentInterface;

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
    createCommunity(
      _symbol: string,
      _name: string,
      _commerceToken: string,
      _membershipPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createCommunity(
    _symbol: string,
    _name: string,
    _commerceToken: string,
    _membershipPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createCommunity(
      _symbol: string,
      _name: string,
      _commerceToken: string,
      _membershipPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "CommunityDeployment(address,address)"(
      creator?: string | null,
      community?: string | null
    ): CommunityDeploymentEventFilter;
    CommunityDeployment(
      creator?: string | null,
      community?: string | null
    ): CommunityDeploymentEventFilter;
  };

  estimateGas: {
    createCommunity(
      _symbol: string,
      _name: string,
      _commerceToken: string,
      _membershipPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createCommunity(
      _symbol: string,
      _name: string,
      _commerceToken: string,
      _membershipPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
