import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name); // ✅ Fixed: const not cost, cartItem not cartItems
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.name === item.name
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } // ✅ Fixed: cartItem not cartItems
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]); // ✅ Fixed
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId)); // ✅ Added from image
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.itemId === itemId
                ? { ...item, quantity: newQuantity }                   // ✅ Added from image
                : item
        ));
    };

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }
            try {
                const response = await fetchCategories();
                console.log("Full response:", response);
                console.log("Response data:", response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    };

    const contextValue = {
        categories,
        setCategories,
        itemsData,
        setItemsData,
        auth,
        setAuthData,
        loading,
        setLoading,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,                                      // ✅ Added
        updateQuantity,                                      // ✅ Added
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};