import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Block from './pages/Block';
import Transaction from './pages/Transaction';
import Address from './pages/Address';
import NFT from './pages/Nft';

function App() {
 
return (<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:blocknumber" element={<Block />} />
          <Route path="/tx/:txhash" element={<Transaction />} />
          <Route path="/address/:address" element={<Address />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="*" element={<NotFound />} />
        </Routes>);
}

export default App;
