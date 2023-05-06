import { relativeTimeFormat, dateFormat } from "../utils/dateFormatter"
import { Link } from "react-router-dom"
import "../styles/Block.css"
import "../styles/Transaction.css"
import "../styles/Address.css" 
import { Utils } from "alchemy-sdk"
export function BlockInfo({block}){
    return(
        <div className="blockinfo">
            <div className="block-card">
                <div className="block-card-header">🧊 Block {block?.number}</div>
                <div className="block-card-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>Hash:</td>
                                <td className="break-word" >{block?.hash}</td>
                            </tr>
                            <tr>
                                <td>Timestamp:</td>
                                <td className="break-word" >{block?.timestamp?relativeTimeFormat(block.timestamp):null} ( {block?.timestamp?dateFormat(block.timestamp):null} )</td>
                            </tr>
                            <tr>
                                <td>Nonce:</td>
                                <td className="break-word" >{block?.nonce}</td>
                            </tr>
                        </tbody>
                    </table>
                    <details><summary>Transactions [{block?.transactions.length}]: </summary>
                    <ul>{block?.transactions.map((item, index)=><li key={item}>[{index}] <Link className="list-links break-word" to={`/tx/${item}`}>{item}</Link></li>)}</ul></details>
                </div>
            </div>
        </div>
    )
}

export function TransactionInfo({transaction, receipt}){
    return (
        <div className="txsinfo">
            <div className="txs-card">
                <div className="txs-card-header">📝 Transaction {receipt?.transactionHash}</div>
                <div className="txs-card-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>block:</td>
                                <td><Link className="list-links" to={`/block/${receipt?.blockNumber}`}>{receipt?.blockNumber}</Link> [{receipt?.confirmations} Confirmations]</td>
                            </tr>
                            <tr>
                                <td>Hash:</td>
                                <td>{receipt?.transactionHash}</td>
                            </tr>
                            <tr>
                                <td>Status:</td>
                                <td><div className={(receipt?.status === 0)? "Failed" : (receipt?.status === 1)? "Success" : ""}>{(receipt?.status === 0)? "Failed" : (receipt?.status === 1)? "Success" : ""}</div></td>
                            </tr>
                            <tr>
                                <td>From:</td>
                                <td><Link className="list-links" to={`/address/${receipt?.from}`}>{receipt?.from}</Link></td>
                            </tr>
                            <tr>
                                <td>To:</td>
                                <td><Link className="list-links" to={`/address/${receipt?.to}`}>{receipt?.to}</Link></td>
                            </tr>
                            <tr>
                                <td>Value:</td>
                                <td>{transaction?Utils.formatUnits(transaction.value, "ether"):null} ETH</td>
                            </tr>
                            <tr>
                                <td>Timestamp:</td>
                                <td>{transaction?relativeTimeFormat(transaction?.timestamp):null} ( {transaction?dateFormat(transaction?.timestamp):null} )</td>
                            </tr>
                            <tr>
                                <td>Nonce:</td>
                                <td>{transaction?.nonce}</td>
                            </tr>
                            <tr>
                                <td>Gas Price:</td>
                                <td>{transaction?Number(Utils.formatUnits(transaction?.gasPrice, "gwei")).toFixed(2):null} gwei</td>
                            </tr>
                            <tr>
                                <td>Gas Limit:</td>
                                <td>{transaction?Utils.formatUnits(transaction?.gasLimit, "wei"):null} wei</td>
                            </tr>
                            <tr>
                                <td>Gas Used:</td>
                                <td>{(receipt)?Utils.formatUnits(receipt.gasUsed, "wei"):null} {"wei"} ({(transaction)?((Utils.formatUnits(receipt.gasUsed, "wei")/Utils.formatUnits(transaction.gasLimit, "wei"))*100).toFixed(2):null}%)</td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td>{transaction?.type}</td>
                            </tr>
                            <tr>
                                <td>r</td>
                                <td>{transaction?.r}</td>
                            </tr>
                            <tr>
                                <td>s</td>
                                <td>{transaction?.s}</td>
                            </tr>
                            <tr>
                                <td>v</td>
                                <td>{transaction?.v}</td>
                            </tr>
                            <tr>
                                <td>Data:</td>
                                <td><div className="overflow-scroll">{transaction?.data}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <details><summary>Logs [{receipt?.logs.length}]: </summary>
                        <ul>{receipt?.logs.map((item, index)=><li key={`${item?.transactionIndex}${item?.blockNumber}`}>
                             {console.log(item)}
                             <details><summary className="break-word">[{index}] {"->"} {item?.transactionHash}</summary>
                             <table>
                                <tbody>
                                    <tr>
                                        <td>transactionIndex:</td>
                                        <td>{item?.transactionIndex}</td>
                                    </tr>
                                    <tr>
                                        <td>blockNumber:</td>
                                        <td>{item?.blockNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>address:</td>
                                        <td>{item?.address}</td>
                                    </tr>
                                    <tr>
                                        <td>topics:</td>
                                        <td>{item?.topics.map((item)=><li key={item}>{item}</li>)}</td>
                                    </tr>
                                    <tr>
                                        <td>data:</td>
                                        <td><div className="overflow-scroll">{item?.data}</div></td>
                                    </tr>
                                    <tr>
                                        <td>logIndex:</td>
                                        <td>{item?.logIndex}</td>
                                    </tr>
                                    <tr>
                                        <td>blockHash:</td>
                                        <td>{item?.blockHash}</td>
                                    </tr>
                                </tbody>
                             </table>
                             </details></li>)}
                        </ul>
                    </details>
                </div>
                <div className="txs-card-Footer"></div>
            </div>
        </div>
    )
}

export function AddressInfo({balance, address, count}){
    return(
        <div className="addressinfo">
            <div className="address-card">
                <div className="address-card-header">💳 Address {address}</div>
                <div className="address-card-body">
                    <div title={balance}>Balance: {Number(balance).toFixed(3)} ETH</div>
                    <div>Transaction Count: {count}</div>
                </div>
                <div className="address-card-Footer"></div>
            </div>
        </div>
    )
}
