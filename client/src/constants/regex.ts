const REGEX = {
  emailRegex:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  passwordRegex: /^(?=.*[A-Z]).{6,}$/,
  nameRegex: /^[a-zA-Z]{3,16}$/,
};

export default REGEX;
