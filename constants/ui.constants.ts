/**
 * UI 관련 상수
 */

// 텍스트 길이 제한
export const TEXT_LENGTH = {
  SNAPSHOT_TITLE_MAX: 100,
  SNAPSHOT_DESCRIPTION_MAX: 255,
  DEFAULT_TRUNCATE: 50,
  COMMENT_MAX: 500,
  ROOM_TITLE_MAX: 50,
  PASSWORD_MIN: 4,
  PASSWORD_MAX: 20,
} as const;

// 타이머 관련
export const TIMERS = {
  MESSAGE_UPDATE_INTERVAL: 30000, // 30초마다 메시지 시간 업데이트
  AUTO_SAVE_INTERVAL: 60000, // 1분마다 자동 저장
  DEBOUNCE_DELAY: 300, // 디바운스 딜레이
} as const;

// 레이아웃 사이즈
export const LAYOUT_SIZE = {
  SIDEBAR_MIN_WIDTH: 300,
  PANEL_MIN_WIDTH: 400,
  SIDEBAR_MAX_RATIO: 0.25,
  PANEL_MAX_RATIO: 0.35,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  TITLE_REQUIRED: '제목을 입력해주세요.',
  TITLE_MAX_LENGTH: (max: number) => `제목은 ${max}자를 초과할 수 없습니다.`,
  DESCRIPTION_MAX_LENGTH: (max: number) => `설명은 ${max}자를 초과할 수 없습니다.`,
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_MIN_LENGTH: (min: number) => `비밀번호는 최소 ${min}자 이상이어야 합니다.`,
  PASSWORD_MAX_LENGTH: (max: number) => `비밀번호는 ${max}자를 초과할 수 없습니다.`,
  INVALID_INPUT: '유효하지 않은 입력입니다.',
} as const;

// 버튼 텍스트
export const BUTTON_TEXT = {
  CONFIRM: '확인',
  CANCEL: '취소',
  SAVE: '저장',
  DELETE: '삭제',
  EDIT: '수정',
  CREATE: '생성',
  SUBMIT: '제출',
  CLOSE: '닫기',
  COPY: '복사',
  COPIED: '복사됨',
  ENTER: '입장',
  EXIT: '퇴장',
  SNAPSHOT: '스냅샷',
  CLEAR: '초기화',
} as const;