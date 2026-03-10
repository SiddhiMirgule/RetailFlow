//import axios from "axios";
//
//export const addCategory = async (category) => {
//   return await axios.delete(`http://localhost:8081/api/v1.0/categories/${categoryId}`);
//   };
//export const deleteCategoryById = async (categoryId) => {
//    return await axios.delete('http://localhost:8081/api/v1.0/categories/${categoryId}');
//};
//
//export const fetchCategories = async () => {
//    return await axios.get('http://localhost:8081/api/v1.0/categories');
//};

import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post('/api/v1.0/categories', category);  // 👈 post not delete
};

export const deleteCategoryById = async (categoryId) => {
    return await axios.delete(`/api/v1.0/categories/${categoryId}`);  // 👈 backticks!
};

export const fetchCategories = async () => {
    return await axios.get('/api/v1.0/categories');
};