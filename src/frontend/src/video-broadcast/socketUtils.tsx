import { Socket } from 'socket.io-client';

interface RequestData {
  [key: string]: any;
}

export function promise(socket: Socket): (type: string, data?: RequestData) => Promise<any> {
  return (type: string, data: RequestData = {}): Promise<any> => {
    return new Promise((resolve) => {
      socket.emit(type, data, resolve);
    });
  };
}