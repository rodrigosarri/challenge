export interface ErrorMessages {
  [key: string]: string;
}

export type ValidatorKey = "is_null" | "isEmail" | "min" | "max" | "not_unique";

export interface ValidationErrorItem {
  message: string;
  path: string;
}

export interface FormattedError {
  field: string;
  errors: string[];
}