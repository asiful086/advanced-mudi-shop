import React from "react";
import { Link } from "react-router-dom";
import { removeUser, user } from "../../graphql/reactivities/userVariable";
const AdminHomePage = ({ history }) => {
  return (
    <>
      <div>
        {user() ? (
          <div
            className="text-right"
            onClick={() => removeUser(history, "/admin/login")}
          >
            logout
          </div>
        ) : (
          <div>login</div>
        )}
        admin home page
        <br />
        <Link to="/">home</Link>
      </div>
    </>
  );
};

export default AdminHomePage;
