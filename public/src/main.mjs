import * as casper from "https://cdn.jsdelivr.net/npm/casper-js-sdk@2.10.0";

//Create Casper client and service to interact with Casper node.
//const apiUrl = 'http://178.170.62.143:7777/rpc';
const apiUrl = 'http://44.240.166.110:29853/rpc';
const casperService = new CasperServiceByJsonRPC(apiUrl);
const casperClient = new CasperClient(apiUrl);

const btnConnect = document.getElementById("btnConnect");
btnConnect.addEventListener("click", async () => {
    window.casperlabsHelper.requestConnection();
    await AccountInformation();
})

const btnDisconnect = document.getElementById("btnDisconnect");
btnDisconnect.addEventListener("click", () => {
        window.casperlabsHelper.disconnectFromSite();
})

async function AccountInformation(){
        const isConnected = await window.casperlabsHelper.isConnected()
        if(isConnected){
                const publicKey = await window.casperlabsHelper.getActivePublicKey();
                textAddress.textContent += publicKey;

  const stateRootHash = await casperService.getStateRootHash();
alert("2");
  
                const latestBlock = await casperService.getLatestBlockInfo();
alert("3");

                const root = await casperService.getStateRootHash(latestBlock.block.hash);


                const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
                        root,
                        CLPublicKey.fromHex(publicKey)
                        )

                //account balance from the last block
                const balance = await casperService.getAccountBalance(
                        latestBlock.block.header.state_root_hash,
                        balanceUref
                );
                textBalance.textContent = `PublicKeyHex ${balance.toString()}`;
        }
}