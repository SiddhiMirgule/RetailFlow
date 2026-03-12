import { useState } from "react";

const UserList = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users?.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByUserId = (id) => {
        // TODO: call delete API
        setUsers(users.filter(user => user.id !== id)); // ✅ Remove from list
    };

    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="keyword"
                        id="keyword"
                        placeholder="Search by keyword"
                        className="form-control"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {filteredUsers?.map((user, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3" style={{ backgroundColor: 'white' }}>
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '15px' }}>
                                    <img src={user.imgUrl} alt={user.name} className="category-image" />
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-dark">{user.name}</h5>
                                    <p className="mb-0 text-secondary">{user.email}</p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteByUserId(user.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;