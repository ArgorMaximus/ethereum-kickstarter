const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const mnemonic = process.env.MNEMONIC

const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/4356994df3ec46b0a10657490b3b64a0");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: '0x'+ compiledFactory.bytecode })
  .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deployed to:', result.options.address);
};

deploy();
