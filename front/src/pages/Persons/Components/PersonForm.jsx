import { useEffect } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const SEXO_OPCOES = ["MASCULINO", "FEMININO", "OUTRO"];

export default function PersonForm({ initialData = {}, onSubmit, id }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData && (initialData.id || initialData.nome)) {
      form.setFieldsValue({
        nome: initialData.nome || "",
        sexo: initialData.sexo || undefined,
        email: initialData.email || "",
        data_nascimento: initialData.data_nascimento
          ? dayjs(initialData.data_nascimento)
          : initialData.dataNascimento
          ? dayjs(initialData.dataNascimento)
          : undefined,
        naturalidade: initialData.naturalidade || "",
        nacionalidade: initialData.nacionalidade || "",
        endereco: initialData.endereco || "",
        cpf: initialData.cpf || "",
        celular: initialData.celular || "",
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  function formatCPF(value) {
    if (!value) return "";
    const v = value.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, "$1.$2");
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  }

  function formatCelular(value) {
    if (!value) return "";
    const v = value.replace(/\D/g, "").slice(0, 13); // 2 país + 2 DDD + 9 número
    if (v.length <= 2) return "+" + v;
    if (v.length <= 4) return "+" + v.slice(0, 2) + " " + v.slice(2);
    if (v.length <= 9)
      return "+" + v.slice(0, 2) + " " + v.slice(2, 4) + " " + v.slice(4);
    return (
      "+" +
      v.slice(0, 2) +
      " " +
      v.slice(2, 4) +
      " " +
      v.slice(4, 9) +
      "-" +
      v.slice(9, 13)
    );
  }

  // Handler para atualizar o campo celular formatando
  const handleCelularChange = (e) => {
    const formatted = formatCelular(e.target.value);
    form.setFieldsValue({ celular: formatted });
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    form.setFieldsValue({ cpf: formatted });
  };

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      celular: values.celular ? values.celular.replace(/\D/g, "") : "",
      data_nascimento: values.data_nascimento
        ? values.data_nascimento.format("YYYY-MM-DD")
        : "",
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="personform-form"
      id={id}
      autoComplete="off"
      onFinish={handleFinish}
      initialValues={{
        nome: initialData.nome || "",
        sexo: initialData.sexo || undefined,
        email: initialData.email || "",
        data_nascimento: initialData.data_nascimento
          ? dayjs(initialData.data_nascimento)
          : initialData.dataNascimento
          ? dayjs(initialData.dataNascimento)
          : undefined,
        naturalidade: initialData.naturalidade || "",
        nacionalidade: initialData.nacionalidade || "",
        endereco: initialData.endereco || "",
        cpf: initialData.cpf || "",
        celular: initialData.celular || "",
      }}
    >
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: "Nome obrigatório" }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Sexo"
        name="sexo"
        rules={[{ required: true, message: "Sexo obrigatório" }]}
      >
        <Select placeholder="Selecione">
          {SEXO_OPCOES.map((op) => (
            <Select.Option key={op} value={op}>
              {op.charAt(0) + op.slice(1).toLowerCase()}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email obrigatório" },
          { type: "email", message: "Email inválido" },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Data de Nascimento"
        name="data_nascimento"
        rules={[
          { required: true, message: "Data de nascimento obrigatória" },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              if (value.isAfter(dayjs(), "day")) {
                return Promise.reject(
                  "Data de nascimento não pode ser no futuro"
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Naturalidade" name="naturalidade">
        <Input />
      </Form.Item>
      <Form.Item label="Nacionalidade" name="nacionalidade">
        <Input />
      </Form.Item>
      <Form.Item
        label="Endereço"
        name="endereco"
        rules={[
          { required: false },
          { min: 5, message: "Endereço muito curto" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[
          { required: true, message: "CPF obrigatório" },
          {
            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            message: "CPF inválido",
          },
        ]}
      >
        <Input
          placeholder="000.000.000-00"
          maxLength={14}
          onChange={handleCPFChange}
        />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="celular"
        rules={[
          {
            pattern: /^\+\d{2} \d{2} \d{5}-\d{4}$/,
            message: "Celular inválido (ex: +55 11 99999-9999)",
            required: false,
          },
        ]}
      >
        <Input
          placeholder="+55 11 99999-9999"
          maxLength={17}
          onChange={handleCelularChange}
        />
      </Form.Item>
    </Form>
  );
}
