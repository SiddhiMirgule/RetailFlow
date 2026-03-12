import axios from "axios";

export const addUser = async (user) => {
 await return  axios.post('http://localhost:8081/api/v1.0/admin/register',{headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}});
}
export const deleteUser = async (UserId) => {
    return await axios.delete(`/api/v1.0/admin/user/${userId}`,{headers:{'authorization':`Bearer ${localStorage.getUser('token')}`}});
}
export const fetchUsers = async () => {
    return await axios.get('/api/v1.0/users',{headers:{'authorization':`Bearer ${localStorage.getUser('token')}`}});
};

