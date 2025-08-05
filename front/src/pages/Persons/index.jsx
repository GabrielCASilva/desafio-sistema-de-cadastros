import { useState, useEffect } from "react";
import {
  getPessoas,
  createPessoa,
  updatePessoa,
  deletePessoa,
} from "../../services/personService";
import PersonCreateModal from "./Components/PersonCreateModal";
import PersonEditModal from "./Components/PersonEditModal";
import PersonDeleteModal from "./Components/PersonDeleteModal";
import PersonDetailModal from "./Components/PersonDetailModal";
import { Button, Space, Table } from "antd";

const Persons = () => {
  const [pessoas, setPessoas] = useState([]);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPessoas = async () => {
    const data = await getPessoas();
    setPessoas(data);
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      await createPessoa(values);
      setModal(null);
      setSelected(null);
      fetchPessoas();
    } catch (e) {
      // Trate o erro conforme necessário
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      await updatePessoa(selected.id, values);
      setModal(null);
      setSelected(null);
      fetchPessoas();
    } catch (e) {
      // Trate o erro conforme necessário
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePessoa(selected.id);
      setModal(null);
      setSelected(null);
      fetchPessoas();
    } catch (e) {
      // Trate o erro conforme necessário
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, pessoa) => (
        <Space>
          <Button
            type="default"
            onClick={() => {
              setSelected(pessoa);
              setModal("detail");
            }}
          >
            Detalhes
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSelected(pessoa);
              setModal("edit");
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setSelected(pessoa);
              setModal("delete");
            }}
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="persons-page">
      <div className="persons-header">
        <span className="persons-title">Pessoas</span>
        <div className="persons-actions">
          <Button
            type="primary"
            onClick={() => setModal("create")}
            className="persons-btn-main"
          >
            Nova Pessoa
          </Button>
        </div>
      </div>

      <div className="persons-table-wrapper">
        <Table
          dataSource={pessoas}
          columns={columns}
          rowKey="id"
          pagination={false}
          locale={{
            emptyText: (
              <span className="muted">Nenhuma pessoa cadastrada.</span>
            ),
          }}
        />
      </div>

      <PersonCreateModal
        open={modal === "create"}
        onClose={() => {
          setModal(null);
          setSelected(null);
        }}
        onSubmit={handleCreate}
      />
      <PersonEditModal
        open={modal === "edit" && !!selected}
        selected={selected}
        onClose={() => {
          setModal(null);
          setSelected(null);
        }}
        onSubmit={handleEdit}
      />
      <PersonDeleteModal
        open={modal === "delete" && !!selected}
        selected={selected}
        onClose={() => {
          setModal(null);
          setSelected(null);
        }}
        onDelete={handleDelete}
        loading={loading}
      />
      <PersonDetailModal
        open={modal === "detail" && !!selected}
        selected={selected}
        onClose={() => {
          setModal(null);
          setSelected(null);
        }}
      />
    </div>
  );
};

export default Persons;
