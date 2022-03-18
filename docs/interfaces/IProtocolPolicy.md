# IProtocolPolicy









## Methods

### protocolFeePolicy

```solidity
function protocolFeePolicy() external view returns (uint256, uint256, address, address)
```






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





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeNumerator | uint256 | undefined |
| feeDenominator | uint256 | undefined |
| receiver | address | undefined |
| setter | address | undefined |



## Events

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



