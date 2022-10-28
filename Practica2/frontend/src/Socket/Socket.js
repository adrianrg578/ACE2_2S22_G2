import io from "socket.io-client";

const socket = io("http://192.168.1.5:4001", {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }
  });

export default socket