import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(false);
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      return <>{alert(error.message)}</>;
    }
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      return <>{alert(error.message)}</>;
    }
  };

  const handleUserLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      return <>{alert(error.message)}</>;
    }
  };

  const handleUserSignup = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      return <>{alert(error.message)}</>;
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserSignup,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
