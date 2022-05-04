// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICommunity {
    event EnvironmentUpdate(string indexed uri);
    event ProfileUpdate(string indexed uri);
    
    function updateEnvironment(string calldata uri) external;
    function updateProfile(string calldata uri) external;
}