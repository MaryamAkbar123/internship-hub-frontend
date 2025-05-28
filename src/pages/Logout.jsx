// import React from "react";
// import { useAuth } from "../layouts/AuthContext";

// const Logout = () => {
//     const { logout } = useAuth();

//     return <button onClick={logout}>Logout</button>
// };

// export default Logout;

import React from "react";
import { useAuth } from "../layouts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default Logout;