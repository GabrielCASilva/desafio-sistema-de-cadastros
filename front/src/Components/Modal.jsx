import { Modal as AntdModal } from "antd";

export default function Modal({
  open,
  title,
  children,
  onClose,
  actions,
  maxWidth,
}) {
  return (
    <AntdModal
      open={open}
      title={<span className="modal-simple-title">{title}</span>}
      onCancel={onClose}
      footer={actions ? <div className="modal-footer">{actions}</div> : null}
      width={maxWidth === "sm" ? 520 : maxWidth === "md" ? 720 : undefined}
      className="modal-simple-paper"
      centered
    >
      <div className="modal-simple-content">{children}</div>
    </AntdModal>
  );
}
