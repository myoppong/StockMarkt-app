
// src/pages/HomePage.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {fetchCategories} from "../services/categoryService";
// import {fetchProducts} from "../services/productService";
// import {
//   fetchRecommended,
//   fetchViewed,
//   fetchAlsoViewed
// } from "../services/recommendationService";
// import { ShoppingCart, Heart, CreditCard } from "lucide-react";

// export default function HomePage() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [recommended, setRecommended] = useState([]);
//   const [viewed, setViewed] = useState([]);
//   const [alsoViewed, setAlsoViewed] = useState([]);
//   const [selectedCat, setSelectedCat] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [cats, prods, rec, view, also] = await Promise.all([
//           fetchCategories(),
//           fetchProducts(),
//           fetchRecommended(),
//           fetchViewed(),
//           fetchAlsoViewed()
//         ]);
//         setCategories(cats);
//         setProducts(prods);
//         setFiltered(prods);
//         setRecommended(rec);
//         setViewed(view);
//         setAlsoViewed(also);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   useEffect(() => {
//     setFiltered(
//       selectedCat
//         ? products.filter(p => p.categoryId === selectedCat)
//         : products
//     );
//   }, [selectedCat, products]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="loader" />
//       </div>
//     );
//   }

//   const renderSection = (title, items) =>
//     items.length > 0 && (
//       <section className="px-4 my-8 max-w-7xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-4">{title}</h2>
//         <div className="flex space-x-4 overflow-x-auto py-2">
//           {items.map(item => (
//             <motion.div
//               key={item.id}
//               whileHover={{ scale: 1.03 }}
//               className="relative w-44 bg-white rounded-lg shadow overflow-hidden"
//             >
//               {/* Quick Actions */}
//               <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white bg-opacity-80 p-1 rounded-lg">
//                 <button
//                   onClick={() => navigate(`/checkout/${item.id}`)}
//                   className="p-1 rounded hover:bg-green-100"
//                   title="Buy Now"
//                 >
//                   <CreditCard size={16} className="text-green-600" />
//                 </button>
//                 <button
//                   onClick={() => alert("Added to wishlist!")}
//                   className="p-1 rounded hover:bg-red-100"
//                   title="Wishlist"
//                 >
//                   <Heart size={16} className="text-red-600" />
//                 </button>
//                 <button
//                   onClick={() => alert("Added to cart!")}
//                   className="p-1 rounded hover:bg-blue-100"
//                   title="Add to Cart"
//                 >
//                   <ShoppingCart size={16} className="text-blue-600" />
//                 </button>
//               </div>

//               <Link to={`/product/${item.id}`}>
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-32 object-cover"
//                 />
//                 <div className="p-3">
//                   <h3 className="text-sm font-semibold truncate">
//                     {item.name}
//                   </h3>
//                   <p className="text-green-600 font-bold mt-1 text-sm">
//                     ${item.price.toLocaleString()}
//                   </p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     );

//   return (
//     <div className="bg-gray-50">
//       {/* Hero */}
//       <section className="h-64 md:h-96 relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url(https://images.pexels.com/photos/2132115/pexels-photo-2132115.jpeg?auto=compress&cs=tinysrgb&w=1600)"
//           }}
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40" />
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center px-4"
//         >
//           Welcome to StockMart
//         </motion.h1>
//       </section>

//       {/* Category Filter */}
//       <section className="my-8 px-4 max-w-7xl mx-auto">
//         <div className="flex space-x-4 overflow-x-auto py-2">
//           <button
//             onClick={() => setSelectedCat(null)}
//             className={`px-4 py-2 rounded-full whitespace-nowrap ${
//               selectedCat === null
//                 ? "bg-green-600 text-white"
//                 : "bg-white text-gray-700 shadow"
//             }`}
//           >
//             All
//           </button>
//           {categories.map(cat => (
//             <button
//               key={cat.id}
//               onClick={() => setSelectedCat(cat.id)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                 selectedCat === cat.id
//                   ? "bg-green-600 text-white"
//                   : "bg-white text-gray-700 shadow"
//               }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Main Products Grid */}
//       <section className="px-4 pb-12 max-w-7xl mx-auto">
//         {filtered.length === 0 ? (
//           <p className="text-center text-gray-500">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {filtered.map(product => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ scale: 1.03 }}
//                 className="relative bg-white rounded-lg shadow overflow-hidden"
//               >
//                 {/* Quick Actions */}
//                 <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white bg-opacity-80 p-1 rounded-lg">
//                   <button
//                     onClick={() => navigate(`/checkout/${product.id}`)}
//                     className="p-1 rounded hover:bg-green-100"
//                     title="Buy Now"
//                   >
//                     <CreditCard size={16} className="text-green-600" />
//                   </button>
//                   <button
//                     onClick={() => alert("Added to wishlist!")}
//                     className="p-1 rounded hover:bg-red-100"
//                     title="Wishlist"
//                   >
//                     <Heart size={16} className="text-red-600" />
//                   </button>
//                   <button
//                     onClick={() => alert("Added to cart!")}
//                     className="p-1 rounded hover:bg-blue-100"
//                     title="Add to Cart"
//                   >
//                     <ShoppingCart size={16} className="text-blue-600" />
//                   </button>
//                 </div>

//                 <Link to={`/product/${product.id}`}>
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="p-3">
//                     <h3 className="text-sm font-semibold truncate">
//                       {product.name}
//                     </h3>
//                     <p className="text-green-600 font-bold mt-1 text-sm">
//                       ${product.price.toLocaleString()}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Recommendation Sections */}
//       {renderSection("Recommended For You", recommended)}
//       {renderSection("You Viewed", viewed)}
//       {renderSection("Customers Also Viewed", alsoViewed)}
//     </div>
//   );
// }


// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchCategories } from "../services/categoryService";
import { fetchProducts } from "../services/productService";
import {
  fetchRecommended,
  fetchViewed,
  fetchAlsoViewed
} from "../services/recommendationService";
import { ShoppingCart, Heart, CreditCard } from "lucide-react";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [alsoViewed, setAlsoViewed] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods, rec, view, also] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchRecommended(),
          fetchViewed(),
          fetchAlsoViewed()
        ]);
        setCategories(cats);
        setProducts(prods);
        setFiltered(prods);
        setRecommended(rec);
        setViewed(view);
        setAlsoViewed(also);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setFiltered(
      selectedCat ? products.filter(p => p.categoryId === selectedCat) : products
    );
  }, [selectedCat, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  const renderSection = (title, items) =>
    items.length > 0 && (
      <section className="px-4 my-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all"
            >
              <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white/80 p-1 rounded-md z-10">
                <button
                  onClick={() => navigate(`/checkout/${item.id}`)}
                  className="p-1 rounded hover:bg-green-100"
                  title="Buy Now"
                >
                  <CreditCard size={16} className="text-green-600" />
                </button>
                <button
                  onClick={() => alert("Added to wishlist!")}
                  className="p-1 rounded hover:bg-red-100"
                  title="Wishlist"
                >
                  <Heart size={16} className="text-red-600" />
                </button>
                <button
                  onClick={() => alert("Added to cart!")}
                  className="p-1 rounded hover:bg-blue-100"
                  title="Add to Cart"
                >
                  <ShoppingCart size={16} className="text-blue-600" />
                </button>
              </div>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold mt-1 text-sm">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    );

  return (
    <div className="bg-gray-50">
      <section className="h-64 md:h-96 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2132115/pexels-photo-2132115.jpeg?auto=compress&cs=tinysrgb&w=1600)"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center px-4"
        >
          Welcome to StockMart
        </motion.h1>
      </section>

      <section className="my-8 px-4 max-w-7xl mx-auto">
        <div className="flex space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCat === null
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 shadow"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCat === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all"
              >
                <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white/80 p-1 rounded-md z-10">
                  <button
                    onClick={() => navigate(`/checkout/${product.id}`)}
                    className="p-1 rounded hover:bg-green-100"
                    title="Buy Now"
                  >
                    <CreditCard size={16} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => alert("Added to wishlist!")}
                    className="p-1 rounded hover:bg-red-100"
                    title="Wishlist"
                  >
                    <Heart size={16} className="text-red-600" />
                  </button>
                  <button
                    onClick={() => alert("Added to cart!")}
                    className="p-1 rounded hover:bg-blue-100"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={16} className="text-blue-600" />
                  </button>
                </div>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-bold mt-1 text-sm">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {renderSection("Recommended For You", recommended)}
      {renderSection("You Viewed", viewed)}
      {renderSection("Customers Also Viewed", alsoViewed)}
    </div>
  );
}

