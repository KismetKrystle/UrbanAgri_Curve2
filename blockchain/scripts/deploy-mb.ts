import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

async function main() {
  const signers = await ethers.getSigners();
  const signer = signers[0];

  // Deploy the UrbanFarmDLP contract
  const UrbanFarmDLP = await ethers.getContractFactory('UrbanFarmDLP');
  const urbanFarmDLP = await upgrades.deployProxy(
    UrbanFarmDLP,
    [
      'Urban Farm DLP', // DLP name
      'Data Liquidity Pool for Urban Farming', // DLP description
      '0x123456789012345678901234567890123456789a', // Reward token address
      ethers.utils.parseEther('1'), // Community reward per solution
    ],
    {
      initializer: 'initialize',
    }
  );

  await urbanFarmDLP.deployed();
  console.log('UrbanFarmDLP deployed to:', urbanFarmDLP.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
