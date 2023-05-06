import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Transaction.css"
import { useNavigate, useParams } from "react-router-dom";
import { alchemy } from "../alchemy";
import { TransactionInfo } from "../components/Info";

export default function Transaction(){
    const params = useParams();
    const [transaction, setTransaction] = useState();
    const [receipt, setReceipt] = useState();
    const navi = useNavigate()
    let isMounted = useRef(true)
    useEffect(()=>{
        async function getTransaction(){
            try{
                const reg = new RegExp('0x[0-9a-fA-F]{64}')
                if(!params.txhash.match(reg)) throw new Error("Invalid Transaction")

                const data = await alchemy.core.getTransactionReceipt(params.txhash)
                const data1 = await alchemy.core.getTransaction(params.txhash)
                
                if(!data) throw new Error("Invalid Transaction")

                setReceipt(data)
                setTransaction(data1)
                console.log(data)
                console.log(data1)
            }
            catch(err){
                navi('/404', {replace: true})
            }
        }

        if(isMounted.current){
            getTransaction()
        }

        return()=>{isMounted.current = false}
    }, [params.txhash])

    return (<>
        <Header />
        <div className="page-content">
            {(receipt && transaction) && <TransactionInfo transaction={transaction} receipt={receipt} />}
        </div>
        <Footer />
    </>)
}