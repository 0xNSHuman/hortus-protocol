import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { FakeContract, MockContract, MockContractFactory, smock } from "@defi-wonderland/smock";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import {
  CommunityVault,
  CommunityVault__factory,
  IERC20,
  MockERC20,
  MockERC20__factory,
} from "../types";
import { fail } from "assert";
import { BigNumber } from "ethers";
import { deployMockContract } from "ethereum-waffle";

chai.use(smock.matchers);

const ZERO_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000");

describe('Community Vault', () => { 
  let creator: SignerWithAddress;
  let supporter: SignerWithAddress;
  let other: SignerWithAddress;
  let community: CommunityVault;
  let erc20MockFactory: MockContractFactory<MockERC20__factory>;
  let erc20Mock: MockContract<MockERC20>;

  const SYMBOL = "TST";
  const NAME = "Test Community";
  const CURRENCY_TOKEN_ADDRESS = ZERO_ADDRESS; // 0x0 means using ETH
  const MEMBERSHIP_PRICE = ethers.utils.parseEther("0.05");
  
  beforeEach(async () => {
    [creator, supporter, other] = await ethers.getSigners();
    erc20MockFactory = await smock.mock<MockERC20__factory>("MockERC20");
    erc20Mock = await erc20MockFactory.connect(other).deploy();
  });

  describe("constructor", () => {
    it("results in valid deployment",async () => {
      community = await new CommunityVault__factory(creator).deploy(
        SYMBOL,
        NAME,
        CURRENCY_TOKEN_ADDRESS,
        MEMBERSHIP_PRICE
      );

      expect(await community.symbol()).to.equal(SYMBOL);
      expect(await community.name()).to.equal(NAME);
      expect(await community.commerceToken()).to.equal(CURRENCY_TOKEN_ADDRESS);
      expect(await community.membershipPrice()).to.equal(MEMBERSHIP_PRICE);
    });

    it("does not allow empty symbol",async () => {
      await expect(
        new CommunityVault__factory(creator).deploy(
          "",
          NAME,
          CURRENCY_TOKEN_ADDRESS,
          MEMBERSHIP_PRICE
        )
      ).to.be.reverted;
    });

    it("does not allow empty name",async () => {
      await expect(
        new CommunityVault__factory(creator).deploy(
          SYMBOL,
          "",
          CURRENCY_TOKEN_ADDRESS,
          MEMBERSHIP_PRICE
        )
      ).to.be.reverted;
    });

    it("fails if the currency isn't ERC-20 or ETH",async () => {
      fail("not implemented");
    });
  });

  describe('configure', () => { 
    const membershipPrice = 10;

    beforeEach(async () => {
      community = await new CommunityVault__factory(creator).deploy(
        SYMBOL,
        NAME,
        CURRENCY_TOKEN_ADDRESS,
        MEMBERSHIP_PRICE
      );
    });
    
    it("sets the new configuration values",async () => {
      await community.connect(creator).configure(erc20Mock.address, membershipPrice);

      expect(await community.commerceToken()).to.equal(erc20Mock.address);
      expect(await community.membershipPrice()).to.equal(membershipPrice);
    });

    it("fails if the currency isn't ERC-20 or ETH",async () => {
      fail("not implemented");
    });

    it("emits the ConfigurationUpdate event",async () => {
      await expect(community.connect(creator).configure(erc20Mock.address, membershipPrice))
        .to.emit(community, "ConfigurationUpdate")
        .withArgs(erc20Mock.address, membershipPrice);
    });

    it("can only be done by the contract owner",async () => {
      await expect(community.connect(other).configure(erc20Mock.address, membershipPrice))
        .to.be.reverted;
    });
  });

  describe('withdrawCreatorRewards', () => { 
    async function createCommunity(
      currencyToken: string,
      membershipPrice: BigNumber
    ) {
      return await new CommunityVault__factory(creator).deploy(
        SYMBOL,
        NAME,
        currencyToken,
        membershipPrice,
      );
    }

    it("sends the accumulated funds in ETH to the creator",async () => {
      const membershipPriceInWei = ethers.utils.parseEther("10");

      community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      await (community.connect(supporter).subscribe({value: membershipPriceInWei}));

      await expect(await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS)).to.changeEtherBalance(creator, membershipPriceInWei);
    });
    
    it("sends the accumulated funds in the chosen ERC-20 currency to the creator",async () => {
      const membershipPrice = 10;

      community = await createCommunity(erc20Mock.address, BigNumber.from(membershipPrice));
      erc20Mock.connect(other).transfer(supporter.address, 10000);
      erc20Mock.connect(other).transfer(creator.address, 10000);

      await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
      await community.connect(supporter).subscribe();
      await community.connect(creator).withdrawCreatorRewards(erc20Mock.address);

      expect(await erc20Mock.balanceOf(creator.address)).to.equal(10000 + membershipPrice);
    });

    it("correctly updates the contract balances in the network",async () => {
      const membershipPriceInWei = ethers.utils.parseEther("10");

      community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      await (community.connect(supporter).subscribe({value: membershipPriceInWei}));

      await expect(await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS)).to.changeEtherBalance(community, "-" + membershipPriceInWei.toString());

      const membershipPrice = 10;

      community = await createCommunity(erc20Mock.address, BigNumber.from(membershipPrice));
      erc20Mock.connect(other).transfer(supporter.address, 10000);

      await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
      await community.connect(supporter).subscribe();
      await community.connect(creator).withdrawCreatorRewards(erc20Mock.address);

      expect(await erc20Mock.balanceOf(community.address)).to.equal(0);
    });

    it("correctly updates the public contract state with new balance amount for the chosen currency",async () => {
      const membershipPriceInWei = ethers.utils.parseEther("10");

      community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      await (community.connect(supporter).subscribe({value: membershipPriceInWei}));
      await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS);

      expect(await community.totalCreatorRewardsAccumulated(ZERO_ADDRESS)).to.equal(0);

      const membershipPrice = 10;

      community = await createCommunity(erc20Mock.address, BigNumber.from(membershipPrice));
      erc20Mock.connect(other).transfer(supporter.address, 10000);

      await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
      await community.connect(supporter).subscribe();
      await community.connect(creator).withdrawCreatorRewards(erc20Mock.address);

      expect(await community.totalCreatorRewardsAccumulated(erc20Mock.address)).to.equal(0);
    });

    it("emits the CreatorRewardsWithdrawal event",async () => {
      const membershipPriceInWei = ethers.utils.parseEther("10");

      community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      await (community.connect(supporter).subscribe({value: membershipPriceInWei}));

      expect(await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS))
        .to.emit(community, "CreatorRewardsWithdrawal")
        .withArgs(creator.address, ZERO_ADDRESS, membershipPriceInWei);

      const membershipPrice = 10;

      community = await createCommunity(erc20Mock.address, BigNumber.from(membershipPrice));
      erc20Mock.connect(other).transfer(supporter.address, 10000);

      await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
      await community.connect(supporter).subscribe();

      expect(community.connect(creator).withdrawCreatorRewards(erc20Mock.address))
        .to.emit(community, "CreatorRewardsWithdrawal")
        .withArgs(creator.address, erc20Mock.address, membershipPrice);
    });

    it("can only be done by the contract owner",async () => {
      const membershipPriceInWei = ethers.utils.parseEther("10");
      community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);

      expect(community.connect(other).withdrawCreatorRewards(ZERO_ADDRESS))
        .to.be.reverted;
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

    it("correctly updates the contract balances in the network",async () => {
      fail("not implemented");
    });

    it("correctly updates the contract state with new balance for the chosen currency",async () => {
      fail("not implemented");
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

		it("deducts protocol fees according to the active policy",async () => {
      fail("not implemented");
    });

    it("emits the NewSubscription event for newly minted membership",async () => {
      fail("not implemented");
    });

		it("emits the SubscriptionExtension event for an existing membership",async () => {
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

		it("emits the RewardsClaim event",async () => {
      fail("not implemented");
    });
  });
});