export interface Message {
    role: string;
    content: string;

    modelId?: string;
    date: string;
}

export interface Chat {
  id: string;
  name: string;
  modelId: string;
  messages: Message[];
  // inputText: string;
  // generating: boolean;
  status: "generating" | "error" | "finished" | "idle";
}
