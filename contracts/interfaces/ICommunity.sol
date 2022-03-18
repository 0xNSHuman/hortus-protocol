// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommunity {
    event ProfileUpdate(string indexed uri);
    
    function updateProfile(string calldata uri) external;
}