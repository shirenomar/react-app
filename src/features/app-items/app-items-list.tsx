// src/ItemList.tsx

import { Item } from "./item-model";
import { useEffect, useState } from "react";
import AppItemsService from "./app-item.service";

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>();

  useEffect(() => {
    // API returning an array of Item
    AppItemsService.read()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function handleInputChange(e) {
    setNewItem({ title: e.target.value });
  }

  function removeItem(id) {
    AppItemsService.remove(id).then(() =>
      setItems(items.filter((item) => item.id !== id))
    );
  }

  function createNew(item: Item) {
    AppItemsService.insert(item).then(() => setItems([item, ...items]));
  }

  return (
    <div>
      <input
        value={newItem?.title}
        onChange={handleInputChange}
        title="title"
      />
      <button onClick={() => newItem && createNew(newItem)}>Create</button>
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => (
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
