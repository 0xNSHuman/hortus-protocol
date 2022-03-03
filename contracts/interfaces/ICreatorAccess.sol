// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICreatorAccess {
    event CreatorRewardsWithdrawal(address indexed creator, uint indexed amount);
    
    function withdrawCreatorRewards() external returns (uint);
    function totalCreatorRewardsAccumulated() external view returns (uint);
}