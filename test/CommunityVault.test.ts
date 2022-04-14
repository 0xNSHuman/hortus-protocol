import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { FakeContract, MockContract, MockContractFactory, smock } from "@defi-wonderland/smock";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import {
  CommunityFactory,
  CommunityFactory__factory,
  CommunityVault,
  CommunityVault__factory,
  IERC20,
  IERC20__factory,
  MockERC20,
  MockERC20__factory,
  MockNonERC20,
  MockNonERC20__factory
} from "../types";
import { BigNumber } from "ethers";

chai.use(smock.matchers);

const ZERO_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000");

describe('Community Vault', () => { 
  let creator: SignerWithAddress;
  let supporter: SignerWithAddress;
  let anotherSupporter: SignerWithAddress;
  let other: SignerWithAddress;
  let treasury: SignerWithAddress;
  let community: CommunityVault;
  let communityFactory: CommunityFactory;
  let communityFactoryFake: FakeContract<CommunityFactory>;
  let erc20Mock: MockContract<MockERC20>;
  let nonErc20Mock: MockContract<MockNonERC20>;
  let feePolicy: any;

  const SYMBOL = "TST";
  const NAME = "Test Community";
  const MEMBERSHIP_PERIOD = BigNumber.from(200000);

  async function createCommunity(
    currencyToken: string,
    membershipPrice: BigNumber,
    membershipPeriod: BigNumber = MEMBERSHIP_PERIOD
  ) {
    const tx = await communityFactory.connect(creator).createCommunity(
      SYMBOL,
      NAME,
      currencyToken,
      membershipPrice,
      membershipPeriod
    );

    const receipt = await tx.wait();
    const event = receipt.events?.find(e => e.event === "CommunityDeployment");
    const [_, communityAddr] = event!.args!;

    return (new CommunityVault__factory(other).attach(communityAddr as string));
  }
  
  beforeEach(async () => {
    [creator, supporter, anotherSupporter, other, treasury] = await ethers.getSigners();
    erc20Mock = await (await smock.mock<MockERC20__factory>("MockERC20")).connect(other).deploy();
    nonErc20Mock = await (await smock.mock<MockNonERC20__factory>("MockNonERC20")).connect(other).deploy();

    feePolicy = {
      feeNumerator: 1,
      feeDenominator: 100,
      feeReceiver: treasury.address,
      feeSetter: treasury.address
    };
    communityFactory = await new CommunityFactory__factory(treasury).deploy(
      feePolicy.feeNumerator,
      feePolicy.feeDenominator,
      feePolicy.feeReceiver,
      feePolicy.feeSetter
    );

    communityFactoryFake = await smock.fake<CommunityFactory>("CommunityFactory");
  });

  describe("constructor", () => {
    const membershipPrice = BigNumber.from(10000);

    beforeEach(async () => {
      community = await createCommunity(erc20Mock.address, membershipPrice);
    });

    it("is deployed by currently active factory", async () => {
      expect(await community.factory()).to.equal(communityFactory.address);
    });

    it("sets the tx origin as the contract owner", async () => {
      expect(await community.owner()).to.equal(creator.address);
    });

    it("results in valid deployment", async () => {
      expect(await community.symbol()).to.equal(SYMBOL);
      expect(await community.name()).to.equal(NAME);
      expect(await community.commerceToken()).to.equal(erc20Mock.address);
      expect(await community.membershipPrice()).to.equal(membershipPrice);
      expect(await community.membershipPeriod()).to.equal(MEMBERSHIP_PERIOD);
    });

    it("does not allow empty symbol", async () => {
      await expect(
        new CommunityVault__factory(creator).deploy(
          "",
          NAME,
          erc20Mock.address,
          membershipPrice,
          MEMBERSHIP_PERIOD
        )
      ).to.be.reverted;
    });

    it("does not allow empty name", async () => {
      await expect(
        new CommunityVault__factory(creator).deploy(
          SYMBOL,
          "",
          erc20Mock.address,
          membershipPrice,
          MEMBERSHIP_PERIOD
        )
      ).to.be.reverted;
    });

    it("does not allow zero membership period", async () => {
      await expect(
        new CommunityVault__factory(creator).deploy(
          SYMBOL,
          NAME,
          erc20Mock.address,
          membershipPrice,
          0
        )
      ).to.be.revertedWith("Invalid period");
    });
  });

  describe('configureMembership', () => { 
    const membershipPrice = BigNumber.from(10000);
    const membershipPeriod = BigNumber.from(400000);

    beforeEach(async () => {
      community = await createCommunity(erc20Mock.address, membershipPrice);
    });

    it("can only be done by the contract owner", async () => {
      await expect(community.connect(other).configureMembership(erc20Mock.address, membershipPrice, membershipPeriod))
        .to.be.reverted;
    });
    
    it("sets the new membership configuration values", async () => {
      await community.connect(creator).configureMembership(erc20Mock.address, membershipPrice, membershipPeriod);

      expect(await community.commerceToken()).to.equal(erc20Mock.address);
      expect(await community.membershipPrice()).to.equal(membershipPrice);
      expect(await community.membershipPeriod()).to.equal(membershipPeriod);
    });

    it("emits the MembershipConfigurationUpdate event", async () => {
      await expect(community.connect(creator).configureMembership(erc20Mock.address, membershipPrice, membershipPeriod))
        .to.emit(community, "MembershipConfigurationUpdate")
        .withArgs(erc20Mock.address, membershipPrice, membershipPeriod);
    });
  });

  describe('updateProfile', () => { 
    const membershipPrice = BigNumber.from(10000);
    const uri = "an_arbitrary_uri_string";

    beforeEach(async () => {
      community = await createCommunity(erc20Mock.address, membershipPrice);
    });
    
    it("can only be done by the contract owner", async () => {
      await expect(community.connect(other).updateProfile(uri))
        .to.be.reverted;
    });

    it("sets the new profile URI", async () => {
      await community.connect(creator).updateProfile(uri);
      
      expect(await community.profileURI())
        .to.be.equal(uri);
    });

    it("emits the ProfileUpdate event with correct arguments", async () => {
      await expect(community.connect(creator).updateProfile(uri))
        .to.emit(community, "ProfileUpdate")
        .withArgs(uri);
    });
  });

  describe('withdrawCreatorRewards', () => { 
    describe('common flow', async () => { 
      it("can only be done by the contract owner", async () => {
        const membershipPriceInWei = ethers.utils.parseEther("10");
        community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
  
        await expect(community.connect(other).withdrawCreatorRewards(ZERO_ADDRESS))
          .to.be.reverted;
      });
    });

    describe('when the chosen currency is ETH', async () => { 
      const membershipPriceInWei = ethers.utils.parseEther("10");
      let expectedFees: BigNumber;
      let expectedCreatorRewards: BigNumber;

      beforeEach(async () => {
        community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
        expectedFees = membershipPriceInWei
          .mul(feePolicy.feeNumerator).div(feePolicy.feeDenominator) // fee per subscription
          .mul(2); // num of subscriptions
        expectedCreatorRewards = membershipPriceInWei.mul(2).sub(expectedFees);

        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        await community.connect(anotherSupporter).subscribe({ value: membershipPriceInWei });
      });

      it("sends the accumulated funds to the creator", async () => {
        expect(await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS))
          .to.changeEtherBalance(creator, expectedCreatorRewards);
      });

      it("correctly updates the contract balance in the network", async () => {
        expect(await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS))
          .to.changeEtherBalance(community, "-" + expectedCreatorRewards.toString());
      });
  
      it("correctly updates contract state with new creator balance", async () => {
        await community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS);

        expect(await community.totalCreatorRewardsAccumulated(ZERO_ADDRESS))
          .to.equal(0);
      });
  
      it("emits the CreatorRewardsWithdrawal event with correct arguments", async () => {
        await expect(community.connect(creator).withdrawCreatorRewards(ZERO_ADDRESS))
          .to.emit(community, "CreatorRewardsWithdrawal")
          .withArgs(creator.address, ZERO_ADDRESS, expectedCreatorRewards);
      });
    });

    describe('when the chosen currency is ERC-20', async () => { 
      const membershipPrice = BigNumber.from(10000);
      let expectedFees: BigNumber;
      let expectedCreatorRewards: BigNumber;

      beforeEach(async () => {
        community = await createCommunity(erc20Mock.address, membershipPrice);
        expectedFees = membershipPrice
          .mul(feePolicy.feeNumerator).div(feePolicy.feeDenominator) // fee per subscription
          .mul(2); // num of subscriptions
        expectedCreatorRewards = membershipPrice.mul(2).sub(expectedFees);

        erc20Mock.connect(other).transfer(supporter.address, 10000);
        erc20Mock.connect(other).transfer(anotherSupporter.address, 10000);
        erc20Mock.connect(other).transfer(creator.address, 10000);
        await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
        await community.connect(supporter).subscribe();
        await erc20Mock.connect(anotherSupporter).approve(community.address, membershipPrice);
        await community.connect(anotherSupporter).subscribe();
      });

      it("sends the accumulated funds in the chosen currency to the creator", async () => {
        expect(() => community.connect(creator).withdrawCreatorRewards(erc20Mock.address))
          .to.changeTokenBalance(erc20Mock, creator, expectedCreatorRewards);
      });

      it("correctly updates the contract balance in the network", async () => {
        expect(() => community.connect(creator).withdrawCreatorRewards(erc20Mock.address))
          .to.changeTokenBalance(erc20Mock, community, "-" + expectedCreatorRewards.toString());
      });
  
      it("correctly updates contract state with new creator balance for the chosen currency", async () => {
        await community.connect(creator).withdrawCreatorRewards(erc20Mock.address);

        expect(await community.totalCreatorRewardsAccumulated(erc20Mock.address))
          .to.equal(0);
      });
  
      it("emits the CreatorRewardsWithdrawal event with correct arguments", async () => {
        await expect(community.connect(creator).withdrawCreatorRewards(erc20Mock.address))
          .to.emit(community, "CreatorRewardsWithdrawal")
          .withArgs(creator.address, erc20Mock.address, expectedCreatorRewards);
      });
    });
  });

  describe('subscribe', () => { 
    describe('when the chosen currency is ETH', async () => { 
      const membershipPriceInWei = ethers.utils.parseEther("10");
      let fee: BigNumber;
      let communityBalanceIncrement: BigNumber;

      beforeEach(async () => {
        fee = membershipPriceInWei
          .div(feePolicy.feeDenominator).mul(feePolicy.feeNumerator) // fee per subscription
        communityBalanceIncrement = membershipPriceInWei.sub(fee);

        community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      });

      it("fails if the tx value doesn't equal to the membership price", async () => {
        await expect(community.connect(supporter).subscribe({ value: membershipPriceInWei.add(1) }))
          .to.be.revertedWith("Price not matched");
      });

      it("deducts protocol fees and correctly updates the contract balances in the network", async () => {
        expect(await community.connect(supporter).subscribe({ value: membershipPriceInWei }))
          .to.changeEtherBalances(
            [community, treasury],
            [communityBalanceIncrement, fee]
          );
          expect(await community.connect(anotherSupporter).subscribe({ value: membershipPriceInWei }))
          .to.changeEtherBalances(
            [community, treasury],
            [communityBalanceIncrement, fee]
          );
      });

      it("increments the creator balance for the chosen currency", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        await community.connect(anotherSupporter).subscribe({ value: membershipPriceInWei });

        expect(await community.totalCreatorRewardsAccumulated(ZERO_ADDRESS)).to.equal(membershipPriceInWei.sub(fee).mul(2));
      });
    });

		describe('when the chosen currency is ERC-20', async () => { 
      const membershipPrice = BigNumber.from(10000);
      let fee: BigNumber;
      let communityBalanceIncrement: BigNumber;

      beforeEach(async () => {
        fee = membershipPrice
          .div(feePolicy.feeDenominator).mul(feePolicy.feeNumerator) // fee per subscription
        communityBalanceIncrement = membershipPrice.sub(fee);

        community = await createCommunity(erc20Mock.address, membershipPrice);
        erc20Mock.connect(other).transfer(supporter.address, 10000);
        erc20Mock.connect(other).transfer(anotherSupporter.address, 10000);
      });

			it("fails if tx value is non-zero", async () => {
				await expect(community.connect(supporter).subscribe({ value: 1 }))
          .to.be.revertedWith("ETH not accepted");
			});

      it("fails if the currency isn't ERC-20", async () => {
        community = await createCommunity(nonErc20Mock.address, membershipPrice);

        await expect(community.connect(supporter).subscribe())
          .to.be.reverted;
      });

      it("fails if the token allowance is not more or equal to the membership price", async () => {
        await erc20Mock.connect(supporter).approve(community.address, membershipPrice.sub(1));
        await expect(community.connect(supporter).subscribe())
          .to.be.revertedWith("Insufficient allowance");
      });

      it("deducts protocol fees and correctly updates the contract balances in the network", async () => {
        await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
        await expect(() => community.connect(supporter).subscribe())
          .to.changeTokenBalances(
            erc20Mock,
            [community, treasury],
            [communityBalanceIncrement, fee]
          );
        await erc20Mock.connect(anotherSupporter).approve(community.address, membershipPrice);
        await expect(() => community.connect(anotherSupporter).subscribe())
          .to.changeTokenBalances(
            erc20Mock,
            [community, treasury],
            [communityBalanceIncrement, fee]
          );
      });

      it("increments the creator balance for the chosen currency", async () => {
        await erc20Mock.connect(supporter).approve(community.address, membershipPrice);
        await community.connect(supporter).subscribe();
        await erc20Mock.connect(anotherSupporter).approve(community.address, membershipPrice);
        await community.connect(anotherSupporter).subscribe();

        expect(await community.totalCreatorRewardsAccumulated(erc20Mock.address)).to.equal(membershipPrice.sub(fee).mul(2));
      });
		});

    describe('common flow', () => { 
      const membershipPriceInWei = ethers.utils.parseEther("10");

      beforeEach(async () => {
        community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei);
      });
  
      it("mints a membership NFT and sends it to the caller if they don't have one", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        expect(await community.balanceOf(supporter.address)).to.be.equal(1);
      });

      it("does not mint a membership NFT is the caller already has one", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        
        expect(await community.balanceOf(supporter.address)).to.be.equal(1);
      });
  
      it("sets membership expiration to [membership period] in the future if it's the first membership", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        const tokenId = await community.tokenOfOwnerByIndex(supporter.address, 0);
        const block = await ethers.provider.getBlockNumber();

        expect(await community["subscriptionExpiration(uint256)"](tokenId)).to.be.equal(block + MEMBERSHIP_PERIOD.toNumber());
      });
  
      it("sets membership expiration to [membership expiration] + [membership period] if there is an existing membership left", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        const tokenId = await community.tokenOfOwnerByIndex(supporter.address, 0);
        const startBlock = await ethers.provider.getBlockNumber();
        await ethers.provider.send("evm_mine", []);
        await ethers.provider.send("evm_mine", []);
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });

        expect(await community["subscriptionExpiration(uint256)"](tokenId)).to.be.equal(startBlock + MEMBERSHIP_PERIOD.toNumber() * 2);
      });

      it("sets membership expiration to [membership period] in the future after previous membership expired", async () => {
        community = await createCommunity(ZERO_ADDRESS, membershipPriceInWei, BigNumber.from(2));

        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        const tokenId = await community.tokenOfOwnerByIndex(supporter.address, 0);
        await ethers.provider.send("evm_mine", []);
        await ethers.provider.send("evm_mine", []);
        await ethers.provider.send("evm_mine", []);
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        const block = await ethers.provider.getBlockNumber();

        expect(await community["subscriptionExpiration(uint256)"](tokenId)).to.be.equal(block + 2);
      });
  
      it("emits the NewSubscription event for newly minted membership", async () => {
        await expect(community.connect(supporter).subscribe({ value: membershipPriceInWei }))
          .to.emit(community, "NewSubscription");
      });
  
      it("emits the SubscriptionExtension event for an existing membership", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei })

        await expect(community.connect(supporter).subscribe({ value: membershipPriceInWei }))
          .to.emit(community, "SubscriptionExtension");
      });

      it("does not serve the caller if they hold more than one NFT", async () => {
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        const tokenId = await community.tokenOfOwnerByIndex(supporter.address, 0);
        await community.connect(supporter).transferFrom(supporter.address, other.address, tokenId);
        await community.connect(supporter).subscribe({ value: membershipPriceInWei });
        await community.connect(other).transferFrom(other.address, supporter.address, tokenId);

        await expect(community.connect(supporter).subscribe({ value: membershipPriceInWei }))
          .to.be.revertedWith("Duplicate NFTs");
      });
    });
  });
});