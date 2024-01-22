import axios from "axios";
import { API_BASE } from "~/ultis/constants";

export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_BASE}/v1/boards/${boardId}`);

  return request.data;
};

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(
    `${API_BASE}/v1/boards/${boardId}`,
    updateData
  );

  return request.data;
};

export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${API_BASE}/v1/columns`, newColumnData);

  return request.data;
};

export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${API_BASE}/v1/cards`, newCardData);

  return request.data;
};
