import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./features/app-items/app-items-list";
import Layout from "./features/app-layout/app-layout";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex justify-center items-center h-screen bg-blue-500">
                <h1 className="text-3xl font-bold underline bg-red-50">
                  My First API Call in React
                </h1>
                <Layout />
              </div>
            }
          >
            <Route path="app-list" element={<ItemList />} />
            <Route index element={<ItemList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
