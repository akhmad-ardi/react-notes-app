import React from "react";
import { Link } from "react-router-dom";
import { FaArchive } from "react-icons/fa";

export default function Header() {
  return (
    <header>
      <h1>Notes App</h1>

      <nav className="navigation">
        <ul>
          <li>
            <Link to="/notes/archive">
              <FaArchive />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
