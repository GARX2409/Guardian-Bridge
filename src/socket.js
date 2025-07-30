import { io } from 'socket.io-client';

const socket = io('https://guardian-bridge-backend.onrender.com', {
  autoConnect: false,
  withCredentials: true
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;