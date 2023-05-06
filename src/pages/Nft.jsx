import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/NFT.css"
import { useState } from 'react';
import { alchemy } from '../alchemy.js'
import NFTCard from "../components/NftCard";

export default function NFT(){
    const [floorPrice, setFloorPrice] = useState()
    const [metaData, setMetaData] = useState([])
    const [rarity, setRarity] = useState([])
    const [nftDescription, setNftDescription] = useState(false)
    
    async function onSearch(event){
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const searchValue = Object.fromEntries(formData.entries())
        
        if(!searchValue.contractaddress.match(new RegExp('0x[0-9a-fA-F]{40}')) || !searchValue.tokenid.match(new RegExp('^[0-9]{1,9999}$'))) return;

        const [md, fp, r] = await Promise.allSettled([alchemy.nft.getNftMetadata(searchValue.contractaddress.trim(), searchValue.tokenid.trim()),
                                                    alchemy.nft.getFloorPrice(searchValue.contractaddress.trim()),
                                                    alchemy.nft.computeRarity(searchValue.contractaddress.trim(), searchValue.tokenid.trim())])

        setMetaData(md.value)
        setFloorPrice(`${fp.value.openSea.floorPrice} ${fp.value.openSea.priceCurrency}`)
        setRarity(r.value)
        setNftDescription(true)
    }

    return (<>
        <Header />
        <div className="page-content">
            <form className="search-group" onSubmit={onSearch}>
                <legend htmlFor="contractaddress">NFT Contract Address
                <input type="text" className="search-input margin-left" name="contractaddress" id="contractaddress" />
                </legend>
                <legend htmlFor="tokenid">NFT Id
                <input type="number" className="search-input margin-left" name="tokenid" id="tokenid" />
                </legend>
                
                <button className="search-btn margin-left" type="submit">🔍</button>
            </form>
            { nftDescription && <NFTCard metadata={metaData} floorprice={floorPrice} rarity={rarity} /> }
        </div>
        <Footer />
    </>)
}
