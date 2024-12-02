import { createContext, useState } from "react";

const authContext = createContext({});

function AuthProvider(props) {
  const [user, setUser] = useState({
    id_user: 5,
    name: "Hellen Campos",
    email: "hellen@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJpYXQiOjE3MzMxNzE0MzUsImV4cCI6MTc0MzE3MTQzNH0.3a97dXB78oNU0dkQip1OlbBx5TcGx0cI8gUcr1Mya_U",
  }); // {} objeto vazio

  return <authContext.Provider value={{ user, setUser }}>


  </authContext.Provider>;
}

export { AuthProvider, authContext };