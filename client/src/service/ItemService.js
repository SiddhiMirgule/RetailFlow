import axios from "axios";

export const addItems = async (category) => {
    return await axios.post('/api/v1.0/admin/items', item, {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
}
export const deleteItem = async (ItemId) => {
    return await axios.delete(`/api/v1.0/admin/items/${itemId}`,{headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
}
export const fetchItems = async () => {
    return await axios.get('/api/v1.0/items',{headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
};