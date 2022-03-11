import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { smock } from "@defi-wonderland/smock";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import {
  CommunityFactory,
  CommunityFactory__factory,
  CommunityVault,
  CommunityVault__factory,
} from "../types";
import { fail } from "assert";

chai.use(smock.matchers);

const ZERO_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000");

describe('Community Factory', () => { 
  let owner: SignerWithAddress;
  let creator: SignerWithAddress;
  let communityFactory: CommunityFactory;
  let treasury: SignerWithAddress;

  let feePolicy: any;

  const SYMBOL = "TST";
  const NAME = "Test Community";
  const CURRENCY_TOKEN_ADDRESS = ZERO_ADDRESS; // 0x0 means using ETH
  const MEMBERSHIP_PRICE = ethers.utils.parseEther("0.05");
  
  beforeEach(async () => {
    [owner, creator, treasury] = await ethers.getSigners();

    feePolicy = {
      feeNumerator: 1,
      feeDenomerator: 100,
      feeReceiver: treasury.address,
      feeSetter: owner.address
    };

    communityFactory = await new CommunityFactory__factory(owner).deploy(
      feePolicy.feeNumerator,
      feePolicy.feeDenomerator,
      feePolicy.feeReceiver,
      feePolicy.feeSetter
    );
  });

  describe("constructor", () => {
    it("results in valid deployment",async () => {
      expect(communityFactory.address).to.not.equal(null);
    });

    it("sets the expected fee policy",async () => {
      fail("not implemented");
    });
  });

  describe('createCommunity', () => { 
    it("allows whitelisted currencies only",async () => {
      fail("not implemented");
    });
    
    it("creates CommunityVault with matching parameters",async () => {
      const tx = await communityFactory
        .connect(creator)
        .createCommunity(
          SYMBOL,
          NAME,
          CURRENCY_TOKEN_ADDRESS,
          MEMBERSHIP_PRICE
        )

      const receipt = await tx.wait();
      const event = receipt.events?.find(e => e.event === "CommunityDeployment");
      const [_, communityAddr] = event!.args!;

      const community = (new CommunityVault__factory(owner).attach(communityAddr as string));

      expect(await community.symbol()).to.equal(SYMBOL);
      expect(await community.name()).to.equal(NAME);
      expect(await community.commerceToken()).to.equal(CURRENCY_TOKEN_ADDRESS);
      expect(await community.membershipPrice()).to.equal(MEMBERSHIP_PRICE);
    });

    it("emits the CommunityDeployment event with expected arguments",async () => {
      const tx = await communityFactory
        .connect(creator)
        .createCommunity(
          SYMBOL,
          NAME,
          CURRENCY_TOKEN_ADDRESS,
          MEMBERSHIP_PRICE
        )

      const receipt = await tx.wait();
      const event = receipt.events?.find(e => e.event === "CommunityDeployment");
      const [_, communityAddr] = event!.args!;

      expect(tx)
        .to.emit(communityFactory, "CommunityDeployment")
        .withArgs(creator.address, communityAddr as string);
    });
  });

  describe('setProtocolFeePolicy', () => { 
    it("sets the expected fee policy",async () => {
      fail("not implemented");
    });

    it("emits the ProtocolFeePolicyUpdate event with expected arguments",async () => {
      fail("not implemented");
    });
  });
 });
