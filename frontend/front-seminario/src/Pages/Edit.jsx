import { useState, useEffect } from "react";
import axios from "axios";

function Edit() {
  const [user, setUser] = useState(null);

  const params = {
    id: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/login", {
          params,
        });
        setUser(response.data);
        console.log(response.data);
    };

    fetchData();
  }, []);

  return <p>Olá {user && user.name}</p>;
}

export default Edit;