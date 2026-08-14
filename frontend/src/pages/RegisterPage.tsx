import axios from "axios";
import { useState, type FormEvent } from "react";

import { registerUser, type RegisterData } from "../services/authService";
import "../styles/register.css";

type FieldName = keyof RegisterData;
type FieldErrors = Partial<Record<FieldName, string[]>>;

const fieldNames: FieldName[] = [
  "email",
  "first_name",
  "last_name",
  "password",
];

const initialFormData: RegisterData = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
};

function getMessages(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter(
      (message): message is string => typeof message === "string",
    );
  }

  return [];
}

function isErrorResponse(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: FieldName, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFieldErrors({});
    setGeneralErrors([]);
    setIsSuccess(false);
    setIsSubmitting(true);

    const data: RegisterData = {
      email: formData.email.trim(),
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      password: formData.password,
    };

    try {
      await registerUser(data);
      setIsSuccess(true);
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        setGeneralErrors(["No se pudo completar el registro."]);
        return;
      }

      if (!error.response) {
        setGeneralErrors([
          "No se pudo conectar con el servidor. Intentá nuevamente más tarde.",
        ]);
        return;
      }

      if (!isErrorResponse(error.response.data)) {
        setGeneralErrors(["No se pudo completar el registro."]);
        return;
      }

      const responseData = error.response.data;
      const nextFieldErrors: FieldErrors = {};

      for (const field of fieldNames) {
        const messages = getMessages(responseData[field]);

        if (messages.length > 0) {
          nextFieldErrors[field] = messages;
        }
      }

      const nextGeneralErrors = [
        ...getMessages(responseData.non_field_errors),
        ...getMessages(responseData.detail),
      ];

      setFieldErrors(nextFieldErrors);
      setGeneralErrors(
        nextGeneralErrors.length > 0 || Object.keys(nextFieldErrors).length > 0
          ? nextGeneralErrors
          : ["No se pudo completar el registro."],
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldErrors = (field: FieldName) => {
    const errors = fieldErrors[field];

    if (!errors) {
      return null;
    }

    return (
      <ul className="register-form__field-errors" id={`${field}-errors`}>
        {errors.map((error, index) => (
          <li key={`${field}-${index}`}>{error}</li>
        ))}
      </ul>
    );
  };

  return (
    <main className="register-page">
      <section className="register-card" aria-labelledby="register-title">
        <h1 id="register-title">Crear una cuenta</h1>
        <p className="register-card__intro">
          Completá tus datos para registrarte en Turnos y Agendas.
        </p>

        {generalErrors.length > 0 && (
          <div className="register-form__general-errors" role="alert">
            {generalErrors.map((error, index) => (
              <p key={`general-${index}`}>{error}</p>
            ))}
          </div>
        )}

        {isSuccess && (
          <p className="register-form__success" role="status">
            Tu cuenta fue creada correctamente.
          </p>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              value={formData.email}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-errors" : undefined}
              onChange={(event) => updateField("email", event.target.value)}
            />
            {renderFieldErrors("email")}
          </div>

          <div className="register-form__field">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              disabled={isSubmitting}
              value={formData.first_name}
              aria-invalid={Boolean(fieldErrors.first_name)}
              aria-describedby={
                fieldErrors.first_name ? "first_name-errors" : undefined
              }
              onChange={(event) =>
                updateField("first_name", event.target.value)
              }
            />
            {renderFieldErrors("first_name")}
          </div>

          <div className="register-form__field">
            <label htmlFor="last_name">Apellido</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
              disabled={isSubmitting}
              value={formData.last_name}
              aria-invalid={Boolean(fieldErrors.last_name)}
              aria-describedby={
                fieldErrors.last_name ? "last_name-errors" : undefined
              }
              onChange={(event) => updateField("last_name", event.target.value)}
            />
            {renderFieldErrors("last_name")}
          </div>

          <div className="register-form__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isSubmitting}
              value={formData.password}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "password-errors" : undefined
              }
              onChange={(event) => updateField("password", event.target.value)}
            />
            {renderFieldErrors("password")}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
