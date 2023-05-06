import Header from "../components/Header"
import Footer from "../components/Footer"
import LatestBlocks from "../components/LatesetBlocks"
import LatestTransactions from "../components/LatestTransactions"
import "../styles/HomeTransactions.css"
import { useState, useEffect, useRef } from 'react';
import { alchemy } from '../alchemy.js'

export default function Home(){

    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])
    const isMounted = useRef(true);
    useEffect(()=>{
        isMounted.current = true;
        async function getBlocksAndTxs(){
            const blockNumber = await alchemy.core.getBlockNumber()
            const recentblocks = []
            const recenttransactions = []
            
            const [b1, b2, b3, b4, b5] = await Promise.allSettled([
                alchemy.core.getBlockWithTransactions(blockNumber),
                alchemy.core.getBlockWithTransactions(blockNumber-1),
                alchemy.core.getBlockWithTransactions(blockNumber-2),
                alchemy.core.getBlockWithTransactions(blockNumber-3),
                alchemy.core.getBlockWithTransactions(blockNumber-4)
            ])
            
            console.log(b1, b2, b3, b4, b5)
            recentblocks.push(b1.value)
            recentblocks.push(b2.value)
            recentblocks.push(b3.value)
            recentblocks.push(b4.value)
            recentblocks.push(b5.value)
            
            for(let i = 0; i < 5; i++){
                const tx = recentblocks.at(0).transactions[i]
                tx.timestamp = recentblocks.at(0).timestamp
                recenttransactions.push(tx)
            }
            setBlocks(recentblocks)
            setTransactions(recenttransactions)
            
        }
        
       if(isMounted.current){
        getBlocksAndTxs()
        console.log(blocks)
        console.log(transactions)
       }
       
       return ()=>{
           isMounted.current = false
        }
        
    }, [])

    return (<>
        <Header />
        <div className="page-content">
            <div className="home-content">
                <LatestBlocks blocks={blocks} />
                <LatestTransactions transactions={transactions} />
            </div>
        </div>
        <Footer />
    </>)
}