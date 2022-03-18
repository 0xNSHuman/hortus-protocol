// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICreatorAccess {
    event CreatorRewardsWithdrawal(address indexed creator, address indexed token, uint indexed amount);
    
    function withdrawCreatorRewards(address token) external;
    
    function totalCreatorRewardsAccumulated(address token) external view returns (uint);
}