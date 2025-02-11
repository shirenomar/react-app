import axios, { AxiosResponse } from "axios";
import { Item, Products } from "./item-model";

const API_URL = "https://dummyjson.com/products";

//const  headers = { Authorization: 'Bearer your-token' };

const read = (id: string = ""): Promise<AxiosResponse<Products>> => {
  return axios.get<Products>(`${API_URL}/${id}`);
};

const insert = (item: Item): Promise<AxiosResponse<Item[]>> => {
  return axios.post(`${API_URL}/add`, item);
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
