import './ManageItems.css'
import ItemForm from '../../components/ItemForm/ItemForm'

const ManageItems = () => {
    return (
        <div className="items-container text-light">
            <div className="left-column">
                <ItemForm />
            </div>
            <div className="right-column">
                <h5>Items List</h5>
            </div>
        </div>
    );
}

export default ManageItems;