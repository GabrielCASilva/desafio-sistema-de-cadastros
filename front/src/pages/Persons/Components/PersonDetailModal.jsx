import Modal from "../../../Components/Modal";
import dayjs from "dayjs";

export default function PersonDetailModal({ open, selected, onClose }) {
  return (
    <Modal
      open={open}
      title={`Detalhes de ${selected?.nome || ""}`}
      onClose={onClose}
    >
      <div
        className="persons-detail-flex"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.4rem",
        }}
      >
        <div>
          <strong>Nome:</strong> {selected?.nome}
        </div>
        <div>
          <strong>Sexo:</strong>{" "}
          {selected?.sexo
            ? selected.sexo.charAt(0) + selected.sexo.slice(1).toLowerCase()
            : ""}
        </div>
        <div>
          <strong>Email:</strong> {selected?.email}
        </div>
        <div>
          <strong>CPF:</strong> {selected?.cpf}
        </div>
        <div>
          <strong>Data de Nascimento:</strong>{" "}
          {selected?.dataNascimento || selected?.data_nascimento
            ? dayjs(
                selected.dataNascimento || selected.data_nascimento
              ).isValid()
              ? dayjs(
                  selected.dataNascimento || selected.data_nascimento
                ).format("DD/MM/YYYY")
              : selected.dataNascimento || selected.data_nascimento
            : ""}
        </div>
        <div>
          <strong>Celular:</strong> {selected?.celular}
        </div>
        <div>
          <strong>Endereço:</strong> {selected?.endereco}
        </div>
        <div>
          <strong>Naturalidade:</strong> {selected?.naturalidade}
        </div>
        <div>
          <strong>Nacionalidade:</strong> {selected?.nacionalidade}
        </div>
      </div>
    </Modal>
  );
}
