const UserForm = () => {
    return (
        <div className="mx-2 mt-2">
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Jhon Doe" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="yourname@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn w-100" style={{backgroundColor: '#f0a500', fontWeight: 'bold'}}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;