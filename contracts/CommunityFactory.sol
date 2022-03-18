// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ICommunityDeployment.sol";
import "./interfaces/IProtocolPolicy.sol";
import "./CommunityVault.sol";

contract CommunityFactory is ICommunityDeployment, IProtocolPolicy {
    /* TYPES */

    struct FeePolicy {
        uint feeNumerator;
        uint feeDenominator;
        address receiver;
        address setter;
    }

    /* STATE */

    FeePolicy private _protocolFeePolicy;

    constructor(
        uint feeNumerator,
        uint feeDenominator,
        address feeReceiver,
        address feeSetter
    ) {
        _setProtocolFeePolicy(
            feeNumerator,
            feeDenominator,
            feeReceiver,
            feeSetter
        );
    }

    /* EXTERNAL FUNCTIONS */

    /** 
    @notice Deploy new community
    */
    function createCommunity(
        string calldata symbol,
        string calldata name,
        address commerceToken, 
        uint membershipPrice,
        uint membershipPeriod
    ) override external returns (address) {
        address community = address(
            new CommunityVault(
                symbol,
                name,
                commerceToken,
                membershipPrice,
                membershipPeriod
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
        uint feeDenominator,
        address receiver,
        address setter
    ) override external {
        require(msg.sender == _protocolFeePolicy.setter, 'Access Denied');

        _setProtocolFeePolicy(
            feeNumerator,
            feeDenominator,
            receiver,
            setter
        );

        emit ProtocolFeePolicyUpdate(
            feeNumerator,
            feeDenominator,
            receiver,
            setter
        );
    }

    /* PRIVATE FUNCTIONS */

    /**
    @notice Set protocol fee policy (called indirectly from public/external functions)
     */
    function _setProtocolFeePolicy(
        uint feeNumerator,
        uint feeDenominator,
        address receiver,
        address setter
    ) private {
        require(feeDenominator > 0, "Invalid fraction");
        require(!(feeNumerator > 0 && receiver == address(0)), "Cannot burn fees");
        require(setter != address(0), "Invalid setter");
        
        _protocolFeePolicy = FeePolicy(
            feeNumerator,
            feeDenominator,
            receiver,
            setter
        );
    }

    /* VIEW FUNCTIONS */

    /** 
    @notice Get current protocol fee policy
    */
    function protocolFeePolicy() override external view returns (uint, uint, address, address) {
        return (
            _protocolFeePolicy.feeNumerator,
            _protocolFeePolicy.feeDenominator,
            _protocolFeePolicy.receiver,
            _protocolFeePolicy.setter
        );
    }
}