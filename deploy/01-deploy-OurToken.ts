import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    developmentChains,
    INITIAL_SUPPLY,
    networkConfig,
} from "../helper-hardhat-config";
import "dotenv/config";
import { verify } from "../utils/verify";

const DeployToken: DeployFunction = async ({
    getNamedAccounts,
    deployments,
    ethers,
    network,
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;

    log("Deploying OurToken...");

    const args = [INITIAL_SUPPLY];

    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[chainId]?.blockConfirmations ?? 1,
    });

    log("Deployed!");
    log("----------------------------------------------");

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(ourToken.address, args);
    }
};

export default DeployToken;
DeployToken.tags = ["all", "token"];
