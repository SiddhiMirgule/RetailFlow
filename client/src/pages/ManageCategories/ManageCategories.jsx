import './ManageCategories.css'
import CategoryForm from '../../components/CategoryForm/CategoryForm'
import CategoryList from '../../components/CategoryList/CategoryList'  // 👈 add this import

const ManageCategories = () => {
    return (
        <div className="category-container text-light">
            <div className="left-column">
                <CategoryForm />
            </div>
            <div className="right-column">
                <h5>Categories List</h5>
                <CategoryList />  {/* 👈 add this */}
            </div>
        </div>
    );
}

export default ManageCategories;