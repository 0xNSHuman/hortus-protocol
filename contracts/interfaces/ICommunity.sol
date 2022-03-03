// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommunity {
    event ConfigurationUpdate(address indexed commerceToken, uint indexed membershipPrice);
    
    function configure(address _commerceToken, uint _membershipPrice) external;
}