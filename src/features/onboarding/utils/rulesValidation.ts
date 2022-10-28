export const rulesDefault = {
  required: true,
};

export const rulesStateNumber = {
  required: true,
  pattern: {
    value: /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/,
    message:
      'Некорректный номер автомобиля, номер должен быть формата А111АА63.Все буквы должны быть написаны Кирилицей и в верхнем регистре.',
  },
};

export const rulesVin = {
  required: true,
  minLength: { value: 17, message: 'Поле должно содержать 18 символов.' },
  maxLength: { value: 18, message: 'Поле должно содержать 18 символов.' },
  pattern: {
    // регулярное выражение не видет ошибку при 222ЖЖ2222....
    value: /^(?=[a-z0-9])[^qio]*$/i,
    message: 'Допускаются только латинские буквы (кроме QOI) и цифры.',
  },
};

export const rulesDescription = {
  maxLength: { value: 512, message: 'Описание не должно превышать 512 символов.' },
};

export const rulesManufacture = {
  minLength: { value: 4, message: 'Укажите год полностью.' },
  maxLength: { value: 4, message: 'Укажите год полностью.' },
};

export const rulesEmpty = {};
