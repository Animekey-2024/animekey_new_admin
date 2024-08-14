export const Regex = {
  username: '^[a-zA-Z0-9_@-]{2,25}$',
  email:
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  name: /^[A-Za-z\s]*\.?[A-Za-z\s]*\.?[A-Za-z\s]*$/,
  phone: /^[0-9]+$/,
  numberOnly: /^[0-9]+$/,
  characterOnly: /^[A-Za-z ]+$/,
  ALPHANUMERIC_WITH_HYPEN: /^([A-Za-z0-9-]){1,14}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, //This is used for 8-15 char having all the condition of upper and lower and special char
  SPECIAL_CHARS: /[!#$%^*()\=[\]{};':"\\|,<>/?]+/,
  RESTRICT_ONLY_NUMBER: /^[0-9]+$/g,
  URL: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.)?$/,
  NUMBER_MIN_MAX_3: /^\d{3}$/,
  ALPHANUMERIC_WITH_SPECIAL_CHARS: /^[a-zA-Z0-9%&()@,-\s]+$/,
  ALPHANUMERIC_WITH_SPACE: /^[a-zA-Z0-9\s]+$/
};
