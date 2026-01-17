import { LAYOUT_SIZE } from '@/constants/ui.constants';

interface PanelConfig {
  id: string;
  icon: string;
  title: string;
}

interface PanelConfigs {
  QUESTIONS: PanelConfig;
  VOTING: PanelConfig;
  SNAPSHOTS: PanelConfig;
}

export const PANEL_CONFIGS: PanelConfigs = {
  // 질문 및 답변을 관리하는 패널
  QUESTIONS: {
    id: "comments",
    icon: "FaQuestion",
    title: "Questions",
  },

  // 투표 기능을 제공하는 패널
  VOTING: {
    id: "voting",
    icon: "FaVoteYea",
    title: "Voting",
  },

  // 코드 스냅샷 히스토리를 보여주는 패널
  SNAPSHOTS: {
    id: "snapshots",
    icon: "FaHistory",
    title: "Snapshots",
  },
};

interface InitialWidths {
  LEFT: number;
  RIGHT: number;
  MIN_LEFT: number;
  MIN_RIGHT: number;
  MAX_LEFT_RATIO: number;
  MAX_RIGHT_RATIO: number;
}

export const INITIAL_WIDTHS: InitialWidths = {
  // 사이드바 너비 설정
  LEFT: 400, // 좌측 사이드바 기본 너비
  RIGHT: 500, // 우측 사이드바 기본 너비

  // 최소 너비 설정
  MIN_LEFT: LAYOUT_SIZE.SIDEBAR_MIN_WIDTH,
  MIN_RIGHT: LAYOUT_SIZE.PANEL_MIN_WIDTH,

  // 최대 너비 비율 (화면 너비 대비)
  MAX_LEFT_RATIO: LAYOUT_SIZE.SIDEBAR_MAX_RATIO,
  MAX_RIGHT_RATIO: LAYOUT_SIZE.PANEL_MAX_RATIO,
};
