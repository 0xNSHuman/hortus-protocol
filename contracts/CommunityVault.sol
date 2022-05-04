//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IProtocolPolicy.sol";
import "./interfaces/ICommunity.sol";
import "./interfaces/ICreatorAccess.sol";
import "./interfaces/IMembership.sol";

contract CommunityVault is ERC721Enumerable, 
Ownable,
ICommunity,
ICreatorAccess,
IMembership,
ReentrancyGuard {
    /* TYPES */

    using SafeMath for uint;
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    /* STATE */

    address public factory;
    address public commerceToken;
    uint public membershipPrice;
    uint public membershipPeriod;
    string public envURI;
    string public profileURI;
    Counters.Counter private _tokenIdCounter;
    mapping(uint => uint) private _membershipExpirations;
    mapping(address => uint) private _creatorFunds;

    constructor(
        string memory symbol,
        string memory name,
        address _commerceToken,
        uint _membershipPrice,
        uint _membershipPeriod
    ) ERC721(
        name, symbol
    ) {
        require(bytes(symbol).length != 0, "Empty symbol");
        require(bytes(name).length != 0, "Empty name");
        require(_membershipPeriod > 0, "Invalid period");

        factory = msg.sender;
        transferOwnership(tx.origin);

        commerceToken = _commerceToken;
        membershipPrice = _membershipPrice;
        membershipPeriod = _membershipPeriod;
    }

    /* EXTERNAL FUNCTIONS */

    /** 
    @notice Update community membership settings
    */
    function configureMembership(address _commerceToken, uint _membershipPrice, uint _membershipPeriod) override external onlyOwner {
        require(_membershipPeriod > 0, "Invalid period");

        commerceToken = _commerceToken;
        membershipPrice = _membershipPrice;
        membershipPeriod = _membershipPeriod;

        emit MembershipConfigurationUpdate(_commerceToken, _membershipPrice, _membershipPeriod);
    }

    /**
    @notice Update community environment config reference
    */
    function updateEnvironment(string calldata uri) override external onlyOwner { 
        envURI = uri;
        emit EnvironmentUpdate(uri);
    }

    /**
    @notice Update community profile reference
    */
    function updateProfile(string calldata uri) override external onlyOwner {
        profileURI = uri;
        emit ProfileUpdate(uri);
    }

    /** 
    @notice Withdraw the payments accumulated for creator
    */
    function withdrawCreatorRewards(address token) override external onlyOwner nonReentrant {
        uint amount = _creatorFunds[token];

        if (amount == 0) { return; }

        _creatorFunds[token] = 0;

        if (token == address(0)) {
            _transferTo(payable(msg.sender), amount);
        } else {
            IERC20(token).safeIncreaseAllowance(address(this), amount);
            IERC20(token).safeTransfer(msg.sender, amount);
        }

        emit CreatorRewardsWithdrawal(msg.sender, token, amount);
    }

    /** 
    @notice Purchase membership
    */
    function subscribe() override nonReentrant external payable {
        (uint feeNumerator, uint feeDenominator, address feeReceiver, ) = IProtocolPolicy(factory).protocolFeePolicy();
        uint fee;

        if (feeNumerator == 0) {
            fee = 0;
        } else {
            fee = membershipPrice.mul(feeNumerator).div(feeDenominator);
        }

        uint creatorReward = membershipPrice.sub(fee);
        _creatorFunds[commerceToken] = _creatorFunds[commerceToken].add(creatorReward);

        if (commerceToken == address(0)) {
            require(msg.value == membershipPrice, "Price not matched");
            _transferTo(payable(feeReceiver), fee);
        } else {
            _chargeWithERC20(creatorReward, fee, payable(feeReceiver));
        }

        _extendSubscription();
    }

    /* PRIVATE FUNCTIONS */

    /** 
    @notice Purchase membership with an ERC-20 token
    */
    function _chargeWithERC20(uint creatorReward, uint fee, address payable feeReceiver) private {
        require(msg.value == 0, "ETH not accepted");
        require(IERC20(commerceToken).allowance(msg.sender, address(this)) >= membershipPrice, "Insufficient allowance");
        IERC20(commerceToken).safeTransferFrom(msg.sender, address(this), creatorReward);
        IERC20(commerceToken).safeTransferFrom(msg.sender, feeReceiver, fee);
    }

    /** 
    @notice Transfer ETH
    */
    function _transferTo(address payable to, uint value) private {
        (bool sent, ) = to.call{value: value}("");
        assert(sent);
    }

    /**
    @notice Create or extend subscription
    */
    function _extendSubscription() private {
        require(balanceOf(msg.sender) <= 1, "Duplicate NFTs");

        bool isNew;
        uint tokenId;
        if (balanceOf(msg.sender) == 1) {
            tokenId = tokenOfOwnerByIndex(msg.sender, 0);
        } else { 
            isNew = true;
            tokenId = _tokenIdCounter.current();
            _safeMint(msg.sender);
        }

        uint expiration = _membershipExpirations[tokenId];
        if (expiration > block.number) {
            expiration = expiration.add(membershipPeriod);
        } else {
            expiration = block.number.add(membershipPeriod);
        }

        _membershipExpirations[tokenId] = expiration;

        if (isNew) {
            emit NewSubscription(tokenId, expiration);
        } else {
            emit SubscriptionExtension(tokenId, expiration);
        }
    }

    /** 
    @notice Mint ERC-721 token
    */
    function _safeMint(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /* VIEW FUNCTIONS */

    /** 
    @notice Get total withdrawable amount for creator
    */
    function totalCreatorRewardsAccumulated(address token) override external view returns (uint) {
        return _creatorFunds[token];
    }

    /** 
    @notice Verify subscription status for a given address
    */
    function isSubscribed(address subscriber) override external view returns (bool) {
        return this.subscriptionExpiration(subscriber) > block.number;
    }

    /** 
    @notice Get subscription expiration date for the message sender
    */
    function subscriptionExpiration() override external view returns (uint) {
        return this.subscriptionExpiration(msg.sender);
    }

    /** 
    @notice Get subscription expiration date for a given address
    */
    function subscriptionExpiration(address subscriber) override external view returns (uint) {
        if (balanceOf(subscriber) == 1) {
            uint tokenId = tokenOfOwnerByIndex(msg.sender, 0);
            return this.subscriptionExpiration(tokenId);
        } else { 
            return 0;
        }
    }

    /** 
    @notice Get subscription expiration date for a given membership token
    */
    function subscriptionExpiration(uint tokenId) override external view returns (uint) {
        return _membershipExpirations[tokenId];
    }
}
