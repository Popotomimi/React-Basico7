import './App.css';

import { useState } from 'react';

// 4 - custom hook
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/Products";


function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const {data: itens, httpConfig, loading: carrega, error} = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 2 - Adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    };

    /*const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    });

    // 3 - Carregamento Dinâmico
    const addedProduct = await res.json();

    setProducts((prevProducts) => [...prevProducts, addedProduct]); */

    //5 - refatorando POST
    httpConfig(product, "POST");

    setName("");
    setPrice("");

  };

  // 8 - desafio 6
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  }

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* 6 - Loading */}
      {carrega && <p>Carregando dados...</p> }
      {error && <p>{error}</p> }
      {itens === null ? "Sem lista" : 
      <ul>
        {itens.map(item => (
          <li key={item.id}>{item.name} - {item.price} <button onClick={() => handleRemove(item.id)} >Excluir</button> </li>
        ))}
      </ul>}
      
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome: 
            <input type="text" id='name' value={name} name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço: 
            <input type="number" id='value' value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* 7 - state de loading no post */}
          {!carrega && <input type="submit" value="Enviar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
