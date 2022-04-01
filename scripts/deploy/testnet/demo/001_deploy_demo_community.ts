import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../../../constants";
import { DEMO_CONTRACTS } from "../../../demoConstants";
import {
  CommunityFactory__factory, 
  CommunityVault__factory
} from "../../../../types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.provider.getSigner(deployer);

  const factoryDeployment = await deployments.get(CONTRACTS.factory);
  const factory = CommunityFactory__factory.connect(factoryDeployment.address, signer);

  const receipt = await (
    await factory.createCommunity(
      DEMO_CONTRACTS.community.symbol,
      DEMO_CONTRACTS.community.name,
      DEMO_CONTRACTS.community.currency,
      DEMO_CONTRACTS.community.membershipPrice,
      DEMO_CONTRACTS.community.membershipPeriod
    )
  ).wait();

  const event = receipt.events?.find(e => e.event === "CommunityDeployment");
  const [_, communityAddr] = event!.args!;
  const community = CommunityVault__factory.connect(communityAddr, signer);

  deployments.save(
    "CommunityVault", 
    { 
      address: community.address,
      abi: (await deployments.getExtendedArtifact("CommunityVault")).abi,
      receipt: receipt
    }
  )

  console.log("Demo community deployed: " + community.address);

  await (await community.updateProfile(DEMO_CONTRACTS.community.profileUri)).wait();

  console.log("Demo community profile is set to: " + DEMO_CONTRACTS.community.profileUri);
};

func.tags = ["demo", "community"];

export default func;