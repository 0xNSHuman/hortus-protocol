// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProtocolPolicy {
    event ProtocolFeePolicyUpdate(
        uint feeNumerator,
        uint feeDenominator,
        address indexed receiver,
        address indexed setter
    );

    function setProtocolFeePolicy(
        uint feeNumerator,
        uint feeDenominator,
        address receiver,
        address setter
    ) external;

    function protocolFeePolicy() external view returns (uint, uint, address, address);
}