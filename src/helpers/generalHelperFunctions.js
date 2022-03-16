const between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateEmailCode = () => {
  const emailCode = between(100000, 200000);

  return emailCode;
};

const generatePhoneNumberCode = () => {
  const phoneNumberCode = between(100000, 200000);

  return phoneNumberCode;
};


module.exports = {
  generateEmailCode,
  generatePhoneNumberCode,
};
