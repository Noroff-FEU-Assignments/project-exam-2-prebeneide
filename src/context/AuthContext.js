import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * createContext:
 * Creates a Context object.
 * When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.
 *
 * useContext:
 * Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.
 * The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
 * @function useAuth is needed to read the context value in the functions that require authentication.
 * Had to make useAuth is used to read the value of AuthContext.
 */

export const AuthContext = React.createContext([null, () => {}]);

export function useAuth() {
  return useContext(AuthContext);
}

function Authentication({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", null);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export default Authentication;
