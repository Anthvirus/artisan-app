import { Link } from "react-router-dom";

export default function Header({heading, link, href}) {

  return (
    <header className="pt-3 bg-gray-200 shadow h-28">
      <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-900">{heading}</h1>
        <Link className="text-green-800 font-bold hover:text-green-700" to={href}>{link}</Link>
      </div>
    </header>
  );
}