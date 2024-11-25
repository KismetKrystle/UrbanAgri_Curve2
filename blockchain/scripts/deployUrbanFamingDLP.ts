const { ethers, upgrades } = require("ethers");
const { MultiBAASClient } = require("@curvegrid/multibaas-sdk");

// Configure your MultiBAAS connection
const multibaasConfig = {
  baseUrl: "https://api.multibaas.com/api/v0",
  accessToken: "YOUR_MULTIBAAS_ACCESS_TOKEN",
};

// Configure the contract deployment parameters
const contractParams = {
  dlpName: "UrbanFarmDLP",
  description: "A DLP for managing urban farming communities",
  rewardToken: "0x123456789abcdef0123456789abcdef01234567", // ERC20 token address
  communityRewardPerSolution: ethers.utils.parseEther("10"), // 10 tokens per solution
};

async function deployContract() {
  try {
    // Create a MultiBAAS client
    const multibaasClient = new MultiBAASClient(multibaasConfig);

    // Load the contract ABI
    const contractABI = require("./UrbanFarmDLP.abi.json");

    // Deploy the contract
    const contractFactory = new ethers.ContractFactory(contractABI, ethers.utils.toUtf8Bytes(contractABI), multibaasClient.ethersProvider);
    const contract = await upgrades.deployProxy(
      contractFactory,
      [
        contractParams.dlpName,
        contractParams.description,
        contractParams.rewardToken,
        contractParams.communityRewardPerSolution,
      ],
      {
        initializer: "initialize",
      }
    );

    console.log("Contract deployed to:", contract.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

deployContract();
