import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logo } from "../../assets";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
import { useFilters } from "../../context/filterContext";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";

export const NavBar = () => {
  const { token } = useAuth();
  const { filterState, filterDispatch } = useFilters();
  const [isVisible, setIsVisible] = useState(true);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const activeStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "black",
    textDecoration: "none",
  });

  return (
    <>
      <div
        className="top-bar"
        style={{
          display: isVisible && token === "" ? "block" : "none",
        }}
      >
        Sign up and get exclusive offers.
        <i onClick={() => setIsVisible(false)} className="fa-solid fa-xmark"></i>
      </div>
      <div className="nav">
        <div className="navbar">
          <div className="logo-container" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="logo" />
            <span className="brand-text">Mytalorzone By Sahiba</span>
          </div>
          <div className="nav-options">
            <p>
              <NavLink style={activeStyle} to="/">
                HOME
              </NavLink>
            </p>
            <p>
              <NavLink style={activeStyle} to="/products">
                SHOP
              </NavLink>
            </p>
          </div>
          <div className="nav-navigate">
            <div onClick={() => navigate("/products")} className="search-container">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#98999a" }}
              ></i>
              <input
                placeholder="Search"
                value={filterState.search}
                onChange={(e) => {
                  filterDispatch({
                    type: "filter_by_search",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <i
              onClick={() => navigate("/cart")}
              className="fa-solid fa-cart-shopping"
            ></i>
            {cart.length > 0 && <p className="badge">{token && cart.length}</p>}

            <i
              onClick={() => navigate("/wishlist")}
              className="fa-solid fa-heart"
            ></i>
            {wishlist.length > 0 && (
              <p className="badge">{token && wishlist.length}</p>
            )}

            {token ? (
              <button
                className="login-icon"
                onClick={() => navigate("/profile")}
              >
                <i className="fa-regular fa-user"></i>
              </button>
            ) : (
              <button className="login-icon" onClick={() => navigate("/login")}>
                <i className="fa-regular fa-user"></i>
              </button>
            )}
          </div>
        </div>

        <div className="search-bar" onClick={() => navigate("/products")}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "#98999a" }}
          ></i>
          <input
            placeholder="Search"
            value={filterState.search}
            onChange={(e) => {
              filterDispatch({
                type: "filter_by_search",
                payload: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};
