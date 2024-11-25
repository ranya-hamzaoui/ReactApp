import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Access denied</h1>
      <Link to={"/"}>Go to home page</Link>
    </div>
  );
};
