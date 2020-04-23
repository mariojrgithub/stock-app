import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000/api`
});

export const insertStock = payload => api.post("/stocks", payload);
export const getAllStocks = () => api.get("/stocks");
export const updateStockById = (id, payload) =>
  api.put(`/stocks/${id}`, payload);
export const deleteStockById = id => api.delete(`/stocks/${id}`);
export const getStockById = id => api.get(`/stocks/${id}`);

export const insertBBros = payload => api.post("/bbros", payload);
export const getAllBBros = () => api.get("/bbros");
export const updateBBrosById = (id, payload) =>
  api.put(`/bbros/${id}`, payload);
export const deleteBBrosById = id => api.delete(`/bbros/${id}`);
export const getBBrosById = id => api.get(`/bbros/${id}`);

export const insertPickTransactions = payload =>
  api.post("/picktransactions", payload);
export const getAllPickTransactions = () => api.get("/picktransactions");
export const updatePickTransactionsById = (id, payload) =>
  api.put(`/picktransactions/${id}`, payload);
export const deletePickTransactionsById = id =>
  api.delete(`/picktransactions/${id}`);
export const getPickTransactionsById = id => api.get(`/picktransactions/${id}`);

export const insertPickFile = payload => api.post("/pickfiles", payload);
export const getAllPickFiles = () => api.get("/pickfiles");
export const updatePickFileById = (id, payload) =>
  api.put(`/pickfiles/${id}`, payload);
export const deletePickFileById = id => api.delete(`/pickfiles/${id}`);
export const getPickFileById = id => api.get(`/pickfiles/${id}`);

const apis = {
  insertStock,
  getAllStocks,
  updateStockById,
  deleteStockById,
  getStockById,
  insertBBros,
  getAllBBros,
  updateBBrosById,
  deleteBBrosById,
  getBBrosById,
  insertPickTransactions,
  getAllPickTransactions,
  updatePickTransactionsById,
  deletePickTransactionsById,
  getPickTransactionsById,
  insertPickFile,
  getAllPickFiles,
  updatePickFileById,
  deletePickFileById,
  getPickFileById
};

export default apis;
