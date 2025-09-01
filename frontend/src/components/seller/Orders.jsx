import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModal, setConfirmModal] = useState({ show: false, orderId: null, newStatus: "" });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`/api/order/${orderId}/status`, { status: newStatus });
      if (data.success) {
        toast.success(`Order updated to ${newStatus}`);
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update order status");
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "paid" && order.isPaid) ||
      (statusFilter === "pending" && !order.isPaid);

    const matchesSearch = searchTerm === "" ||
      order.address.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.productId.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (isPaid) => {
    return isPaid
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      'cash': '💵',
      'card': '💳',
      'upi': '📱',
      'netbanking': '🏦',
      'razorpay': '💳',
      'stripe': '💳'
    };
    return icons[method.toLowerCase()] || '💳';
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 min-h-full">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
              <p className="text-gray-600">Track and manage all customer orders</p>
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-900">{orders.length}</div>
                <div className="text-sm text-blue-700">Total Orders</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-900">
                  {orders.filter(order => order.isPaid).length}
                </div>
                <div className="text-sm text-green-700">Paid Orders</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Orders
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by customer name or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-64">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="all">All Orders</option>
                  <option value="paid">Paid Orders</option>
                  <option value="pending">Pending Payment</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div key={order._id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Products */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Order #{order._id?.slice(-8) || index}</h3>
                      <div className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-3 text-sm">
                            <img
                              src={item.productId.image[0]}
                              alt={item.productId.name}
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{item.productId.name}</p>
                              <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping */}
                    <div className="lg:w-72">
                      <h4 className="font-semibold text-gray-900 mb-2">🏠 Shipping Address</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium text-gray-800">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city}, {order.address.state}</p>
                        <p>{order.address.zipcode}, {order.address.country}</p>
                        <p className="flex items-center gap-1 mt-2">
                          📞 {order.address.phone}
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="lg:w-64 space-y-4">
                      <div className="text-center lg:text-left">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(order.amount)}
                        </p>
                      </div>

                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.isPaid)}`}>
                          {order.isPaid ? '✅ Paid' : '⏳ Pending'}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{getPaymentMethodIcon(order.paymentType)}</span>
                          <span className="text-gray-600">
                            {order.paymentType.charAt(0).toUpperCase() + order.paymentType.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📅</span>
                          <span className="text-gray-600">{formatDate(order.createdAt)}</span>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Update Status
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            setConfirmModal({ show: true, orderId: order._id, newStatus: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Status Update</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to update this order’s status to{" "}
              <span className="font-bold text-blue-600">{confirmModal.newStatus}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, orderId: null, newStatus: "" })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleStatusChange(confirmModal.orderId, confirmModal.newStatus);
                  setConfirmModal({ show: false, orderId: null, newStatus: "" });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
