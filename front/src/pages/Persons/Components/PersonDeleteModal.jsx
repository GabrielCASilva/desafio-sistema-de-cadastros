import Modal from "../../../Components/Modal";
import { Button } from "antd";

export default function PersonDeleteModal({
  open,
  selected,
  onClose,
  onDelete,
  loading,
}) {
  return (
    <Modal
      open={open}
      title={`Deletar ${selected?.nome || ""}`}
      onClose={onClose}
      actions={[
        <Button
          key="delete"
          type="primary"
          danger
          onClick={onDelete}
          loading={loading}
        >
          Deletar
        </Button>,
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>,
      ]}
    >
      <div>
        <div className="persons-delete-msg">
          Tem certeza que deseja deletar <b>{selected?.nome}</b>?
        </div>
      </div>
    </Modal>
  );
}
