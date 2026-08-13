import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Connection failed!");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">
        {message}
      </h1>
    </div>
  );
}

export default App;