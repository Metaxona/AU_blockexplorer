import { IPFStoHTTP } from "../utils/ipfstohttps";

export default function NFTCard({metadata, floorprice, rarity}){
    return(
        <div className="nft-description">
        <div className="nft-card">
            <div className="nft-card-header" key="nch" title={metadata?.contract?.address}>{metadata?.contract?.name.toUpperCase()}</div>
            <div><img className="nft-card-image" key="ncim" src={IPFStoHTTP(metadata?.rawMetadata?.image)} alt={metadata?.tokenId} /></div>
            <div className="nft-card-id" key="ncid">{(metadata?.title)?metadata?.title: metadata?.tokenId} <div key="nctyp" className="nft-card-token-type">{metadata?.contract?.tokenType}</div></div>
            <div className="nft-card-floor-price" key="ncfp">Floor Price: {floorprice}</div>
        </div>
        <div className="nft-card-traits">{rarity.map((item, index)=><div key={`${item}-${index}-nctr`} className="nft-card-trait"><div>{item?.value}</div>
        <small className="nft-trait" key="ntra">{item?.traitType}</small><div key="ntrara" className="nft-trait-rarity">{(Number(item.prevalence)*100).toFixed(2)}%</div></div>)}</div>
        </div>
    )
}