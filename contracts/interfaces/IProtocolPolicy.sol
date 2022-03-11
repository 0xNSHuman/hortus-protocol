// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProtocolPolicy {
    event ProtocolFeePolicyUpdate(
        uint feeNumerator,
        uint feeDenomerator,
        address indexed receiver,
        address indexed setter
    );

    function setProtocolFeePolicy(
        uint feeNumerator,
        uint feeDenomerator,
        address receiver,
        address setter
    ) external;
}