// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ICommunityDeployment.sol";
import "./interfaces/IProtocolPolicy.sol";
import "./CommunityVault.sol";

contract CommunityFactory is ICommunityDeployment, IProtocolPolicy {
    struct FeePolicy {
        uint feeNumerator;
        uint feeDenomerator;
        address receiver;
        address setter;
    }

    FeePolicy public protocolFeePolicy;

    constructor(
        uint feeNumerator,
        uint feeDenomerator,
        address feeReceiver,
        address feeSetter
    ) {
        protocolFeePolicy = FeePolicy(
            feeNumerator,
            feeDenomerator,
            feeReceiver,
            feeSetter
        );
    }

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

    /**
    @notice Set protocol fee policy
     */
    function setProtocolFeePolicy(
        uint feeNumerator,
        uint feeDenomerator,
        address receiver,
        address setter
    ) override external {
        require(msg.sender == protocolFeePolicy.setter, 'Access Denied');
        
        protocolFeePolicy = FeePolicy(
            feeNumerator,
            feeDenomerator,
            receiver,
            setter
        );

        emit ProtocolFeePolicyUpdate(
            feeNumerator,
            feeDenomerator,
            receiver,
            setter
        );
    }
}