/**
 * 방 정보 인터페이스
 */
interface RoomInfo {
  uuid: string;
  roomId: number;
  title: string;
  isAuthorized?: boolean;
  lastAccessed?: string;
}

/**
 * 저장된 방들의 컬렉션 인터페이스
 */
interface RoomStorage {
  [uuid: string]: RoomInfo;
}

/**
 * 로컬 스토리지에 저장될 방 정보의 키값
 */
const STORAGE_KEY = "code_share_rooms";

/**
 * 방 정보를 로컬 스토리지에서 관리하는 유틸리티
 */
export const RoomStorage = {
  /**
   * 저장된 모든 방 정보를 조회합니다.
   * @returns {RoomStorage} UUID를 키로 가지는 방 정보 객체
   */
  getRooms(): RoomStorage {
    const rooms = localStorage.getItem(STORAGE_KEY);
    return rooms ? JSON.parse(rooms) : {};
  },

  /**
   * 특정 방의 정보를 조회합니다.
   * @param {string} uuid - 조회할 방의 UUID
   * @returns {RoomInfo|undefined} 방 정보 객체 또는 undefined
   */
  getRoom(uuid: string): RoomInfo | undefined {
    const rooms = this.getRooms();
    return rooms[uuid];
  },

  /**
   * 새로운 방 정보를 저장하거나 기존 방 정보를 업데이트합니다.
   * @param {RoomInfo} roomInfo - 저장할 방 정보
   */
  saveRoom(roomInfo: RoomInfo): void {
    const rooms = this.getRooms();
    rooms[roomInfo.uuid] = {
      uuid: roomInfo.uuid,
      roomId: roomInfo.roomId,
      title: roomInfo.title,
      isAuthorized: roomInfo.isAuthorized || false,
      lastAccessed: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  },

  /**
   * 방 접근 권한이 있는지 확인합니다.
   * @param {string} uuid - 확인할 방의 UUID
   * @returns {boolean} 접근 권한 여부
   */
  hasAccess(uuid: string): boolean {
    const room = this.getRoom(uuid);
    return room?.isAuthorized || false;
  },
};
