//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ICommunity.sol";
import "./interfaces/ICreatorAccess.sol";
import "./interfaces/IMembership.sol";

contract CommunityVault is ERC721, 
Ownable,
ICommunity,
ICreatorAccess,
IMembership {
    using SafeMath for uint;
    using Counters for Counters.Counter;

    address public commerceToken;
    uint public membershipPrice;
    Counters.Counter private _tokenIdCounter;
    mapping(address => uint) private _membershipExpirations;

    constructor(
        string memory _symbol,
        string memory _name,
        address _commerceToken,
        uint _membershipPrice
    ) ERC721(
        _name, _symbol
    ) {
        commerceToken = _commerceToken;
        membershipPrice = _membershipPrice;
    }

    /* EXTERNAL FUNCTIONS */

    /** 
    @notice Update community settings
    */
    function configure(address _commerceToken, uint _membershipPrice) override external onlyOwner {

    }

    /** 
    @notice Withdraw the payments accumulated for creator
    */
    function withdrawCreatorRewards() override external onlyOwner returns (uint) {

    }

    /** 
    @notice Purchase membership
    */
    function subscribe() override external payable {

    }

    /** 
    @notice Claim accumulated membership rewards
    */
    function claimRewards() override external {

    }

    /* ERC-721 FUNCTIONS */

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /* VIEW FUNCTIONS */

    /** 
    @notice Get total withdrawable amount for creator
    */
    function totalCreatorRewardsAccumulated() override external view returns (uint) {
        
    }

    /** 
    @notice Get subscription expiration date
    */
    function subscriptionExpiration() override external view returns (uint) {

    }

    /** 
    @notice Get total withdrawable amount for subscriber
    */
    function totalRewardsAccumulated() override external view returns (uint) {

    }
}