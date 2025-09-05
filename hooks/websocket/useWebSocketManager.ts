import { useEffect, useCallback } from "react";
import { useWebSocket } from "@/contexts/websocket-context";
import { toast } from "react-toastify";
import { Client, IMessage } from "@stomp/stompjs";
import { TOAST_MESSAGES, TOAST_CONFIG } from "@/constants/toast.constants";

interface RoomInfo {
  roomId: string | number;
  uuid: string;
}

interface Snapshot {
  snapshotId: string;
  createdAt: string;
  title: string;
  description: string;
  code: string;
  comments: any[];
}

interface SnapshotData {
  snapshot: Snapshot;
  roomId: string;
}

interface CommentData {
  snapshotId: string;
  eventType: string;
  [key: string]: any;
}

interface CodeData {
  eventType: string;
  code: string;
}

interface UseWebSocketManagerProps {
  roomInfo: RoomInfo | null;
  isAuthorized: boolean;
  onCodeUpdate: (code: string) => void;
  onSnapshotUpdate: (snapshot: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    code: string;
    comments: any[];
  }) => void;
  onCommentUpdate: (data: CommentData) => void;
  onVoteUpdate: (data: any) => void;
}

/**
 * 웹소켓 구독을 관리하는 커스텀 훅
 */
const useSubscription = <T>(
  client: Client | null,
  destination: string | null,
  callback: (data: T) => void
) => {
  useEffect(() => {
    if (!client || !destination) return;

    console.log(`구독 시작: ${destination}`);
    const subscription = client.subscribe(destination, (message: IMessage) => {
      try {
        const data = JSON.parse(message.body);
        callback(data);
      } catch (error) {
        console.error("메시지 파싱 실패:", error);
      }
    });

    return () => {
      console.log(`구독 해제: ${destination}`);
      subscription.unsubscribe();
    };
  }, [client, destination, callback]);
};

/**
 * 웹소켓 관리 훅
 * 모든 웹소켓 구독과 메시지 발송을 통합 관리
 */
export const useWebSocketManager = ({
  roomInfo,
  isAuthorized,
  onCodeUpdate,
  onSnapshotUpdate,
  onCommentUpdate,
  onVoteUpdate,
}: UseWebSocketManagerProps) => {
  const { client, connected } = useWebSocket();
  const isReady = client && connected && roomInfo?.roomId && isAuthorized;

  // 구독 대상 토픽들
  const codeDestination = isReady
    ? `/topic/room/${roomInfo.roomId}/code`
    : null;
  const snapshotDestination = isReady
    ? `/topic/room/${roomInfo.uuid}/snapshots`
    : null;
  const commentDestination = isReady
    ? `/topic/room/${roomInfo.uuid}/comments`
    : null;
  const voteDestination = isReady ? `/topic/room/${roomInfo.uuid}/votes` : null;

  // 코드 업데이트 구독
  useSubscription<CodeData>(
    client,
    codeDestination,
    useCallback(
      (data) => {
        console.log("코드 업데이트 수신:", data);
        if (data.eventType === "UPDATE") {
          console.log("라이브 코드 업데이트 적용 중...");
          onCodeUpdate(data.code);
        }
      },
      [onCodeUpdate]
    )
  );

  // 스냅샷 업데이트 구독
  useSubscription<SnapshotData>(
    client,
    snapshotDestination,
    useCallback(
      (data) => {
        console.log("스냅샷 업데이트 수신:", data);
        if (data.snapshot && data.roomId) {
          // 유효한 스냅샷 ID가 있는지 확인
          if (!data.snapshot.snapshotId) {
            console.warn(
              "스냅샷에 유효한 ID가 없어 무시됩니다:",
              data.snapshot
            );
            return;
          }

          const newSnapshot = {
            id: data.snapshot.snapshotId,
            createdAt: new Date(data.snapshot.createdAt),
            title: data.snapshot.title,
            description: data.snapshot.description,
            code: data.snapshot.code,
            comments: data.snapshot.comments || [],
          };

          console.log("새 스냅샷을 상태에 추가:", newSnapshot);
          onSnapshotUpdate(newSnapshot);

          toast.success(
            TOAST_MESSAGES.SNAPSHOT.CREATED(newSnapshot.title),
            TOAST_CONFIG.DEFAULT
          );
        }
      },
      [onSnapshotUpdate]
    )
  );

  // 댓글 업데이트 구독
  useSubscription<CommentData>(
    client,
    commentDestination,
    useCallback(
      (data) => {
        console.log("댓글 업데이트 수신:", data);
        if (data.snapshotId && data.eventType) {
          onCommentUpdate(data);

          // 이벤트 타입별 토스트 메시지
          const toastMessages: Record<string, string> = TOAST_MESSAGES.WEBSOCKET;

          const message =
            toastMessages[data.eventType] || TOAST_MESSAGES.WEBSOCKET.DEFAULT_UPDATE;
          toast.success(message, TOAST_CONFIG.SUCCESS);
        }
      },
      [onCommentUpdate]
    )
  );

  // 투표 업데이트 구독
  useSubscription<any>(
    client,
    voteDestination,
    useCallback(
      (data) => {
        console.log("투표 업데이트 수신:", data);
        onVoteUpdate(data);

        toast.success(TOAST_MESSAGES.WEBSOCKET.VOTE_UPDATED, TOAST_CONFIG.SUCCESS);
      },
      [onVoteUpdate]
    )
  );

  // 코드 발송 함수
  const publishCode = useCallback(
    (newCode: string) => {
      if (!isReady || !roomInfo?.roomId) {
        console.log("코드 업데이트 전송 불가:", {
          client: !!client,
          connected,
          roomId: roomInfo?.roomId,
          isAuthorized,
        });
        return;
      }

      try {
        console.log("코드 업데이트 전송:", {
          roomId: roomInfo.roomId,
          codeLength: newCode.length,
        });

        client.publish({
          destination: "/app/update.code",
          body: JSON.stringify({
            roomId: typeof roomInfo.roomId === 'string' ? parseInt(roomInfo.roomId, 10) : roomInfo.roomId,
            code: newCode,
          }),
        });
      } catch (error) {
        console.error("코드 업데이트 전송 실패:", error);
      }
    },
    [client, connected, roomInfo?.roomId, isAuthorized, isReady]
  );

  return { publishCode };
};