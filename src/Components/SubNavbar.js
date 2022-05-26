import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SubNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div className="col-md-12 d-flex align-items-center">
      <p className="font-weight-bold small ml-auto mt-3">
        {console.log('chsdgcsdgcsgd', user)}
        Welcome Admin, <span className="text-primary">{user?.display}</span>
      </p>
      <Link to="/admin" className="btn btn-success btn-sm h-50 ml-2">
        Admin
      </Link>
    </div>
  );
};

export default SubNavbar;
