export interface Message {
    role: string;
    content: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}
