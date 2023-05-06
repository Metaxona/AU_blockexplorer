import '../styles/Search.css'
import { useNavigate } from 'react-router-dom'
export default function Search(){
    const navi = useNavigate()
    const submit = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const searchValue = Object.fromEntries(formData.entries()).search.trim()

        console.log(searchValue)
        console.log(searchValue.length)

        const address = new RegExp('0x[0-9a-fA-F]{40}')
        const block = new RegExp('^[0-9]{1,9999}$')
        const tx = new RegExp('0x[0-9a-fA-F]{64}')

        if(searchValue.match(tx)) return navi(`/tx/${searchValue}`)
        if(searchValue.match(address)) return navi(`/address/${searchValue}`)
        if(searchValue.match(block)) return navi(`/block/${searchValue}`)
        if(searchValue === "" ) return navi('/')
        return navi('/404')
    } 

    return (<form className="search" onSubmit={submit}>
                <input type="search" name="search" id="search" placeholder='Address | Tx Hash | Block' />
                <button type="submit" className='search-btn'>🔍</button>
            </form>)
}