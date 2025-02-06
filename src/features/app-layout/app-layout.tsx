import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/app-list">Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
export default Layout;
