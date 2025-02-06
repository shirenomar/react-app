import axios, { AxiosResponse } from "axios";
import { Item } from "./item-model";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

//const  headers = { Authorization: 'Bearer your-token' };

const read = (id: string = ""): Promise<AxiosResponse<Item[]>> => {
  return axios.get<Item[]>(`${API_URL}/${id}`);
};

const insert = (item: Item): Promise<AxiosResponse<Item[]>> => {
  return axios.post(API_URL, item);
};

const update = (item: Item): Promise<AxiosResponse<Item[]>> => {
  return axios.put(`${API_URL}/${item?.id}`, item);
};

const remove = (id: number): Promise<AxiosResponse<Item[]>> => {
  return axios.delete(`${API_URL}/${id}`);
};

const AppItemsService = {
  read,
  insert,
  update,
  remove,
};

export default AppItemsService;
