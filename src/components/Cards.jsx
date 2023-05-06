import { Link } from "react-router-dom"
import { relativeTimeFormat } from "../utils/dateFormatter"
import shortenAddress from "../utils/shortenAddress"
import '../styles/HomeTransactions.css';

export function TxCard({item}){
    return(
        <div className='card' key={item.hash}>
            <div className='icon'>📝</div>
                <div className='body'>
                    <div className='title' title={item.hash}><Link className="list-links" to={`/tx/${item.hash}`}>{shortenAddress(item.hash)}</Link></div>
                    <small className='time'>{relativeTimeFormat(item.timestamp)}</small>
                    <div title={item.from}><small>From: </small><Link className="list-links" to={`/address/${item?.from}`}>{shortenAddress(item.from)}</Link></div>
                    <div title={item.to}><small>To: </small><Link className="list-links" to={`/address/${item?.from}`}>{shortenAddress(item.to)}</Link></div>
            </div>
        </div>
    )
}

export function BlockCard({item}){
    return(
        <div className='card' key={item.number}>
                <div className='icon'>🧊</div>
                <div className='body'>
                <div className='title'><Link className="list-links" to={`/block/${item.number}`}>{item.number}</Link></div>
                <small className='time'>{relativeTimeFormat(item.timestamp)}</small>
                <div><small>miner: </small><Link className="list-links" to={`/address/${item.miner}`}>{shortenAddress(item.miner)}</Link></div>
                <div><small>Tx Count: </small>{item.transactions.length}</div>
            </div>
        </div>
    )
}
