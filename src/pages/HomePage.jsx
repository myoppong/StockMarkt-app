// src/pages/HomePage.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {fetchCategories} from "../services/categoryService";
// import {fetchProducts} from "../services/productService";
// import {fetchRecommended,fetchViewed,fetchAlsoViewed} from "../services/recommendationService";

// export default function HomePage() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [recommended, setRecommended] = useState([]);
//   const [viewed, setViewed] = useState([]);
//   const [alsoViewed, setAlsoViewed] = useState([]);
//   const [selectedCat, setSelectedCat] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [
//           catData,
//           prodData,
//           recData,
//           viewData,
//           alsoData
//         ] = await Promise.all([
//           fetchCategories(),
//           fetchProducts(),
//           fetchRecommended(),
//           fetchViewed(),
//           fetchAlsoViewed()
//         ]);

//         setCategories(catData);
//         setProducts(prodData);
//         setFiltered(prodData);
//         setRecommended(recData);
//         setViewed(viewData);
//         setAlsoViewed(alsoData);
//       } catch (err) {
//         console.error("Failed to load data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (selectedCat) {
//       setFiltered(products.filter(p => p.categoryId === selectedCat));
//     } else {
//       setFiltered(products);
//     }
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
//               className="min-w-[200px] bg-white rounded-lg shadow transition"
//             >
//               <Link to={`/product/${item.id}`}>
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-32 object-cover rounded-t-lg"
//                 />
//                 <div className="p-2">
//                   <h3 className="text-md font-semibold truncate">
//                     {item.name}
//                   </h3>
//                   <p className="text-green-600 font-bold mt-1">
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
//     <div className="bg-gray-50 min-h-screen">
      
//      {/* Hero Banner */}
// <section className="h-64 md:h-96 relative overflow-hidden">
//   {/* Farm background image */}
//   <div 
//     className="absolute inset-0 bg-cover bg-center"
//     style={{ backgroundImage: "url(https://images.pexels.com/photos/2132115/pexels-photo-2132115.jpeg?auto=compress&cs=tinysrgb&w=1600)" }}
//   ></div>
  
//   {/* Dark overlay for text contrast */}
//   <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  
//   {/* Animated Animals - Increased number and movement range */}
//   {/* Row 1: Foreground animals (larger, more movement) */}
//   <motion.div 
//     className="absolute bottom-0 left-5"
//     animate={{ x: [0, 120, 0] }}
//     transition={{ 
//       duration: 12,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/2317/2317898.png" 
//       alt="Cow" 
//       className="w-20 h-20 md:w-28 md:h-28 filter drop-shadow-lg"
//     />
//   </motion.div>
  
//   <motion.div 
//     className="absolute bottom-0 right-10"
//     animate={{ x: [0, -150, 0] }}
//     transition={{ 
//       duration: 14,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: 1
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/194/194279.png" 
//       alt="Sheep" 
//       className="w-16 h-16 md:w-24 md:h-24 filter drop-shadow-lg"
//     />
//   </motion.div>
  
//   {/* Row 2: Middle ground animals */}
//   <motion.div 
//     className="absolute bottom-8 left-1/4"
//     animate={{ 
//       x: [0, 100, 0],
//       y: [0, -10, 0]
//     }}
//     transition={{ 
//       duration: 10,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: 0.7
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/2350/2350180.png" 
//       alt="Goat" 
//       className="w-18 h-18 md:w-26 md:h-26 filter drop-shadow-lg"
//     />
//   </motion.div>
  
//   <motion.div 
//     className="absolute bottom-12 right-1/3"
//     animate={{ 
//       x: [0, -80, 0],
//       y: [0, 5, 0]
//     }}
//     transition={{ 
//       duration: 9,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: 1.5
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/1042/1042333.png" 
//       alt="Chicken" 
//       className="w-14 h-14 md:w-20 md:h-20 filter drop-shadow-lg"
//     />
//   </motion.div>
  
//   {/* Row 3: Background animals (smaller, slower) */}
//   <motion.div 
//     className="absolute bottom-20 left-1/2"
//     animate={{ 
//       x: [0, 60, 0],
//       y: [0, -5, 0]
//     }}
//     transition={{ 
//       duration: 15,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: 0.3
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png" 
//       alt="Pig" 
//       className="w-12 h-12 md:w-16 md:h-16 filter drop-shadow-lg opacity-90"
//     />
//   </motion.div>
  
//   <motion.div 
//     className="absolute bottom-16 right-20"
//     animate={{ 
//       x: [0, -70, 0],
//       y: [0, 3, 0]
//     }}
//     transition={{ 
//       duration: 13,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: 2
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/194/194242.png" 
//       alt="Horse" 
//       className="w-14 h-14 md:w-22 md:h-22 filter drop-shadow-lg opacity-90"
//     />
//   </motion.div>
  
//   {/* Flying bird for top movement */}
//   <motion.div 
//     className="absolute top-10 left-0"
//     animate={{ 
//       x: [-100, window.innerWidth + 100],
//       y: [0, 20, 0, -20, 0]
//     }}
//     transition={{ 
//       duration: 15,
//       repeat: Infinity,
//       ease: "linear"
//     }}
//   >
//     <img 
//       src="https://cdn-icons-png.flaticon.com/512/685/685049.png" 
//       alt="Bird" 
//       className="w-10 h-10 md:w-14 md:h-14 filter drop-shadow-lg"
//     />
//   </motion.div>
  
//   {/* Title with entrance animation */}
//   <div className="absolute inset-0 flex items-center justify-center">
//     <motion.h1
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center z-10 px-4"
//     >
//       Welcome to StockMart
//     </motion.h1>
//   </div>
// </section>

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
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filtered.map(product => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white rounded-lg shadow transition"
//               >
//                 <Link to={`/product/${product.id}`}>
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold truncate">
//                       {product.name}
//                     </h3>
//                     <p className="text-green-600 font-bold mt-2">
//                       ${product.price.toLocaleString()}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Dynamic Recommendation Sections */}
//       {renderSection("Recommended For You", recommended)}
//       {renderSection("You Viewed", viewed)}
//       {renderSection("Customers Also Viewed", alsoViewed)}
//     </div>
//   );
// }

// src/pages/HomePage.js
// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {fetchCategories} from "../services/categoryService";
import {fetchProducts} from "../services/productService";
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
      selectedCat
        ? products.filter(p => p.categoryId === selectedCat)
        : products
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
        <div className="flex space-x-4 overflow-x-auto py-2">
          {items.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="relative w-44 bg-white rounded-lg shadow overflow-hidden"
            >
              {/* Quick Actions */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white bg-opacity-80 p-1 rounded-lg">
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
                  className="w-full h-32 object-cover"
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
      {/* Hero */}
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

      {/* Category Filter */}
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

      {/* Main Products Grid */}
      <section className="px-4 pb-12 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white bg-opacity-80 p-1 rounded-lg">
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
                    className="w-full h-40 object-cover"
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

      {/* Recommendation Sections */}
      {renderSection("Recommended For You", recommended)}
      {renderSection("You Viewed", viewed)}
      {renderSection("Customers Also Viewed", alsoViewed)}
    </div>
  );
}
