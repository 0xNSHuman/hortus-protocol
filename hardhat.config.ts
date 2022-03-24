import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import '@primitivefi/hardhat-dodoc';
import "hardhat-deploy";
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
    mainnet: 1,
    rinkeby: 4,
    ropsten: 3,
    goerli: 5,
    hardhat: 1337,
    kovan: 42,
};

const privateKey = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
const alchemyApiKey = process.env.ALCHEMY_API_KEY ?? "NO_ALCHEMY_API_KEY";

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
    const url = `https://eth-${network}.alchemyapi.io/v2/${alchemyApiKey}`;
    return {
        accounts: [`${privateKey}`],
        chainId: chainIds[network],
        url,
    };
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
  solidity: {
    version: "0.8.4",
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"]
        }
      },
      optimizer: {
        enabled: true,
        runs: 2
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
          url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
      },
      chainId: chainIds.hardhat,
    },
    mainnet: getChainConfig("mainnet"),
    rinkeby: getChainConfig("rinkeby"),
    ropsten: getChainConfig("ropsten"),
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    treasury: {
      default: 1,
      4: 1
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
};

export default config;