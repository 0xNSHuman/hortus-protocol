// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMembership {
    event NewSubscription(address indexed supporter, uint indexed expiration);
    event SubscriptionExtension(uint indexed tokenId, uint expiration);
    event RewardsClaim(address indexed supporter, uint indexed amount);

    function subscribe() external payable;
    function claimRewards() external;

    function subscriptionExpiration() external view returns (uint);
    function totalRewardsAccumulated() external view returns (uint);
}