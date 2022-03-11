//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/ICommunity.sol";
import "./interfaces/ICreatorAccess.sol";
import "./interfaces/IMembership.sol";

contract CommunityVault is ERC721, 
Ownable,
ICommunity,
ICreatorAccess,
IMembership,
ReentrancyGuard {
    using SafeMath for uint;
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    address public commerceToken;
    uint public membershipPrice;
    Counters.Counter private _tokenIdCounter;
    mapping(address => uint) private _membershipExpirations;
    mapping(address => uint) private _creatorFunds;

    constructor(
        string memory _symbol,
        string memory _name,
        address _commerceToken,
        uint _membershipPrice
    ) ERC721(
        _name, _symbol
    ) {
        require(bytes(_symbol).length != 0, "Empty symbol");
        require(bytes(_name).length != 0, "Empty name");

        commerceToken = _commerceToken;
        membershipPrice = _membershipPrice;
    }

    /* EXTERNAL FUNCTIONS */

    /** 
    @notice Update community settings
    */
    function configure(address _commerceToken, uint _membershipPrice) override external onlyOwner {
        commerceToken = _commerceToken;
        membershipPrice = _membershipPrice;

        emit ConfigurationUpdate(commerceToken, membershipPrice);
    }

    /** 
    @notice Withdraw the payments accumulated for creator
    */
    function withdrawCreatorRewards(address _token) override external onlyOwner nonReentrant {
        uint amount = _creatorFunds[_token];

        if (amount == 0) { return; }

        _creatorFunds[_token] = 0;

        if (_token == address(0)) {
            (bool sent, ) = msg.sender.call{value: amount}("");
            require(sent, "Ether withdrawal failure");
        } else {
            IERC20(_token).safeIncreaseAllowance(address(this), amount);
            IERC20(_token).safeTransfer(msg.sender, amount);
        }

        emit CreatorRewardsWithdrawal(msg.sender, _token, amount);
    }

    /** 
    @notice Purchase membership
    */
    function subscribe() override nonReentrant external payable {
        _creatorFunds[commerceToken] += membershipPrice;

        if (commerceToken == address(0)) {
            require(msg.value == membershipPrice, "Price not matched");
        } else {
            _subscribeWithERC20();
        }
    }

    /** 
    @notice Purchase membership with an ERC-20 token
    */
    function _subscribeWithERC20() private {
        require(msg.value == 0, "Ether is not accepted");
        require(IERC20(commerceToken).allowance(msg.sender, address(this)) >= membershipPrice, "Token allowance is not sufficient");
        IERC20(commerceToken).safeTransferFrom(msg.sender, address(this), membershipPrice);
    }

    /** 
    @notice Claim accumulated membership rewards
    */
    function claimRewards() override nonReentrant external {

    }

    /**
    @notice Receive ether arbitrarily
     */
    receive() external payable {} // TODO: Remove when the proper ETH acceptance mechanism is implemented

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
    function totalCreatorRewardsAccumulated(address _token) override external view returns (uint) {
        return _creatorFunds[_token];
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
