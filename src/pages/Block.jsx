import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { alchemy } from "../alchemy";
import { BlockInfo } from "../components/Info";

export default function Block(){
    const params = useParams();
    const [block, setBlock] = useState();
    const navi = useNavigate()
    useEffect(()=>{
        async function getBlock(){
            try{
                const data = await alchemy.core.getBlock(parseInt(params.blocknumber))
                if(!data) throw new Error("Invalid Block")

                setBlock(data)
                console.log(data)
            }
            catch(err){
                navi('/404', {replace: true})
            }
        }
        getBlock()
    }, [params.blocknumber])


    return (<>
        <Header />
        <div className="page-content">
            <BlockInfo block={block} />
        </div>
        <Footer />
    </>)
}