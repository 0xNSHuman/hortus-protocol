# CommunityFactory









## Methods

### createCommunity

```solidity
function createCommunity(string symbol, string name, address commerceToken, uint256 membershipPrice, uint256 membershipPeriod) external nonpayable returns (address)
```

Deploy new community



#### Parameters

| Name | Type | Description |
|---|---|---|
| symbol | string | undefined |
| name | string | undefined |
| commerceToken | address | undefined |
| membershipPrice | uint256 | undefined |
| membershipPeriod | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### protocolFeePolicy

```solidity
function protocolFeePolicy() external view returns (uint256, uint256, address, address)
```

Get current protocol fee policy




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256 | undefined |
| _2 | address | undefined |
| _3 | address | undefined |

### setProtocolFeePolicy

```solidity
function setProtocolFeePolicy(uint256 feeNumerator, uint256 feeDenominator, address receiver, address setter) external nonpayable
```

Set protocol fee policy



#### Parameters

| Name | Type | Description |
|---|---|---|
| feeNumerator | uint256 | undefined |
| feeDenominator | uint256 | undefined |
| receiver | address | undefined |
| setter | address | undefined |



## Events

### CommunityDeployment

```solidity
event CommunityDeployment(address indexed creator, address indexed community)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| creator `indexed` | address | undefined |
| community `indexed` | address | undefined |

### ProtocolFeePolicyUpdate

```solidity
event ProtocolFeePolicyUpdate(uint256 feeNumerator, uint256 feeDenominator, address indexed receiver, address indexed setter)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeNumerator  | uint256 | undefined |
| feeDenominator  | uint256 | undefined |
| receiver `indexed` | address | undefined |
| setter `indexed` | address | undefined |



