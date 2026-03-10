import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadData() {
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

    const contextValue = {
        categories,
        setCategories,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};