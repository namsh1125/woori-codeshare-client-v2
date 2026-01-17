/**
 * 테마 및 스타일 관련 상수
 */

// Tailwind 색상 클래스
export const COLORS = {
  // 기본 배경색
  BACKGROUND: {
    LIGHT: 'bg-white',
    DARK: 'dark:bg-gray-800',
    GRAY_LIGHT: 'bg-gray-50',
    GRAY_DARK: 'dark:bg-gray-700/30',
  },
  // 테두리 색상
  BORDER: {
    DEFAULT_LIGHT: 'border-gray-300',
    DEFAULT_DARK: 'dark:border-gray-700',
    ERROR_LIGHT: 'border-red-300',
    ERROR_DARK: 'dark:border-red-700',
    FOCUS_PRIMARY: 'focus:border-blue-500/50',
    FOCUS_ERROR: 'focus:border-red-500',
  },
  // 텍스트 색상
  TEXT: {
    PRIMARY_LIGHT: 'text-gray-900',
    PRIMARY_DARK: 'dark:text-gray-200',
    SECONDARY_LIGHT: 'text-gray-700',
    SECONDARY_DARK: 'dark:text-gray-400',
    MUTED_LIGHT: 'text-gray-500',
    MUTED_DARK: 'dark:text-gray-500',
    SUCCESS: 'text-green-500',
    ERROR: 'text-red-500',
    WARNING: 'text-yellow-500',
    INFO: 'text-blue-500',
  },
  // 링 색상 (포커스)
  RING: {
    PRIMARY: 'focus:ring-blue-500/20',
    ERROR: 'focus:ring-red-500/20',
    SUCCESS: 'focus:ring-green-500/20',
  },
  // 상태별 배경색
  STATE: {
    SUCCESS_LIGHT: 'bg-green-50',
    SUCCESS_DARK: 'dark:bg-green-500/10',
    ERROR_LIGHT: 'bg-red-50',
    ERROR_DARK: 'dark:bg-red-500/10',
    INFO_LIGHT: 'bg-blue-50',
    INFO_DARK: 'dark:bg-blue-500/10',
    WARNING_LIGHT: 'bg-yellow-50',
    WARNING_DARK: 'dark:bg-yellow-500/10',
  },
} as const;

// 호버 상태
export const HOVER_STATES = {
  TEXT_PRIMARY: 'hover:text-blue-500 dark:hover:text-blue-400',
  TEXT_SUCCESS: 'hover:text-green-500 dark:hover:text-green-400',
  TEXT_ERROR: 'hover:text-red-500 dark:hover:text-red-400',
  BG_GRAY: 'hover:bg-gray-100 dark:hover:bg-gray-700',
} as const;

// 스타일 조합
export const STYLES = {
  INPUT_BASE: `
    ${COLORS.BACKGROUND.LIGHT} 
    ${COLORS.BACKGROUND.DARK} 
    ${COLORS.BORDER.DEFAULT_LIGHT} 
    ${COLORS.BORDER.DEFAULT_DARK}
    ${COLORS.TEXT.PRIMARY_LIGHT}
    ${COLORS.TEXT.PRIMARY_DARK}
  `,
  INPUT_ERROR: `
    ${COLORS.BORDER.ERROR_LIGHT}
    ${COLORS.BORDER.ERROR_DARK}
    ${COLORS.BORDER.FOCUS_ERROR}
    ${COLORS.RING.ERROR}
  `,
} as const;