import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

function Login() {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    userId: ID.unique(),
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Sign up Page</h2>
      <form onSubmit={(e) => handleUserLogin(e, credentials)}>
        <input
          required
          type="text"
          name="name"
          placeholder="Enter your name..."
          value={credentials.name}
          onChange={handleInputChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={credentials.email}
          onChange={handleInputChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Enter your password..."
          minLength="8"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}

export default Login;
