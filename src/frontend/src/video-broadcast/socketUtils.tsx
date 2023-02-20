import { Socket } from 'socket.io-client';

interface RequestData {
  [key: string]: any;
}

export function promise(socket: Socket): (type: string, data?: RequestData) => Promise<any> {
  return (type: string, data: RequestData = {}): Promise<any> => {
    return new Promise((resolve) => {
      const eventName = `${type}-response`; // 이벤트 이름으로 사용할 수 없는 문자열을 추가하여 이벤트 이름을 생성
      socket.emit(eventName, data, resolve);
    });
  };
}