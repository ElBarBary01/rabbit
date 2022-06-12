import { useState, useRef } from "react";
import * as axios from 'axios';
import { useRouter } from "next/router";

function Product(props) {
  const [message, setMessage] = useState('');
  const {
    id,
    name,
    size,
    image,
    slug,
    price,
    stock,
    category,
    measurement,
    weight,
  } = props;

  function order(address,product,customer,email){
    const order= fetch("https://order-five.vercel.app/api/order", {
      method: "POST",
      headers: {"Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"product":product, "address": address, "customer": customer, "email":email }),
      
       
    })
    return order.order_id;

  }
  const handleNewOrder = async (e) => {
    setMessage(<form onSubmit={checkout}>
    <label>Full name:</label>
    <div><input className="border mb-1 border-black w-2/9 font-bold" type="text" required id="first" name="first" /></div>
    <div><label >Address:</label></div>
    <input className="border mb-1 border-black w-2/9 font-bold" type="text" required id="address" name="address" />
    <div><label >Email:</label></div>
    <input className="border mb-1 border-black w-2/9 font-bold" type="Email" required id="email" name="email" />
    <div><button className="border p-1 mb-1 border-black w-2/9 shadow-offset-black font-bold rounded bg-yellow-200 hover:bg-yellow-50"  type="submit">Checkout</button></div>
  </form>);
  };
  const checkout= async (event) => {
    const userInfo ={fullName: event.target.first.value, address: event.target.address.value, email: event.target.email.value};
    order(userInfo.address,product,userInfo.fullName,userInfo.email)
    
    await fetch("https://payment-elbarbary01.vercel.app/create-checkout-session", {
      method: "POST",
      headers: {"Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"name": name, "price": price, "userInfo": userInfo }),
      
       
    })
      .then(res => {
        if (res.ok) {
        return res.json()}
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        
        window.location = url
        setMessage(`Success! Your order number is: ${data.id}`);
      })
      .catch(e => {
        console.error(e.error)
      })
  }
  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96 ">
          <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={image} alt="" />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 lg:py-12">
          <h3 className="text-3xl leading-7 mb-2 font-bold uppercase lg:text-5xl">
            {name}
          </h3>
          <span className="text-2xl leading-7 font-bold mt-3">
            ${price}
          </span>
          <div className="mt-12 flex flex-row justify-between ">
            <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              onClick={(e) => handleNewOrder(e)}
            >
              Buy
            </button>
          </div>
          <div>
            <span className="text-red-600 leading-7 font-bold mt-3">
              {message}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Category</h3>
        {category}
      </div>
    </div>
  );
}

export default Product;
