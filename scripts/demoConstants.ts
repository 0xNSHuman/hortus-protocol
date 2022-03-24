import { ZERO_ADDRESS } from "./constants"
import { ethers } from "hardhat";

export const DEMO_CONTRACTS = {
  community: {
    symbol: "DEMO0",
    name: "Demo Community",
    currency: ZERO_ADDRESS,
    membershipPrice: ethers.utils.parseEther("0.1"),
    membershipPeriod: "200000",
    profile: {
      pictureUrl: "https://ipfs.io/ipfs/Qmf4SFaCMKX24qaPKn4Dh2tCsnz5HDPoyBxsxh5xQ5PgTo?filename=orbitum-3.0-logo.svg",
      name: "My Demo Community",
      description: "This community is being used by the Hortus team to test and demonstrate the capabilities of the dapp.",
      twitter: "https://twitter.com/wearehortus"
    },
    profileUri: "ipfs://QmR4mvFfxnQnmuiyWMVVoTZhRJhcSNFxQriANp9hE631hy"
  },
};