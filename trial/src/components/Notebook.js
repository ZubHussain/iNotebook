import React from "react";
import { Link } from 'react-router-dom'

export default function Notebook() {
  return (
    <>
      <img className="bg" src="back.jpg" alt="back" />
      <div className="card text-center centered">
        <div className="card-header">About iNotebook</div>
        <div className="card-body">
          <h5 className="card-title">Save Your Private Notes Here </h5>

          <Link to="/" className="btn">
          <i className="bi bi-instagram"></i>
          </Link>
          <Link to="/" className="btn">
          <i className="bi bi-facebook"></i>
          </Link>
          <Link to="/" className="btn">
          <i className="bi bi-twitter"></i>
          </Link>
          <Link target="blank" to="https://github.com/ZubHussain" className="btn">
          <i className="bi bi-github"></i>
          </Link>
        </div>
        <div className="card-footer">Follow</div>
      </div>
    </>
  );
}
