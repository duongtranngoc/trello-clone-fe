import axios from "axios";
import { API_BASE } from "~/ultis/constants";

export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_BASE}/v1/boards/${boardId}`);

  return request.data;
};
