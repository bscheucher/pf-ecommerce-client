import { useState, useEffect } from "react";
import { listOrders, updateOrder } from "../services/orderService";
import {
  getOrderPayments,
  updatePaymentStatus,
} from "../services/paymentService";
import { Card, CardContent } from "../components/Shared/UI";
import LoadingIndicator from "../components/Shared/LoadingIndicator";
import ScrollToTopButton from "../components/Shared/ScrollTopButton";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await listOrders();
      const ordersWithPayments = await Promise.all(
        response.data.map(async (order) => {
          const paymentsResponse = await getOrderPayments(order.id);
          const payments = paymentsResponse.data.payments;
          return {
            ...order,
            payment: payments.length > 0 ? payments[0] : null,
          };
        })
      );

      const filteredOrders = ordersWithPayments.filter(
        (order) => order.status !== "Completed"
      );

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleUpdatePaymentStatus = async (paymentId, newStatus) => {
    try {
      await updatePaymentStatus(paymentId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.payment?.id === paymentId
            ? { ...order, payment: { ...order.payment, status: newStatus } }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Admin Orders Management</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <Card className="shadow-sm border-0">
                <CardContent className="p-4">
                  <h5 className="mb-3">
                    <strong>Order ID:</strong> {order.id}
                  </h5>
                  <p>
                    <strong>User:</strong> {order.user_id}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total_amount}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>
                    {order.payment ? (
                      <select
                        defaultValue={order.payment.payment_status}
                        onChange={(e) =>
                          handleUpdatePaymentStatus(
                            order.payment.id,
                            e.target.value
                          )
                        }
                        className="form-select form-select-sm d-inline-block w-auto ms-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    ) : (
                      <span className="text-muted ms-2">No Payment</span>
                    )}
                  </p>
                  <p>
                    <strong>Order Status:</strong>
                    <select
                      defaultValue={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(order.id, e.target.value)
                      }
                      className="form-select form-select-sm d-inline-block w-auto ms-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}

export default AdminOrders;
