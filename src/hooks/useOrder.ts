/**
 * useOrder Hook
 * Order management with database backend and localStorage caching
 */

import { useState, useCallback, useEffect } from "react";
import { Order, OrderStatusType } from "@/types";
import { orderService } from "@/api/orderService";

export interface UseOrderReturn {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  createOrder: (data: Omit<Order, "id" | "created_date" | "updated_date">) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatusType) => Promise<Order>;
  getOrdersByPhone: (phone: string) => Promise<Order[]>;
  getOrdersByMarketerCode: (code: string) => Promise<Order[]>;
  getAllOrders: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useOrder(initialFetch = false): UseOrderReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(initialFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch from API
      const data = await orderService.getOrders();
      setOrders(data as Order[]);
      // Cache in localStorage
      localStorage.setItem("teethmocure_orders", JSON.stringify(data));
    } catch (err) {
      // Fallback to localStorage if API fails
      try {
        const stored = localStorage.getItem("teethmocure_orders");
        const data = stored ? JSON.parse(stored) : [];
        setOrders(data);
      } catch {
        setError(err instanceof Error ? err : new Error("Failed to fetch orders"));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) {
      fetchAllOrders();
    }
  }, [initialFetch, fetchAllOrders]);

  const createOrder = useCallback(
    async (data: Omit<Order, "id" | "created_date" | "updated_date">) => {
      try {
        // Call API to create order
        const newOrder = await orderService.createOrder(data as any);

        // Optimistic update in UI
        setOrders((prev) => [newOrder as Order, ...prev]);

        // Cache in localStorage
        const stored = localStorage.getItem("teethmocure_orders");
        const orders = stored ? JSON.parse(stored) : [];
        orders.unshift(newOrder);
        localStorage.setItem("teethmocure_orders", JSON.stringify(orders));

        return newOrder as Order;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to create order");
        setError(error);
        throw error;
      }
    },
    []
  );

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatusType) => {
    try {
      // Call API to update order
      const updated = await orderService.updateOrderStatus(id, status);

      // Update in state
      setOrders((prev) => prev.map((o) => (o.id === id ? (updated as Order) : o)));

      // Update cache
      const stored = localStorage.getItem("teethmocure_orders");
      if (stored) {
        const orders = JSON.parse(stored);
        const idx = orders.findIndex((o: Order) => o.id === id);
        if (idx >= 0) {
          orders[idx] = updated;
          localStorage.setItem("teethmocure_orders", JSON.stringify(orders));
        }
      }

      return updated as Order;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update order");
      setError(error);
      throw error;
    }
  }, []);

  const getOrdersByPhone = useCallback(async (phone: string) => {
    try {
      const stored = localStorage.getItem("teethmocure_orders");
      const orders = stored ? JSON.parse(stored) : [];
      return orders.filter((o: Order) => o.phone === phone);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch orders");
      setError(error);
      throw error;
    }
  }, []);

  const getOrdersByMarketerCode = useCallback(async (code: string) => {
    try {
      const stored = localStorage.getItem("teethmocure_orders");
      const orders = stored ? JSON.parse(stored) : [];
      return orders.filter((o: Order) => o.marketer_code === code);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch orders");
      setError(error);
      throw error;
    }
  }, []);

  const getAllOrders = useCallback(async () => {
    await fetchAllOrders();
  }, [fetchAllOrders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrdersByPhone,
    getOrdersByMarketerCode,
    getAllOrders,
    refetch: fetchAllOrders,
  };
}
