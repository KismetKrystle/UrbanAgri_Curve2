const deploymentConfig = {
  // Private key of the deployer account, beginning with 0x
  deployerPrivateKey: '0x96f37ff80736d91fe5ac616539f918d568ba506ac7c1a4d5d2b02b472e3f89c8',

  // Full URL such as https://abc123.multibaas.com
  deploymentEndpoint: 'https://rv5tmo7fsfbzrjoo4runkrfwae.multibaas.com',

  // The chain ID of the blockchain network
  // For example: Curvegrid test network = 2017072401, Ethereum Mainnet = 1, BSC Testnet = 97, BSC Mainnet = 56, Ethereum Sepolia = 11155111
  ethChainID: 2017072401,

  // API key to access MultiBaas web3 endpoint
  // Note that the API key MUST be part of the "Web3" group
  // Create one on MultiBaas via navigation bar > Admin > API Keys
  web3Key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzMyNTIwNTc2LCJqdGkiOiJkZjBjZGViZC1mN2VkLTRhODQtYTg3Mi0xMDgyYTdlYmMzODYifQ.ms0t-uzvvclGcsh2l6TTHSJZ882ikHyFB25RgNtsq7o',

  // RPC URL of the blockchain network is required if a web3Key is not provided
  // This is required for networks that where MultiBaas does not support the web3 proxy feature
  rpcUrl: '',

  // API key to access MultiBaas from deployer
  // Note that the API key MUST be part of the "Administrators" group
  // Create one on MultiBaas via navigation bar > Admin > API Keys
  adminApiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzMyNTIwNjg2LCJqdGkiOiIxYjVjMTE5My1kY2Q2LTRmNzItYWExNS1mZGUzOGU5NGQ1ODAifQ.a8eXg7gJ9dv84dSKCbO9X2ANUF4H7UR_dXrruD2qvcA',
};

module.exports = {
  deploymentConfig,
};
