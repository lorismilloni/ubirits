const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const MIN = 6;

const validateFields = (name, email, password) => {
  const MIN_NAME = 12;

  if (name.length < MIN_NAME) return true;
  if (!emailRegex.test(email)) return true;
  if (password.length < MIN) return true;
};

export const validateLogin = (email, password) => {
  if (!emailRegex.test(email)) return true;
  if (password.length < MIN) return true;
};

export default validateFields;
