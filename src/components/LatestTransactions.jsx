import '../styles/HomeTransactions.css';
import { TxCard } from './Cards';

export default function LatestTransactions({ transactions }){

    return (<div className='tx-home-container'>
                <div className='tx-home-header'>📝 Latest Transactions</div>
                {transactions.map((item)=><TxCard item={item} />)}
            </div>)
}

