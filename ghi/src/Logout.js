import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useToken();
  const navigate = useNavigate();

  async function handleLogout(event) {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
export default LogoutButton;
