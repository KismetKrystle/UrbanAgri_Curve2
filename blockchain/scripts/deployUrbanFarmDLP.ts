import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "../utils/helpers";

const implementationContractName = "UrbanFarmDLP";
const proxyContractName = "UrbanFarmDLPProxy";
const rewardTokenContractName = "RewardToken";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, mbDeployer } = hre;
  const [deployer] = await ethers.getSigners();

  const ownerAddress = process.env.OWNER_ADDRESS ?? deployer.address;
  const rewardTokenName = process.env.REWARD_TOKEN_NAME ?? "UrbanFarmRewardToken";
  const rewardTokenSymbol = process.env.REWARD_TOKEN_SYMBOL ?? "UFRT";
  const communityRewardPerSolution = process.env.COMMUNITY_REWARD_PER_SOLUTION
    ? parseEther(process.env.COMMUNITY_REWARD_PER_SOLUTION)
    : parseEther("1");

  console.log("Deploying UrbanFarmDLP contract...");

  // Setup MultiBaas deployer
  await mbDeployer.setup();

  // Deploy the reward token
  const rewardToken = await mbDeployer.deploy(deployer, rewardTokenContractName, [rewardTokenName, rewardTokenSymbol, deployer.address], {
    addressLabel: 'urban_farm_reward_token',
    contractVersion: '1.0',
    contractLabel: 'urban_farm_reward_token',
  });

  console.log(`RewardToken deployed to ${rewardToken.contract.target}`);

  // Deploy the UrbanFarmDLP contract
  const params = {
    ownerAddress,
    dlpName: "Urban Farm DLP",
    description: "Data Liquidity Pool for Urban Farming",
    rewardToken: rewardToken.contract.target,
    communityRewardPerSolution,
  };

  const urbanFarmDLP = await mbDeployer.deployProxy(deployer, implementationContractName, [params], {
    addressLabel: 'urban_farm_dlp',
    contractVersion: '1.0',
    contractLabel: 'urban_farm_dlp',
    proxyContract: proxyContractName,
  });

  console.log(`UrbanFarmDLP deployed to ${urbanFarmDLP.contract.target}`);

  console.log("Minting and approving reward tokens...");

  // Mint and approve reward tokens
  const rewardTokenContract = await ethers.getContractAt(rewardTokenContractName, rewardToken.contract.target);
  const txMint = await rewardTokenContract.connect(deployer).mint(deployer.address, parseEther("100000000"));
  await txMint.wait();
  const txApprove = await rewardTokenContract.connect(deployer).approve(urbanFarmDLP.contract.target, parseEther("1000000"));
  await txApprove.wait();

  console.log("Deployment completed successfully");
};

export default func;
func.tags = ["UrbanFarmDLPDeploy"];
