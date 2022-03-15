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

const formatRegistrationResult = (accountType, resultObject) => {
  let result;
  switch (accountType) {
    case "churchAdmin": {
      // eslint-disable-next-line no-unused-vars
      const { password, emailCode, phoneNumberCode, ...publicUserData } =
        resultObject;
      result = publicUserData;

      break;
    }

    case "churchMember": {
      // eslint-disable-next-line no-unused-vars
      const {
        password,
        emailCode,
        phoneNumberCode,
        profileImage,
        foundedDate,
        description,
        churchAddress,
        churchMotto,
        meetings,
        town,
        roadName,
        roadNumber,
        videoIntroUrl,

        ...publicUserData
      } = resultObject;
      result = publicUserData;

      break;
    }

    default:
      break;
  }
console.log(result);
  return result;
};

module.exports = {
  generateEmailCode,
  formatRegistrationResult,
  generatePhoneNumberCode,
};
