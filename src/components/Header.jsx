import '../styles/Header.css';
import { useEffect, useState } from 'react';
import { alchemy } from '../alchemy.js';
import Search from './Search';
import { Link } from 'react-router-dom';
import { Utils } from 'alchemy-sdk';
function AsyncReactInterval(callback, timeInMs){
    
    useEffect(()=>{
        callback()

        const inţerval = setInterval(async ()=>{ await callback() }, timeInMs)
  
        return ()=>{clearInterval(inţerval)}

    }, [callback, timeInMs])
}

export default function Header(){
    const [blockNumber, setBlockNumber] = useState();
    const [gas, setGas] = useState();
    const [price, setPrice] = useState()

    AsyncReactInterval(async()=>setBlockNumber(await alchemy.core.getBlockNumber()), 15000)
    AsyncReactInterval(async()=>setGas(Math.round(Utils.formatUnits(await alchemy.core.getGasPrice(), "gwei"))), 15000)
    AsyncReactInterval(async()=>{
        try{
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
            if(res.status !== 200) throw new Error("Error Fetching Eth Price From Coingecko")
            const data = await res.json()
            localStorage.setItem("ethPrice", data.ethereum.usd)
            setPrice(localStorage.getItem("ethPrice"))
        }
        catch(err){
            setPrice(localStorage.getItem("ethPrice"))
            console.log(err)
        }
    }, 60000)

    return (<div>
            <header className="header">
                <Link className="brand" to="/">ETH Block Explorer </Link>
                <div className='price'>${price} / ETH</div>
                <div title='Latest Block' className="block">🧊 {blockNumber}</div>
                <div title='Base Gas' className="gas">⛽ {gas} gwei</div>
            </header>
            <nav className='nav'><Link className='nav-link' to="/">Home</Link> <Link className='nav-link' to="/nft">NFT Look Up</Link><Search /></nav>  
    </div>)
}