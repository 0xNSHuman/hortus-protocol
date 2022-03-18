# IStaking









## Methods

### claimFees

```solidity
function claimFees() external nonpayable
```






### stake

```solidity
function stake(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |

### totalFeesAccumulated

```solidity
function totalFeesAccumulated() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalStaked

```solidity
function totalStaked() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### unstake

```solidity
function unstake(uint256 amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | undefined |



## Events

### FeesClaim

```solidity
event FeesClaim(address indexed _staker, uint256 indexed _amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _staker `indexed` | address | undefined |
| _amount `indexed` | uint256 | undefined |

### Staking

```solidity
event Staking(address indexed _staker, uint256 indexed _amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _staker `indexed` | address | undefined |
| _amount `indexed` | uint256 | undefined |

### Unstaking

```solidity
event Unstaking(address indexed _staker, uint256 indexed _amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _staker `indexed` | address | undefined |
| _amount `indexed` | uint256 | undefined |



