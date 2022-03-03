// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommunityDeployment {
    event CommunityDeployment(address indexed creator, address indexed community);

    function createCommunity(
        string calldata _symbol,
        string calldata _name,
        address _commerceToken, 
        uint _membershipPrice
    ) external returns (address);
}