import './ManageUsers.css'
import UserForm from '../../components/UserForm/UserForm'

const ManageUsers = () => {
    const [users: any[],setUsers] = useState([]);
    const[loading ,setLoading ] =useState(false);

    useEffect( () =>{
        async function loadUser() {
            try{
                setLoading(true);
                const response =await fetchUsers();
                setUsers(response.data);
                }catch(error){
                    console.error(error);
                    toast.error("Unable to fetch users");
                    }finally{
                        setLoading(false);
                        }
                }
            loadUsers();
        }, [] );
    return (
        <div className="users-container text-light">
            <div className="left-column">
                <UserForm setUsers={setUsers} />
            </div>
            <div className="right-column">
                <UserList users ={users} setUsers ={setUsers}>
            </div>
        </div>
    );
}

export default ManageUsers;