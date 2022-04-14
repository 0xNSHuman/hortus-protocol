# IMembership









## Methods

### configureMembership

```solidity
function configureMembership(address _commerceToken, uint256 _membershipPrice, uint256 _membershipPeriod) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _commerceToken | address | undefined |
| _membershipPrice | uint256 | undefined |
| _membershipPeriod | uint256 | undefined |

### isSubscribed

```solidity
function isSubscribed(address subscriber) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| subscriber | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### subscribe

```solidity
function subscribe() external payable
```






### subscriptionExpiration

```solidity
function subscriptionExpiration(address subscriber) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| subscriber | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### subscriptionExpiration

```solidity
function subscriptionExpiration() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### subscriptionExpiration

```solidity
function subscriptionExpiration(uint256 tokenId) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

### MembershipConfigurationUpdate

```solidity
event MembershipConfigurationUpdate(address indexed commerceToken, uint256 indexed membershipPrice, uint256 indexed membershipPeriod)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| commerceToken `indexed` | address | undefined |
| membershipPrice `indexed` | uint256 | undefined |
| membershipPeriod `indexed` | uint256 | undefined |

### NewSubscription

```solidity
event NewSubscription(uint256 indexed tokenId, uint256 indexed expiration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
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
event SubscriptionExtension(uint256 indexed tokenId, uint256 indexed expiration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId `indexed` | uint256 | undefined |
| expiration `indexed` | uint256 | undefined |



