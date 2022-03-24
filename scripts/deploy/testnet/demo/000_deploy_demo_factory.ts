import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, PROTOCOL_FEE } from "../../../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer, treasury } = await getNamedAccounts();

  await deploy(CONTRACTS.factory, {
      from: deployer,
      args: [
          PROTOCOL_FEE.feeNumerator, 
          PROTOCOL_FEE.feeDenominator, 
          treasury, 
          deployer
      ],
      log: true,
      skipIfAlreadyDeployed: true,
  });
};

func.tags = [CONTRACTS.factory];

export default func;