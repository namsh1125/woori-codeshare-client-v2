import { useState } from "react";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import FormField from "@/components/ui/form-field";

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 255;

/**
 * 스냅샷 생성을 위한 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 핸들러
 * @param {Function} props.onCreateSnapshot - 스냅샷 생성 완료 핸들러
 */
export default function CreateSnapshotModal({
  isOpen,
  onClose,
  onCreateSnapshot,
}) {
  // 스냅샷 입력 폼 상태 관리
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle);
      setTitleError("");
    } else {
      setTitleError(`제목은 ${MAX_TITLE_LENGTH}자를 초과할 수 없습니다.`);
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(newDescription);
      setDescriptionError("");
    } else {
      setDescriptionError(
        `설명은 ${MAX_DESCRIPTION_LENGTH}자를 초과할 수 없습니다.`
      );
    }
  };

  /**
   * 스냅샷 생성 제출 처리
   * 제목이 비어있지 않은 경우에만 처리
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    if (
      title.length > MAX_TITLE_LENGTH ||
      description.length > MAX_DESCRIPTION_LENGTH
    ) {
      return;
    }

    onCreateSnapshot({
      title,
      description,
    });

    // 폼 초기화 및 모달 닫기
    setTitle("");
    setDescription("");
    setTitleError("");
    setDescriptionError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
        Create Snapshot
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 필드 */}
        <FormField
          label="Title"
          error={titleError}
          showCharCount
          currentLength={title.length}
          maxLength={MAX_TITLE_LENGTH}
          required
        >
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Enter snapshot title"
            required
            autoFocus
          />
        </FormField>

        {/* 설명 입력 필드 */}
        <FormField
          label="Description"
          error={descriptionError}
          showCharCount
          currentLength={description.length}
          maxLength={MAX_DESCRIPTION_LENGTH}
        >
          <TextArea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="h-32"
            placeholder="Enter snapshot description"
          />
        </FormField>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            size="md"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!!titleError || !!descriptionError}
            variant="primary"
            size="md"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
