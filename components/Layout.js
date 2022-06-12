import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Layout({ children }) {
  const [session, setSession] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);
  const handleOpen = () => setCartOpen(!cartOpen);

  const router = useRouter();
  return (
    <div className="">
      <header>
        
        <div className="px-20 py-3 bg-green-700">
          <div className="flex items-center justify-between">
            <div className="w-full text-red-700 md:text-left text-2xl font-semibold">
            <Link href="/"><a><img src="https://www.rabbitmart.com/wp-content/uploads/2021/11/Asset-4.png"style={{height: '3em', objectFit:'contain'}} width={130} alt="" /></a></Link>
            </div>
            <div className="flex items-center justify-end w-full lg:w-2/5 lg:justify-around"> 
            <Link href="/search"><a><button className="border p-1 mb-1 border-black w-2/9 shadow-offset-black font-bold rounded-full bg-yellow-300 hover:bg-yellow-200" >search</button></a></Link>
              
             
            </div>
          </div>
          <nav
            className={`${menuOpen ? "" : "hidden"
              } sm:flex sm:justify-center sm:items-center mt-4 `}
          >
          </nav>
        </div>
      </header>
      <main className="my-8">{children}</main>
    </div>
  );
}

export default Layout;
