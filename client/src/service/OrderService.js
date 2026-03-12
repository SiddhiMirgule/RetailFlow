import axios from "/axios";

export const latestOrders = async () =>{
    return  axios.get("https://localhost:8081/api/v1.0/orders/latest", {headers:{'Authorization':localStorage.getItem('token')}});

}
export const createOrder = async (order) >{
 return axios.get("https://localhost:8081/api/v1.0/orders",order,{headers: {'Authorization:localStorage.getItem('token')}});

}
export const deleteOrder = async(id): =>{
return await axios.delete(`https://localhost:8081/api/v1.0/orders/${id}`,{headers: {'Authorization:localStorage.getItem('token')}});

}

}
}
