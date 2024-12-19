import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./payment-result.css";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transactionId = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");
  const date = queryParams.get("vnp_PayDate");
  const responseCode = queryParams.get("vnp_ResponseCode");
  const discountCode = queryParams.get("discountCode"); // Lấy mã giảm giá từ URL

  const formattedAmount = amount
    ? (Number(amount) / 100).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : "Không xác định";
  const formattedDate = date
    ? new Date(
        `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T${date.slice(8, 10)}:${date.slice(10, 12)}:${date.slice(12)}`
      ).toLocaleString("vi-VN")
    : "Không xác định";

  const isSuccess = responseCode === "00";

  useEffect(() => {
    if (isSuccess && discountCode) {
      updateDiscountUsage(discountCode);
    }
  }, [isSuccess, discountCode]);

  const updateDiscountUsage = async (code) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/discounts/update-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating discount usage:", errorData.message);
      } else {
        console.log("Discount usage updated successfully.");
      }
    } catch (error) {
      console.error("Error updating discount usage:", error.message);
    }
  };

  return (
    <div className="vnpay-result-container">
      <div className={`result-card ${isSuccess ? "success" : "error"}`}>
        <img
          src={
            isSuccess
              ? "https://cdn-icons-png.flaticon.com/512/845/845646.png"
              : "https://cdn-icons-png.flaticon.com/512/753/753345.png"
          }
          alt={isSuccess ? "Success Icon" : "Error Icon"}
          className="result-icon"
        />
        <h1 className="result-title">
          {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
        </h1>
        <p className="result-message">
          {isSuccess
            ? "Giao dịch của bạn đã được xử lý thành công. Cảm ơn bạn đã sử dụng VNPAY."
            : "Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
        </p>
        <div className="transaction-info">
          <p><strong>Mã giao dịch:</strong> {transactionId || "Không xác định"}</p>
          <p><strong>Số tiền:</strong> {formattedAmount}</p>
          <p><strong>Thời gian:</strong> {formattedDate}</p>
        </div>
        <button
          className="return-button"
          onClick={() => {
            window.location.href = "/"; // Quay lại trang chủ
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
