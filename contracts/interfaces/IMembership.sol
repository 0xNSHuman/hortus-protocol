// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMembership {
    event MembershipConfigurationUpdate(address indexed commerceToken, uint indexed membershipPrice, uint indexed membershipPeriod);
    event NewSubscription(uint indexed tokenId, uint indexed expiration);
    event SubscriptionExtension(uint indexed tokenId, uint indexed expiration);
    event RewardsClaim(address indexed supporter, uint indexed amount);

    function configureMembership(address _commerceToken, uint _membershipPrice, uint _membershipPeriod) external;
    function subscribe() external payable;

    function subscriptionExpiration(uint tokenId) external view returns (uint);
}