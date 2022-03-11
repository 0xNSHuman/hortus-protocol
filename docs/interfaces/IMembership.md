# IMembership









## Methods

### claimRewards

```solidity
function claimRewards() external nonpayable
```






### subscribe

```solidity
function subscribe() external payable
```






### subscriptionExpiration

```solidity
function subscriptionExpiration() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalRewardsAccumulated

```solidity
function totalRewardsAccumulated() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

### NewSubscription

```solidity
event NewSubscription(address indexed supporter, uint256 indexed expiration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| supporter `indexed` | address | undefined |
| expiration `indexed` | uint256 | undefined |

### RewardsClaim

```solidity
event RewardsClaim(address indexed supporter, uint256 indexed amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| supporter `indexed` | address | undefined |
| amount `indexed` | uint256 | undefined |

### SubscriptionExtension

```solidity
event SubscriptionExtension(uint256 indexed tokenId, uint256 expiration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| expiration  | uint256 | undefined |



