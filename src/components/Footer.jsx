import '../styles/Footer.css';
export default function Footer(){
    async function addETHNetwork() {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x1",
              rpcUrls: ["https://mainnet.infura.io/v3/"],
              chainName: "Eth Mainnet",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
              },
              blockExplorerUrls: ["https://etherscan.io/"]
            }]
          });
        } catch (error){
          console.log(error)
        }
      }
      
      return (<footer className='footer'>
                <button className='addNetworkBtn' onClick={addETHNetwork}>Add Network To Wallet</button>
            </footer>)
}