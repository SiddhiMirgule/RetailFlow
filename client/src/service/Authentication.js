import axios from "axios";

export const login = async (data) => {
await axios post("http://localhost:0881/api/v1.0/login",data);
}