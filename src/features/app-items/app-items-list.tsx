// src/ItemList.tsx

import { Item } from "./item-model";
import { useState } from "react";
import AppItemsService from "./app-item.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

function ItemList() {
  // const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    "items",
    (): Promise<Item[]> => {
      return AppItemsService.read().then(
        (response) => response.data.products as Item[]
      );
    },
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  );

  function handleInputChange(e) {
    e.target.value && setNewItem({ title: e.target.value });
  }

  const removeItemMutation = useMutation(
    (item: Item) => {
      return AppItemsService.remove(item.id as number).then((response) =>
        console.log("the request already raised", response)
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        setNewItem({ title: "" });
      },
    }
  );

  function removeItem(id) {
    removeItemMutation.mutate(id);
  }

  function createNew() {
    addItemMutation.mutate(newItem as Item);
  }

  const addItemMutation = useMutation(
    (item: Item) => {
      return AppItemsService.insert(item).then((response) =>
        console.log("the request already raised", response)
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        setNewItem({ title: "" });
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {(error as any).message}</p>;

  return (
    <div>
      <input
        value={newItem?.title}
        onChange={handleInputChange}
        title="title"
      />
      <button
        onClick={() => newItem && createNew()}
        disabled={addItemMutation.isLoading}
      >
        Create
      </button>
      <h2>List of Items</h2>
      <ul>
        {data?.map((item) => (
          <div>
            <li key={item.id}>{item.title}</li>
            <button onClick={() => AppItemsService.update(item)}>Update</button>
            <button onClick={() => removeItem(item.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
