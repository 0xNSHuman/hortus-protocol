/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ICommunityDeployment,
  ICommunityDeploymentInterface,
} from "../ICommunityDeployment";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "community",
        type: "address",
      },
    ],
    name: "CommunityDeployment",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_commerceToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_membershipPrice",
        type: "uint256",
      },
    ],
    name: "createCommunity",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ICommunityDeployment__factory {
  static readonly abi = _abi;
  static createInterface(): ICommunityDeploymentInterface {
    return new utils.Interface(_abi) as ICommunityDeploymentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICommunityDeployment {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ICommunityDeployment;
  }
}