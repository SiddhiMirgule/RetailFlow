const UserForm = ({setUsers}) => {
    const[loading,setLoading] =useState(false);
    const[data,setData] =useState({
        name:"",
        email:"",
        password:"",
        role:"ROLE_USER"
                });

const onChangeHandler=(e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData( (data) =>{...data,[name]:value});
    }

const onSubmitHandler = (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
        const response = await addUser(data);
        setUsers((prevUsers) => [...prevUsers,response.data]);
        toast.success("User added successully! ");
        setData({
            name:"",
            email:"",
            password:"",
            role:"ROLE_USER",

            })
        catch(e){
            console.error(e);
            toast.error("Error adding user");
            }
        finally {
            setLoading(false);
            }
        }
    }

    return (
        <div className="mx-2 mt-2">
            <div className="card">
                <div className="card-body">
                    <form onSubmit = {onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Jhon Doe"
                             onChange={onChangeHandler}
                             value={data.name}
                             />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="yourname@example.com"

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Password"
                            onChange={onChangeHandler}
                            value = {data.password}
                            />
                        </div>
                        <button type="submit" className="btn w-100" disabled={loading} style={{backgroundColor: '#f0a500', fontWeight: 'bold'}}>
                            {loading? "Loading ...": "Save"}
                            </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;