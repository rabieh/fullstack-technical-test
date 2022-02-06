import Link from "next/link";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link href="/">My shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
