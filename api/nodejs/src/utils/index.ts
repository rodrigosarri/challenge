import { ErrorMessages, FormattedError, ValidatorKey  } from "./interfaces";
import { getUserFieldDescriptions } from "../models/Message";

export const httpErrors = {
  getMessage: (errorKey: string): string => {
    const errors: ErrorMessages = {
      "MESSAGE_ERRORS": "Erro ao salvar a mensagem",
      "MESSAGE_NOT_FOUND": "Mensagem não encontrado",
      "MESSAGE_ALREADY_EXISTS": "Mensagem já registrado com este email",
      "MESSAGE_UNKNOWN_ERROR": "Erro desconhecido em Mensagens",
      "MESSAGE_DELETED": "Mensagem apagado com sucesso",
    };

    const message = errors[errorKey];

    return message || "Ocorreu um erro inesperado";
  }
}

export const errorMessagesMap = (validatorKey: ValidatorKey, field: string, message: string): string => {
  const errorTypes = {
    "is_null": `O campo ${getUserFieldDescriptions(field)} não pode ficar vazio`,
    "isEmail": `O campo ${getUserFieldDescriptions(field)} é inválido`,
    "min": `O campo ${getUserFieldDescriptions(field)} não pode ser menor do que 0`,
    "max": `O campo ${getUserFieldDescriptions(field)} não pode ser maior do que 150`,
    "not_unique": `O ${getUserFieldDescriptions(field)} preenchido já está sendo utilizado`
  }

  return errorTypes[validatorKey] ? errorTypes[validatorKey] : message;

}

export const formatSequelizeErrorItems = (errorItems: any[]): FormattedError[] => {
  const errorFields: Record<string, string[]> = {};

  errorItems.forEach((item) => {

    const { path, validatorKey, message } = item;
    const field = path || "undefined";

    errorFields[field] = [errorMessagesMap(validatorKey, field, message)];
  });

  const formattedErrors: FormattedError[] = Object.keys(errorFields).map((field) => ({
    field,
    errors: errorFields[field],
  }));

  return formattedErrors;
};
