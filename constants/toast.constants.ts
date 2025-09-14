/**
 * Toast 알림 관련 상수
 */

export const TOAST_POSITION = {
  TOP_RIGHT: 'top-right' as const,
  TOP_LEFT: 'top-left' as const,
  BOTTOM_RIGHT: 'bottom-right' as const,
  BOTTOM_LEFT: 'bottom-left' as const,
  TOP_CENTER: 'top-center' as const,
  BOTTOM_CENTER: 'bottom-center' as const,
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

export const TOAST_CONFIG = {
  DEFAULT: {
    position: TOAST_POSITION.TOP_RIGHT,
    autoClose: TOAST_DURATION.SHORT,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  SUCCESS: {
    position: TOAST_POSITION.TOP_RIGHT,
    autoClose: TOAST_DURATION.SHORT,
  },
  ERROR: {
    position: TOAST_POSITION.TOP_RIGHT,
    autoClose: TOAST_DURATION.LONG,
  },
} as const;

export const TOAST_MESSAGES = {
  // WebSocket 관련 메시지
  WEBSOCKET: {
    COMMENT_CREATED: '새로운 질문이 등록되었습니다.',
    REPLY_CREATED: '새로운 답변이 등록되었습니다.',
    COMMENT_UPDATED: '댓글이 수정되었습니다.',
    COMMENT_DELETED: '댓글이 삭제되었습니다.',
    COMMENT_RESOLVED: '댓글이 해결되었습니다.',
    COMMENT_UNRESOLVED: '댓글이 미해결로 변경되었습니다.',
    VOTE_UPDATED: '투표 결과가 업데이트되었습니다.',
    DEFAULT_UPDATE: '질문이 업데이트되었습니다.',
  },
  // 스냅샷 관련 메시지
  SNAPSHOT: {
    CREATED: (title: string) => `새로운 스냅샷이 생성되었습니다: ${title}`,
    DELETED: '스냅샷이 삭제되었습니다.',
    UPDATED: '스냅샷이 업데이트되었습니다.',
  },
  // 방 관련 메시지
  ROOM: {
    CREATED: '방이 생성되었습니다.',
    JOINED: '방에 입장했습니다.',
    LEFT: '방에서 퇴장했습니다.',
    AUTHORIZED: '인증되었습니다.',
    UNAUTHORIZED: '인증에 실패했습니다.',
  },
  // 일반 메시지
  GENERAL: {
    COPIED: '클립보드에 복사되었습니다.',
    ERROR: '오류가 발생했습니다.',
    SUCCESS: '성공적으로 처리되었습니다.',
  },
} as const;