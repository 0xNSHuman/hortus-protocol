// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommunityDeployment {
    event CommunityDeployment(address indexed creator, address indexed community);

    function createCommunity(
        string calldata symbol,
        string calldata name,
        address commerceToken, 
        uint membershipPrice,
        uint membershipPeriod
    ) external returns (address);
}