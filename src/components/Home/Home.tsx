import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/user.ts";
import type { IUser } from "../../types.ts";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated,
  );
  const users = useSelector((state: any) => state.user.users);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isAuthenticated && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <h1>Users List</h1>
        <button onClick={handleLogout} className="header__button">
          <i className="icon-logout" />
        </button>
      </header>

      <div className="table-wrapper">
        {users && users.length > 0 ? (
          <ul>
            <li>Username</li>
            <li>Email</li>
            {users.map((user: IUser, index: number) => (
              <Fragment key={index}>
                <li>{user.username}</li>
                <li>{user.email}</li>
              </Fragment>
            ))}
          </ul>
        ) : (
          <p>No users registered yet.</p>
        )}
      </div>
    </>
  );
}

export default Home;
