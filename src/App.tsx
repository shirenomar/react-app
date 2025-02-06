import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./features/app-items/app-items-list";
import Layout from "./features/app-layout/app-layout";
export default function App() {
  //const theme = useGetTheme();
  // return (
  //   <div className="App">
  //     <h1>My First API Call in React</h1>
  //     <ItemList />
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>My First API Call in React</h1>
              <Layout />
            </div>
          }
        >
          <Route path="app-list" element={<ItemList />} />
          <Route index element={<ItemList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
