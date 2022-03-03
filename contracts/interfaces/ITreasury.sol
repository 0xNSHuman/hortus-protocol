// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITreasury {
    function totalFeesAccumulated() external view returns (uint);
    function stakerFeeDisributionFraction() external view returns (uint);
}