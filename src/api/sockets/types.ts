import { Message } from "../../message/pages/message.page";

export interface ServerToClientEvent {
  norArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newMessage: (msg: Message) => void;
  chatCreated: () => void;
  joinRoom: any;
}
export interface ClientToServerEvents {
  register: (data: number) => void;
}
