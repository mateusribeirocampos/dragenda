import RoutesPrivate from "./routesPrivate";
import RoutesOpen from "./routesOpen";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.js";

function Routes() {
  const { user } = useContext(AuthContext);

  return user.id_user ? <RoutesPrivate /> : <RoutesOpen />;
}

export default Routes;
