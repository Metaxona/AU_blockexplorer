import '../styles/HomeTransactions.css';
import { BlockCard } from './Cards';

export default function LatestBlocks({ blocks }){

    return (<div className='tx-home-container'>
            <div className='tx-home-header'>🧊 Latest Blocks</div>
            {blocks.map((item)=><BlockCard item={item} />)}
        </div>)
}