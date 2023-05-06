import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Address.css"
import { useNavigate, useParams, Link } from "react-router-dom";
import { alchemy } from "../alchemy";
import { Utils } from "alchemy-sdk";
import { AddressInfo } from "../components/Info";
import shortenAddress from "../utils/shortenAddress";

export default function Address(){
    const params = useParams();
    const [balance, setBalance] = useState();
    const [count, setCount] = useState();
    const [history, setHistory] = useState()
    const [showHistory, setShowHistory] = useState()
    const [historyLabel, setHistoryLabel] = useState()

    const navi = useNavigate()
    useEffect(()=>{
        
        async function getAddress(){
            try{
                const reg = new RegExp('0x[0-9a-fA-F]{40}')
                if(!params.address.match(reg)) throw new Error("Invalid Address")

                const data = await alchemy.core.getBalance(String(params.address))
                const count = await alchemy.core.getTransactionCount(String(params.address))
                
                if(!data) throw new Error("Invalid Address")

                setBalance(Utils.formatUnits(data, "ether"))
                setCount(count)
                
                console.log(Utils.formatUnits(data, "ether"))
                console.log(count)
            }
            catch(err){
                console.log(err)
                navi('/404', {replace: true})
            }
        }
        getAddress()
    }, [params.address])

    useEffect(()=>{
        async function getHistory(){
            const [historyfrom, historyto] = await Promise.allSettled([alchemy.core.getAssetTransfers({
                fromBlock: '0x0',
                toBlock: 'latest',
                fromAddress: String(params.address),
                excludeZeroValue: true,
                category: ['internal', 'external', 'erc20', 'erc721', 'erc1155']
            }),alchemy.core.getAssetTransfers({
                fromBlock: '0x0',
                toBlock: 'latest',
                toAddress: String(params.address),
                excludeZeroValue: true,
                category: ['internal', 'external', 'erc20', 'erc721', 'erc1155']
            })])
            
            setHistory([...historyfrom.value.transfers, ...historyto.value.transfers].reverse())
            console.log(historyfrom)
            console.log(historyto)
        }
        getHistory()
    }, [params.address])
    
    const onTabClickE = async () =>{ setHistoryLabel('External'); setShowHistory(history?.filter((item)=>{return item.category === 'external'})); }
    const onTabClickI = async () =>{ setHistoryLabel('Internal'); setShowHistory(history?.filter((item)=>{return item.category === 'internal'})); }
    const onTabClick20 = async () =>{ setHistoryLabel('ERC20'); setShowHistory(history?.filter((item)=>{return item.category === 'erc20'})); }
    const onTabClick721 = async () =>{ setHistoryLabel('ERC721'); setShowHistory(history?.filter((item)=>{return item.category === 'erc721'})); }
    const onTabClick1155 = async () =>{ setHistoryLabel('ERC1155'); setShowHistory(history?.filter((item)=>{return item.category === 'erc1155'})); }

    return (<>
        <Header />
        <div className="page-content">
            <AddressInfo address={params.address} count={count} balance={balance} />
            <div className="transaction-history">
            <div className="history-title">Transactions: {historyLabel}</div>
            <div>
            <button className="history-button" onClick={onTabClickE}>External</button>
            <button className="history-button" onClick={onTabClickI}>Internal</button>
            <button className="history-button" onClick={onTabClick20}>Erc20</button>
            <button className="history-button" onClick={onTabClick721}>Erc721</button>
            <button className="history-button" onClick={onTabClick1155}>Erc1155</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <td key="history-Hash">Hash</td>
                        <td key="history-Block">Block</td>
                        <td key="history-From">From</td>
                        <td key="history-To">To</td>
                        <td key="history-Value">Value</td>
                    </tr>
                </thead>
                <tbody>
                    {showHistory?.map((item)=>{
                        return (<tr key={`${item.uniqueId}-1`}>
                                    <td key={`${item.uniqueId}-2`}  title={item.hash}><Link className="list-links" to={`/tx/${item.hash}`}>{shortenAddress(item.hash)}</Link></td>
                                    <td key={`${item.uniqueId}-3`} ><Link className="list-links" to={`/block/${parseInt(item.blockNum, 16)}`}>{parseInt(item.blockNum, 16)}</Link></td>
                                    <td key={`${item.uniqueId}-4`}  title={item.from}><Link className="list-links" to={`/address/${item.from}`}>{shortenAddress(item.from)}</Link></td>
                                    <td key={`${item.uniqueId}-5`}  title={item.to}><Link className="list-links" to={`/address/${item.to}`}>{shortenAddress(item.to)}</Link></td>
                                    <td key={`${item.uniqueId}-6`} >{Number(item.value).toFixed(4)} {item.asset}</td>
                                </tr>)
                    })}
                    
                </tbody>
            </table>
            </div>
            
        </div>
        <Footer />
    </>)
}