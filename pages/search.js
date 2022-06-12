import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "./porductss";
function App() { 
  const [name, setName] = useState('');

  const [foundUsers, setFoundUsers] = useState(products);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = products.filter((product) => {
        return product.name.toLowerCase().startsWith(keyword.toLowerCase());
        });
      setFoundUsers(results);
    } else {
      setFoundUsers(products);
  
    }

    setName(keyword);
  };

  return (
    <div className="container mx-auto">
      <input 
        type="search"
        value={name}
        onChange={filter}
        className="border mb-1 border-black w-2/9 font-bold"
        placeholder="search"
      />

    <div>
        {(
          <div className="grid grid-cols-2 w-full gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8 border">
            { foundUsers && foundUsers.length > 0 ?(
            foundUsers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))): (
                <h1>No results found!</h1>
              )}
          </div>
        )}
      </div>
    </div>
  );
            }



export default App