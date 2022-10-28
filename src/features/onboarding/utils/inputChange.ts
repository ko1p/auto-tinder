export function onChangeVin(
  element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): void {
  let editableValue: string = element.target.value;
  editableValue = editableValue.length > 18 ? editableValue.slice(0, 18) : editableValue;
  element.target.value = editableValue;
}

export function onChangeMileage(
  element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): void {
  let editableValue: string = element.target.value.replace(/[^\d]/g, '');
  editableValue = editableValue.length > 6 ? editableValue.slice(0, 6) : editableValue;
  element.target.value = editableValue;
}

export function onChangeTotalOwner(
  element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): void {
  let editableValue: string | number = element.target.value.replace(/[^\d]/g, '');
  editableValue = Number(editableValue);

  if (editableValue < 1) editableValue = 1;
  if (editableValue > 99) editableValue = 99;

  element.target.value = String(editableValue);
}

export function onChangePrice(
  element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): void {
  let editableValue: string = element.target.value.replace(/[^\d]/g, '');
  editableValue = editableValue.length > 9 ? editableValue.slice(0, 9) : editableValue;
  element.target.value = editableValue;
}

export function onChangeManufacture(
  element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): void {
  let editableValue: string = element.target.value.replace(/[^\d]/g, '');
  editableValue = editableValue.length > 4 ? editableValue.slice(0, 4) : editableValue;

  if (editableValue.length >= 4) {
    if (Number(editableValue) < 1900) editableValue = '1900';
    if (Number(editableValue) > 2022) editableValue = '2022';
  }

  element.target.value = editableValue;
}
