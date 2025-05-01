// src/lib/validationForm.js
import z from 'zod';

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError = "Password must contain uppercase, lowercase and number";

export const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError)
});

export const ConfirmSchema = FormSchema;

export function getFieldError(field, value) {
  const result = FormSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0].message;
}

export const getErrors = (error) => {
  return error.issues.reduce((acc, issue) => {
    const path = issue.path.join('.');
    acc[path] = issue.message;
    return acc;
  }, {});
};