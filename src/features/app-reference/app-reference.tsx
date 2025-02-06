import { createContext, useContext, useMemo, useState } from "react";

function ExpensiveCalculationComponent() {
  const [number, setNumber] = useState(0);
  // A function to simulate an expensive calculation
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    // Simulate a heavy calculation
    return num * 2;
  };

  // Memoize the result of the expensive calculation
  const memoizedValue = useMemo(() => expensiveCalculation(number), [number]);

  return (
    <div>
      <h1>Result: {memoizedValue}</h1>
      <button onClick={() => setNumber(number + 1)}>Increment Number</button>
    </div>
  );
}

//export default ExpensiveCalculationComponent;

function HandleChange(event: React.ChangeEvent<HTMLInputElement>) {
  // change event in DOM Events
  const [value, setValue] = useState("Change me");
  setValue(event.currentTarget.value);
}

const PRODUCTS = [
  { id: "1", category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  {
    id: "2",
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit",
  },
  {
    id: "3",
    category: "Fruits",
    price: "$2",
    stocked: false,
    name: "Passionfruit",
  },
  {
    id: "4",
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach",
  },
  {
    id: "5",
    category: "Vegetables",
    price: "$4",
    stocked: false,
    name: "Pumpkin",
  },
  { id: "6", category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("dark");
const useGetTheme = () => useContext(ThemeContext);

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category, categoryProducts, filterKeyword }) {
  const products: any[] = [];
  categoryProducts.forEach((item) => {
    if (filterKeyword && !item.name.includes(filterKeyword)) return;
    products.push(<ProductRow product={item} key={item.id} />);
  });
  return (
    <div>
      <tr>
        <th>{category}</th>
      </tr>
      {products}
    </div>
  );
}

function ProjectTable({ products, filterText, inStockOnly }) {
  const rows: any[] = [];
  let lastCategory: string;
  products.forEach((product) => {
    if (inStockOnly && !product.stocked) return;
    if (lastCategory === product.category) return;

    rows.push(
      <ProductCategoryRow
        category={product.category}
        key={product.id}
        filterKeyword={filterText}
        categoryProducts={products.filter(
          (item) => item.category === product.category
        )}
      />
    );
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const theme = useGetTheme();
  return (
    <div>
      <ExpensiveCalculationComponent />
      <div>
        <p>Current theme: {theme}</p>
      </div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProjectTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
