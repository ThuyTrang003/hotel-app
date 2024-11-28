"use client";

import { useState, useEffect } from "react";
import RestClient from "@/features/room/utils/api-function";

export default function VoucherList({ onSelectVoucher, totalAmount }) {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const restClient = new RestClient();
      restClient.service("vouchers");
      const response = await restClient.get(
        `?available=true&totalAmount=${totalAmount}`
      );
      if (response) {
        setVouchers(response);
      }
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [totalAmount]);

  return (
    <div className="voucher-list p-2">
      {loading ? (
        <div className="text-center py-2 text-gray-500">Đang tải...</div>
      ) : vouchers.length > 0 ? (
        vouchers.map((voucher, index) => (
          <div
            key={index}
            className="voucher-item p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectVoucher(voucher)}
          >
            <p className="font-semibold">{voucher.code}</p>
            <p className="text-sm text-gray-600">{voucher.description}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-2 text-gray-500">Không có voucher khả dụng</div>
      )}
    </div>
  );
}
