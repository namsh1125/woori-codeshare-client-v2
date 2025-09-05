"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface WebSocketContextType {
  client: Client | null;
  connected: boolean;
  connecting: boolean;
  nickname: string | null;
  setNickname: (nickname: string | null) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client | null>(null); // STOMP 클라이언트 인스턴스를 저장하는 상태
  const [connected, setConnected] = useState<boolean>(false); // 웹소켓 연결 상태를 나타내는 상태
  const [connecting, setConnecting] = useState<boolean>(false); // 웹소켓 연결 시도 중인지 여부를 나타내는 상태
  const [nickname, setNickname] = useState<string | null>(null); // 사용자 닉네임

  useEffect(() => {
    const stompClient = new Client({
      // SockJS를 통한 연결 설정
      webSocketFactory: () => {
        return new SockJS(process.env.NEXT_PUBLIC_WS_URL as string);
      },

      /**
       * 디버그 메시지를 콘솔에 출력하는 함수.
       * 하트비트, 연결, 연결 해제 관련 메시지만 필터링하여 출력합니다.
       * @param {string} str - 디버그 메시지 문자열.
       */
      debug: function (str: string) {
        if (
          str.includes("heart-beat") ||
          str.includes("CONNECT") ||
          str.includes("DISCONNECT") ||
          str.includes("PING") ||
          str.includes("PONG")
        ) {
          console.log("[WebSocket]", str);
        }
      },

      reconnectDelay: 5000, // 연결이 끊어졌을 때 재연결을 시도하기까지 기다릴 시간 (5초 후 재연결 시도)
      heartbeatIncoming: 10000, // 서버로부터 하트비트를 받지 못하면 연결이 끊겼다고 판단하는 최대 시간(서버로부터 10초 내에 하트비트를 받아야 함)
      heartbeatOutgoing: 10000, // 클라이언트가 서버로 하트비트를 보내는 최소 시간(클라이언트는 10초마다 하트비트를 보내야 함)

      /**
       * 연결 성공 시 호출되는 콜백 함수.
       */
      onConnect: () => {
        console.log("[WebSocket] 연결 성공");
        setConnected(true);
        setConnecting(false);
      },

      /**
       * 연결 끊김 시 호출되는 콜백 함수.
       */
      onDisconnect: () => {
        console.log("[WebSocket] 연결 끊김");
        setConnected(false);
        setConnecting(false);
      },

      /**
       * STOMP 프로토콜 관련 에러 발생 시 호출되는 콜백 함수.
       * @param {object} frame - STOMP 에러 프레임.
       */
      onStompError: (frame: any) => {
        console.error("[WebSocket] STOMP 에러:", frame.headers["message"]);
        console.error("[WebSocket] 에러 상세:", frame.body);
      },

      /**
       * 웹소켓 연결 자체에 에러 발생 시 호출되는 콜백 함수.
       * @param {Event} event - 웹소켓 에러 이벤트 객체.
       */
      onWebSocketError: (event: Event) => {
        console.error("[WebSocket] 연결 에러:", event);
      },

      /**
       * 웹소켓 연결이 종료(닫힘)될 때 호출되는 콜백 함수.
       * @param {CloseEvent} event - 웹소켓 종료 이벤트 객체.
       */
      onWebSocketClose: (event: CloseEvent) => {
        console.log("[WebSocket] 연결 종료:", event.code, event.reason);
        setConnected(false);
      },

      /**
       * 연결 시도 직전에 호출되는 콜백 함수.
       */
      beforeConnect: () => {
        console.log("[WebSocket] 연결 시도 중...");
        setConnecting(true);
      },

      /**
       * STOMP 연결 헤더 설정.
       */
      connectHeaders: {
        "heart-beat": "10000,10000", // 클라이언트는 10초마다 하트비트를 보내고 받기를 원함
      },
    });

    // STOMP 클라이언트를 활성화하여 연결 시도를 시작합니다.
    try {
      stompClient.activate();
      setClient(stompClient);
    } catch (error) {
      console.error("[WebSocket] STOMP 클라이언트 활성화 실패:", error);
    }

    // 컴포넌트가 언마운트될 때 클라이언트 연결을 해제(비활성화)합니다.
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ client, connected, connecting, nickname, setNickname }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket(): WebSocketContextType {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket은 WebSocketProvider 내에서 사용되어야 합니다");
  }
  return context;
}
