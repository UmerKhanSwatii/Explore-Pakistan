import bcrypt from "bcrypt";

//hash password

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

//compare password
export const comparePassword = async (password, hashPassword) => {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
};
