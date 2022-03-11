# CommunityFactory









## Methods

### createCommunity

```solidity
function createCommunity(string _symbol, string _name, address _commerceToken, uint256 _membershipPrice) external nonpayable returns (address)
```

Deploy new community



#### Parameters

| Name | Type | Description |
|---|---|---|
| _symbol | string | undefined |
| _name | string | undefined |
| _commerceToken | address | undefined |
| _membershipPrice | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### protocolFeePolicy

```solidity
function protocolFeePolicy() external view returns (uint256 feeNumerator, uint256 feeDenomerator, address receiver, address setter)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| feeNumerator | uint256 | undefined |
| feeDenomerator | uint256 | undefined |
| receiver | address | undefined |
| setter | address | undefined |

### setProtocolFeePolicy

```solidity
function setProtocolFeePolicy(uint256 feeNumerator, uint256 feeDenomerator, address receiver, address setter) external nonpayable
```

Set protocol fee policy



#### Parameters

| Name | Type | Description |
|---|---|---|
| feeNumerator | uint256 | undefined |
| feeDenomerator | uint256 | undefined |
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
event ProtocolFeePolicyUpdate(uint256 feeNumerator, uint256 feeDenomerator, address indexed receiver, address indexed setter)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeNumerator  | uint256 | undefined |
| feeDenomerator  | uint256 | undefined |
| receiver `indexed` | address | undefined |
| setter `indexed` | address | undefined |



