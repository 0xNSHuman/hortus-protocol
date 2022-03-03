import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { smock } from "@defi-wonderland/smock";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import {
  CommunityVault,
  CommunityVault__factory,
} from "../types";
import { fail } from "assert";

chai.use(smock.matchers);

const ZERO_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000");

describe('Community Vault', () => { 
  let creator: SignerWithAddress;
  let supporter: SignerWithAddress;
  let community: CommunityVault;

  const SYMBOL = "TST";
  const NAME = "Test Community";
  const CURRENCY_TOKEN_ADDRESS = ZERO_ADDRESS; // 0x0 means using ETH
  const MEMBERSHIP_PRICE = ethers.utils.parseEther("0.05");
  
  beforeEach(async () => {
    [creator, supporter] = await ethers.getSigners();
  });

  describe("constructor", () => {
    it("results in valid deployment",async () => {
      community = await new CommunityVault__factory(creator).deploy(
        SYMBOL,
        NAME,
        CURRENCY_TOKEN_ADDRESS,
        MEMBERSHIP_PRICE
      );
    });
  });

  describe('configure', () => { 
    it("sets the new configuration values",async () => {
      fail("not implemented");
    });

    it("emits a ConfigurationUpdate event",async () => {
      fail("not implemented");
    });

    it("can only be done by the contract owner",async () => {
      fail("not implemented");
    });
  });

  describe('withdrawCreatorRewards', () => { 
    it("sends the accumulated funds to the creator",async () => {
      fail("not implemented");
    });

    it("correctly updates the contract state with new rewards balance",async () => {
      fail("not implemented");
    });

    it("emits a CreatorRewardsWithdrawal event",async () => {
      fail("not implemented");
    });

    it("can only be done by the contract owner",async () => {
      fail("not implemented");
    });
  });

  describe('subscribe', () => { 
		it("fails if the tx value doesn't equal to the membership price when the chosen currency is ETH",async () => {
			fail("not implemented");
		});

		describe('when the chosen currency is ERC-20', () => { 
			beforeEach(async () => {
				// Set the contract up
			});

			it("reverts if tx value is non-zero",async () => {
				fail("not implemented");
			});
	
			it("requests approval if the currency token allowance from the supporter is not sufficient",async () => {
				fail("not implemented");
			});
	
			it("transfers the currency token amount equal to membership price from the supporter to self",async () => {
				fail("not implemented");
			});
		});

		it("does not mint a membership NFT is the caller already has one",async () => {
			fail("not implemented");
		});

		it("mints a membership NFT and sends it to the caller if they don't have one",async () => {
			fail("not implemented");
		});

		it("updates membership expiration date for the caller",async () => {
      fail("not implemented");
    });

		it("increments the creator rewards according to formula",async () => {
      fail("not implemented");
    });

		it("deducts protocol fees according to formula",async () => {
      fail("not implemented");
    });

    it("emits a NewSubscription event for newly minted membership",async () => {
      fail("not implemented");
    });

		it("emits a SubscriptionExtension event for an existing membership",async () => {
      fail("not implemented");
    });
  });

  describe('claimRewards', () => { 
		it("transfers the accumulated amount of community token according to the formula to the caller",async () => {
      fail("not implemented");
    });

		it("does nothing when the accumulated rewards balance is zero",async () => {
      fail("not implemented");
    });

		it("emits a RewardsClaim event",async () => {
      fail("not implemented");
    });
  });
});