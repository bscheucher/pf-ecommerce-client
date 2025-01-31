import React, { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getUserOrders(1); // Replace with actual user ID
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center">My Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              Order #{order.id} - ${order.total_amount} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
