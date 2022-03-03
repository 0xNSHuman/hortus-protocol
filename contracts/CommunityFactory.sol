// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ICommunityDeployment.sol";
import "./CommunityVault.sol";

contract CommunityFactory is ICommunityDeployment {
    /** 
    @notice Deploy new community
    */
    function createCommunity(
        string calldata _symbol,
        string calldata _name,
        address _commerceToken, 
        uint _membershipPrice
    ) override external returns (address) {
        address community = address(
            new CommunityVault(
                _symbol,
                _name,
                _commerceToken,
                _membershipPrice
            )
        );

        emit CommunityDeployment(msg.sender, community);

        return community;
    }
}