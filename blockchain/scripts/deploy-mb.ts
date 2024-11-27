import hre from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

async function main() {
  const signers = await hre.ethers.getSigners();
  const signer = signers[0];

  // Setup MultiBaas deployer
  await hre.mbDeployer.setup();

  // Deploy UrbanFarmDLP contract
  const urbanFarmDLP = await hre.mbDeployer.deploy(signer as SignerWithAddress, 'UrbanFarmDLP', [], {
    addressLabel: 'urban_farm_dlp',
    contractVersion: '1.0',
    contractLabel: 'urban_farm_dlp',
  });

  console.log(
    `UrbanFarmDLP deployed to ${urbanFarmDLP.contract.target}`
  );

  // If your UrbanFarmDLP contract has any initialization parameters, you can add them here
  // For example, if it needs an initial admin address:
  // const adminAddress = "0x..."; // Replace with actual admin address
  // await urbanFarmDLP.contract.initialize(adminAddress);

  // If you need to deploy any additional contracts or perform any other setup, you can do it here
  // For example:
  // const someOtherContract = await hre.mbDeployer.deploy(signer as SignerWithAddress, 'SomeOtherContract', [], {
  //   addressLabel: 'some_other_contract',
  //   contractVersion: '1.0',
  //   contractLabel: 'some_other_contract',
  // });

  console.log('Deployment completed successfully');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
