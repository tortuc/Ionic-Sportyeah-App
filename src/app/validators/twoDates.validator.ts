import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validarFechaDeInicio: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  // Recibe dos fechas.
  const d1 = new Date(control.get("initDate").value);
  const d2 = new Date(control.get("finishDate").value);

  // Valida si la mayor es la fecha de inicio.
  return d1.getTime() < d2.getTime() ? null : { noValido: true };
};
