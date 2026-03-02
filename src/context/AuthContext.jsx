// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext); 

// export const AuthProvider = ({ children }) => {
//   // const [token, setToken] = useState(localStorage.getItem("token"));

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // const login = (t) => {
//   //   setToken(t);
//   //   localStorage.setItem("token", t);
//   // };

//   // const logout = () => {
//   //   setToken(null);
//   //   localStorage.removeItem("token");
//   // };

//   // const handleGoogleSignIn = () => {
//   //   // Redirect to YOUR backend's Google auth endpoint
//   //   window.location.href = "http://localhost:4000/auth/google";
//   // };

//   // ✅ Restore user/token on app load
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);


//   // ✅ FIXED: login accepts USER + TOKEN
//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData)); // Store user data!
//     setToken(token);
//     setUser(userData); // Set user globally!
//   };


//     const logout = () => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setToken(null);
//       setUser(null);
//     };


//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };;;
