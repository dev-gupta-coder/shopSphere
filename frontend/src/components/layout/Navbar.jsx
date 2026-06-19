import { Link } from "react-router-dom";
import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  logout
} from "../../features/auth/authSlice";

function Navbar() {


    
  const dispatch =
    useDispatch();

  const {
    user,
    isAuthenticated
  } = useSelector(
    state => state.auth
  );

  const handleLogout =
    async () => {

      await dispatch(
        logout()
      );

    };

    console.log(
  "AUTH STATE",
  user,
  isAuthenticated
);

  return (
    <nav className="bg-black text-white px-6 py-4">

      <div
        className="
        max-w-7xl
        mx-auto
        flex
        justify-between
        items-center"
      >

        <Link to="/">
          <h1
            className="
            text-2xl
            font-bold"
          >
            ShopSphere
          </h1>
        </Link>

        <div
          className="
          flex
          gap-6
          items-center"
        >

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          {!isAuthenticated ? (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

              
            </>

          ) : (

            <>
                <Link to="/cart">
                    Cart
                    </Link>

              <span>
                Hello,
                {user?.name}
              </span>

              <button
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;