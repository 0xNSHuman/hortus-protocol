import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { smock } from "@defi-wonderland/smock";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import {
  CommunityFactory,
  CommunityFactory__factory,
  CommunityVault__factory,
} from "../types";
import { BigNumber, ContractTransaction } from "ethers";

chai.use(smock.matchers);

const ZERO_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000");

describe('Community Factory', () => { 
  let owner: SignerWithAddress;
  let creator: SignerWithAddress;
  let communityFactory: CommunityFactory;
  let communityFactoryFactory: CommunityFactory__factory;
  let treasury: SignerWithAddress;
  let newFeeReceiver: SignerWithAddress;
  let newFeeSetter: SignerWithAddress;
  let other: SignerWithAddress;

  let feePolicy: any;

  const SYMBOL = "TST";
  const NAME = "Test Community";
  const CURRENCY_TOKEN_ADDRESS = ZERO_ADDRESS; // 0x0 means using ETH
  const MEMBERSHIP_PRICE = ethers.utils.parseEther("10");
  const MEMBERSHIP_PERIOD = BigNumber.from(200000);

  function deployFactory(
    feeNumerator: BigNumber,
    feeDenominator: BigNumber,
    feeReceiver: string,
    feeSetter: string
  ) {
    return communityFactoryFactory.deploy(
      feeNumerator,
      feeDenominator,
      feeReceiver,
      feeSetter
    );
  }
  
  beforeEach(async () => {
    [owner, creator, treasury, newFeeReceiver, newFeeSetter, other] = await ethers.getSigners();

    feePolicy = {
      feeNumerator: BigNumber.from(1),
      feeDenominator: BigNumber.from(100),
      feeReceiver: treasury.address,
      feeSetter: owner.address
    };

    communityFactoryFactory = new CommunityFactory__factory(owner)

    communityFactory = await deployFactory(
      feePolicy.feeNumerator,
      feePolicy.feeDenominator,
      feePolicy.feeReceiver,
      feePolicy.feeSetter
    );
  });

  describe("constructor", () => {
    it("results in valid deployment", async () => {
      expect(communityFactory.address).to.not.equal(null);
    });

    it("sets the expected fee policy", async () => {
      expect(await communityFactory.protocolFeePolicy())
        .to.eql(Object.values(feePolicy));
    });

    it("fails if fee setter is zero address", async () => {
      await expect(
        deployFactory(
          feePolicy.feeNumerator,
          feePolicy.feeDenominator,
          feePolicy.feeReceiver,
          ZERO_ADDRESS
        )
      )
        .to.be.revertedWith("Invalid setter");
    });

    it("fails if fee fraction denominator is zero", async () => {
      await expect(
        deployFactory(
          feePolicy.feeNumerator,
          BigNumber.from(0),
          feePolicy.feeReceiver,
          feePolicy.feeSetter
        )
      )
        .to.be.revertedWith("Invalid fraction");
    });

    it("fails if non-zero fee is set to be sent to zero address", async () => {
      await expect(
        deployFactory(
          feePolicy.feeNumerator,
          feePolicy.feeDenominator,
          ZERO_ADDRESS,
          feePolicy.feeSetter
        )
      )
        .to.be.revertedWith("Cannot burn fees");
    });
  });

  describe('createCommunity', () => { 
    let tx: ContractTransaction;
    let communityAddress: string;

    beforeEach(async () => {
      tx = await communityFactory
        .connect(creator)
        .createCommunity(
          SYMBOL,
          NAME,
          CURRENCY_TOKEN_ADDRESS,
          MEMBERSHIP_PRICE,
          MEMBERSHIP_PERIOD
        )

      const receipt = await tx.wait();
      const event = receipt.events?.find(e => e.event === "CommunityDeployment");
      const [_, communityAddr] = event!.args!;
      communityAddress = communityAddr;
    });

    it("emits the CommunityDeployment", async () => {
      await expect(tx)
        .to.emit(communityFactory, "CommunityDeployment")
    });

    it("creates community instance with matching parameters", async () => {
      const community = (new CommunityVault__factory(owner).attach(communityAddress as string));

      expect(await community.symbol()).to.equal(SYMBOL);
      expect(await community.name()).to.equal(NAME);
      expect(await community.commerceToken()).to.equal(CURRENCY_TOKEN_ADDRESS);
      expect(await community.membershipPrice()).to.equal(MEMBERSHIP_PRICE);
      expect(await community.membershipPeriod()).to.equal(MEMBERSHIP_PERIOD);
    });
  });

  describe('setProtocolFeePolicy', () => { 
    let newFeePolicy = feePolicy;

    beforeEach(async () => {
      newFeePolicy = {
        feeNumerator: BigNumber.from(2),
        feeDenominator: BigNumber.from(100),
        feeReceiver: newFeeReceiver.address,
        feeSetter: newFeeSetter.address
      };
    });

    it("fails if the caller is not the designated fee setter", async () => {
      await expect(
          communityFactory.connect(other)
            .setProtocolFeePolicy(
              newFeePolicy.feeNumerator,
              newFeePolicy.feeDenominator,
              newFeePolicy.feeReceiver,
              newFeePolicy.feeSetter
            )
        )
          .to.be.revertedWith("Access Denied");
    });

    it("sets the expected fee policy", async () => {
      await communityFactory.connect(owner)
        .setProtocolFeePolicy(
          newFeePolicy.feeNumerator,
          newFeePolicy.feeDenominator,
          newFeePolicy.feeReceiver,
          newFeePolicy.feeSetter
        )

      expect(await communityFactory.protocolFeePolicy())
        .to.eql(Object.values(newFeePolicy));
    });

    it("fails if fee setter is zero address", async () => {
      await expect(
        communityFactory.connect(owner)
          .setProtocolFeePolicy(
            newFeePolicy.feeNumerator,
            newFeePolicy.feeDenominator,
            newFeePolicy.feeReceiver,
            ZERO_ADDRESS
          )
      )
        .to.be.revertedWith("Invalid setter");
    });

    it("fails if fee fraction denominator is zero", async () => {
      await expect(
        communityFactory.connect(owner)
          .setProtocolFeePolicy(
            newFeePolicy.feeNumerator,
            BigNumber.from(0),
            newFeePolicy.feeReceiver,
            newFeePolicy.feeSetter
          )
      )
        .to.be.revertedWith("Invalid fraction");
    });

    it("fails if non-zero fee is set to be sent to zero address", async () => {
      await expect(
        communityFactory.connect(owner)
          .setProtocolFeePolicy(
            newFeePolicy.feeNumerator,
            newFeePolicy.feeDenominator,
            ZERO_ADDRESS,
            newFeePolicy.feeSetter
          )
      )
        .to.be.revertedWith("Cannot burn fees");
    });

    it("emits the ProtocolFeePolicyUpdate event with expected arguments", async () => {
      await expect(
        communityFactory.connect(owner)
          .setProtocolFeePolicy(
            newFeePolicy.feeNumerator,
            newFeePolicy.feeDenominator,
            newFeePolicy.feeReceiver,
            newFeePolicy.feeSetter
          )
      )
        .to.emit(communityFactory, "ProtocolFeePolicyUpdate")
        .withArgs(...Object.values(newFeePolicy));
    });
  });
 });
