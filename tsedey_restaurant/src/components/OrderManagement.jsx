import React, { useEffect, useState } from "react";
import api from "../api/api"; // adjust this path if your api file is somewhere else

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPendingOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/Order/pending");

            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching pending orders:", error);
            setError("Unable to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Pending Orders</h2>

            {orders.length === 0 ? (
                <p>No pending orders.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <h3>{order.orderNumber}</h3>
                        <p>{order.status}</p>

                        {order.items.map((item, index) => (
                            <div key={index}>
                                {item.quantity} × {item.itemName}
                            </div>
                        ))}

                        <p>Total: {order.totalAmount}</p>
                        <p>Payment: {order.paymentMethod}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderManagement;