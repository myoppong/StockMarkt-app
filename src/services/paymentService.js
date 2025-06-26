import api from "./api";

export async function processPayment(orderId, paymentMethod, momoDetails) {
  const res = await api.post("/processpayment", {
    orderId,
    paymentMethod,
    momoDetails
  });
  return res.data;
}