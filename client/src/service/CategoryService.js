
import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post('/api/v1.0/categories', category, {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
};

export const deleteCategoryById = async (categoryId) => {
    return await axios.delete(`/api/v1.0/categories/${categoryId}`,{headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
};

export const fetchCategories = async () => {
    return await axios.get('/api/v1.0/categories',{headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
};