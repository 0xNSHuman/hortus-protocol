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

export interface IProtocolPolicyInterface extends utils.Interface {
  contractName: "IProtocolPolicy";
  functions: {
    "setProtocolFeePolicy(uint256,uint256,address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "setProtocolFeePolicy",
    values: [BigNumberish, BigNumberish, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "setProtocolFeePolicy",
    data: BytesLike
  ): Result;

  events: {
    "ProtocolFeePolicyUpdate(uint256,uint256,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProtocolFeePolicyUpdate"): EventFragment;
}

export type ProtocolFeePolicyUpdateEvent = TypedEvent<
  [BigNumber, BigNumber, string, string],
  {
    feeNumerator: BigNumber;
    feeDenomerator: BigNumber;
    receiver: string;
    setter: string;
  }
>;

export type ProtocolFeePolicyUpdateEventFilter =
  TypedEventFilter<ProtocolFeePolicyUpdateEvent>;

export interface IProtocolPolicy extends BaseContract {
  contractName: "IProtocolPolicy";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProtocolPolicyInterface;

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
    setProtocolFeePolicy(
      feeNumerator: BigNumberish,
      feeDenomerator: BigNumberish,
      receiver: string,
      setter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  setProtocolFeePolicy(
    feeNumerator: BigNumberish,
    feeDenomerator: BigNumberish,
    receiver: string,
    setter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    setProtocolFeePolicy(
      feeNumerator: BigNumberish,
      feeDenomerator: BigNumberish,
      receiver: string,
      setter: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProtocolFeePolicyUpdate(uint256,uint256,address,address)"(
      feeNumerator?: null,
      feeDenomerator?: null,
      receiver?: string | null,
      setter?: string | null
    ): ProtocolFeePolicyUpdateEventFilter;
    ProtocolFeePolicyUpdate(
      feeNumerator?: null,
      feeDenomerator?: null,
      receiver?: string | null,
      setter?: string | null
    ): ProtocolFeePolicyUpdateEventFilter;
  };

  estimateGas: {
    setProtocolFeePolicy(
      feeNumerator: BigNumberish,
      feeDenomerator: BigNumberish,
      receiver: string,
      setter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    setProtocolFeePolicy(
      feeNumerator: BigNumberish,
      feeDenomerator: BigNumberish,
      receiver: string,
      setter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
