# CommunityVault









## Methods

### approve

```solidity
function approve(address to, uint256 tokenId) external nonpayable
```



*See {IERC721-approve}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |
| tokenId | uint256 | undefined |

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256)
```



*See {IERC721-balanceOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### claimRewards

```solidity
function claimRewards() external nonpayable
```

Claim accumulated membership rewards




### commerceToken

```solidity
function commerceToken() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### configure

```solidity
function configure(address _commerceToken, uint256 _membershipPrice) external nonpayable
```

Update community settings



#### Parameters

| Name | Type | Description |
|---|---|---|
| _commerceToken | address | undefined |
| _membershipPrice | uint256 | undefined |

### getApproved

```solidity
function getApproved(uint256 tokenId) external view returns (address)
```



*See {IERC721-getApproved}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### isApprovedForAll

```solidity
function isApprovedForAll(address owner, address operator) external view returns (bool)
```



*See {IERC721-isApprovedForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| operator | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### membershipPrice

```solidity
function membershipPrice() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### name

```solidity
function name() external view returns (string)
```



*See {IERC721Metadata-name}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view returns (address)
```



*See {IERC721-ownerOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### safeMint

```solidity
function safeMint(address to) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) external nonpayable
```



*See {IERC721-safeTransferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) external nonpayable
```



*See {IERC721-safeTransferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |
| _data | bytes | undefined |

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable
```



*See {IERC721-setApprovalForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| operator | address | undefined |
| approved | bool | undefined |

### subscribe

```solidity
function subscribe() external payable
```

Purchase membership




### subscriptionExpiration

```solidity
function subscriptionExpiration() external view returns (uint256)
```

Get subscription expiration date




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```



*See {IERC165-supportsInterface}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### symbol

```solidity
function symbol() external view returns (string)
```



*See {IERC721Metadata-symbol}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) external view returns (string)
```



*See {IERC721Metadata-tokenURI}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalCreatorRewardsAccumulated

```solidity
function totalCreatorRewardsAccumulated(address _token) external view returns (uint256)
```

Get total withdrawable amount for creator



#### Parameters

| Name | Type | Description |
|---|---|---|
| _token | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### totalRewardsAccumulated

```solidity
function totalRewardsAccumulated() external view returns (uint256)
```

Get total withdrawable amount for subscriber




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) external nonpayable
```



*See {IERC721-transferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### withdrawCreatorRewards

```solidity
function withdrawCreatorRewards(address _token) external nonpayable
```

Withdraw the payments accumulated for creator



#### Parameters

| Name | Type | Description |
|---|---|---|
| _token | address | undefined |



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| approved `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |

### ApprovalForAll

```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| operator `indexed` | address | undefined |
| approved  | bool | undefined |

### ConfigurationUpdate

```solidity
event ConfigurationUpdate(address indexed commerceToken, uint256 indexed membershipPrice)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| commerceToken `indexed` | address | undefined |
| membershipPrice `indexed` | uint256 | undefined |

### CreatorRewardsWithdrawal

```solidity
event CreatorRewardsWithdrawal(address indexed creator, address indexed token, uint256 indexed amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| creator `indexed` | address | undefined |
| token `indexed` | address | undefined |
| amount `indexed` | uint256 | undefined |

### NewSubscription

```solidity
event NewSubscription(address indexed supporter, uint256 indexed expiration)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| supporter `indexed` | address | undefined |
| expiration `indexed` | uint256 | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

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

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |



