import { useEffect, useState } from "react";
import { latestOrders, deleteOrder } from "../../service/OrderService";
import { toast } from "react-toastify";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await latestOrders();
            if (response.status === 200) {
                setOrders(response.data);
            }
        } catch (error) {
            toast.error("Unable to fetch orders");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await deleteOrder(orderId);
            if (response.status === 204) {
                setOrders(orders.filter(order => order.orderId !== orderId));
                toast.success("Order deleted successfully");
            }
        } catch (error) {
            toast.error("Unable to delete order");
            console.error(error);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="order-history-container">
            <h4 className="text-light mb-4">Order History</h4>
            {orders.length === 0 ? (
                <p className="text-light">No orders found</p>
            ) : (
                <div className="row g-3">
                    {orders.map((order, index) => (
                        <div key={index} className="col-12">
                            <div className="card bg-dark p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-white mb-1">{order.customerName}</h6>
                                        <p className="text-secondary mb-1" style={{ fontSize: '13px' }}>
                                            {order.phoneNumber}
                                        </p>
                                        <p className="text-secondary mb-1" style={{ fontSize: '13px' }}>
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                        <span className={`badge rounded-pill ${
                                            order.paymentDetails?.status === 'COMPLETED'
                                                ? 'bg-success'
                                                : 'bg-warning'
                                        }`}>
                                            {order.paymentDetails?.status}
                                        </span>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-warning fw-bold mb-2">
                                            &#8377;{order.grandTotal?.toFixed(2)}
                                        </p>
                                        <p className="text-secondary mb-2" style={{ fontSize: '13px' }}>
                                            {order.paymentMethod}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => setSelectedOrder(order)}>
                                                <i className="bi bi-receipt"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteOrder(order.orderId)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedOrder && (
                <ReceiptPopup
                    orderDetails={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onPrint={handlePrint}
                />
            )}
        </div>
    );
};

export default OrderHistory;