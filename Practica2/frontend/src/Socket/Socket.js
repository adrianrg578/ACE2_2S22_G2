import io from "socket.io-client";

const socket = io("http://localhost:4001", {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }
  });

export default socket