import { deployments, ethers, upgrades } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployProxy, verifyContract, verifyProxy } from "./helpers";
import { parseEther } from "../utils/helpers";

const implementationContractName = "UrbanFarmDLP";
const proxyContractName = "UrbanFarmDLPProxy";
const proxyContractPath = "contracts/dlp/UrbanFarmDLPProxy.sol:UrbanFarmDLPProxy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const [deployer] = await ethers.getSigners();
  const ownerAddress = process.env.OWNER_ADDRESS ?? deployer.address;

  const rewardTokenContractName = "RewardToken";
  const rewardTokenName = process.env.REWARD_TOKEN_NAME ?? "UrbanFarmRewardToken";
  const rewardTokenSymbol = process.env.REWARD_TOKEN_SYMBOL ?? "UFRT";
  const communityRewardPerSolution = process.env.COMMUNITY_REWARD_PER_SOLUTION
    ? parseEther(process.env.COMMUNITY_REWARD_PER_SOLUTION)
    : parseEther("1");

  console.log("Deploying UrbanFarmDLP contract...");

  // Deploy the reward token
  const rewardTokenDeploy = await deployments.deploy(rewardTokenContractName, {
    from: deployer.address,
    args: [rewardTokenName, rewardTokenSymbol, deployer.address],
    log: true,
  });
  const rewardToken = await ethers.getContractAt(rewardTokenContractName, rewardTokenDeploy.address);

  // Deploy the UrbanFarmDLP contract
  const params = {
    ownerAddress,
    dlpName: "Urban Farm DLP",
    description: "Data Liquidity Pool for Urban Farming",
    rewardToken: rewardToken.address,
    communityRewardPerSolution,
  };
  const proxyDeploy = await deployProxy(
    deployer,
    proxyContractName,
    implementationContractName,
    [params]
  );
  const urbanFarmDLP = await ethers.getContractAt(
    implementationContractName,
    proxyDeploy.proxyAddress
  );

  console.log("Minting and approving reward tokens...");
  // Mint and approve reward tokens
  const txMint = await rewardToken.connect(deployer).mint(deployer.address, parseEther("100000000"));
  await txMint.wait();
  const txApprove = await rewardToken.connect(deployer).approve(urbanFarmDLP.address, parseEther("1000000"));
  await txApprove.wait();

  // Verify the contracts
  await verifyContract(rewardTokenDeploy.address, [rewardTokenName, rewardTokenSymbol, deployer.address]);
  await verifyProxy(
    proxyDeploy.proxyAddress,
    proxyDeploy.implementationAddress,
    proxyDeploy.initializeData,
    proxyContractPath
  );

  console.log("UrbanFarmDLP deployed to:", urbanFarmDLP.address);
  return;
};

export default func;
func.tags = ["UrbanFarmDLPDeploy"];
