const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GOERLI_RPC_URL
  );

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("__contracts_Greeter_sol_Greeter.abi", "utf-8");
  const binary = fs.readFileSync(
    "__contracts_Greeter_sol_Greeter.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait..");
  const contract = await contractFactory.deploy();
  const txReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  const greeting = await contract.greet();
  console.log(`Contract says: ${greeting}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
