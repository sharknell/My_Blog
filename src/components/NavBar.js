import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { login, logout } from "../store/authSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          HOME
        </Link>
        <ul className="navbar-nav" style={{ flexDirection: "row" }}>
          <li className="nav-item">
            <button
              className="text-white btn btn-link text-decoration-none"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(logout());
                } else {
                  dispatch(login());
                }
              }}
            >
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </button>
          </li>
          {isLoggedIn && (
            <li className="nav-item me-2">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/admin"
              >
                ADMIN
              </NavLink>
            </li>
          )}
          <li className="nav-item me-2">
            <NavLink className="nav-link" activeClassName="active" to="/blogs">
              BLOG'S
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
