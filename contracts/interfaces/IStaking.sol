// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStaking {
    event Staking(address indexed _staker, uint indexed _amount);
    event Unstaking(address indexed _staker, uint indexed _amount);
    event FeesClaim(address indexed _staker, uint indexed _amount);

    function stake(uint _amount) external;
    function unstake(uint256 _amount) external;
    function claimFees() external;

    function totalStaked() external view returns (uint256);
    function totalFeesAccumulated() external view returns (uint256);
}