import Modal from "../../../Components/Modal";
import PersonForm from "./PersonForm";
import { Button } from "antd";

export default function PersonEditModal({ open, selected, onClose, onSubmit }) {
  return (
    <Modal
      open={open}
      title={`Editar ${selected?.nome || ""}`}
      onClose={onClose}
      actions={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="person-form"
          htmlType="submit"
        >
          Salvar
        </Button>,
      ]}
    >
      <PersonForm
        initialData={selected || {}}
        onSubmit={onSubmit}
        id="person-form"
      />
    </Modal>
  );
}
