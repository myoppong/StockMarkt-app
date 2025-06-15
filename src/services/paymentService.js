import api from "./api";

export const processPayment = (orderId, paymentMethod, momoDetails) =>
  api.post("/processpayment", { orderId, paymentMethod, momoDetails });
