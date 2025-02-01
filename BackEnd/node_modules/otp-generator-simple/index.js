function otpGenerator(length) {
  let otp;
  if (0 < length && length < 11) {
    const multiplier = () => {
      let valueToReturn = 1;
      for (let i = 1; i < length; i++) {
        valueToReturn = valueToReturn * 10;
      }
      return valueToReturn;
    };
    otp = Math.floor(Math.random() * multiplier() * 9 + multiplier());
  } else {
    otp = Math.floor(Math.random() * 9000 + 1000);
  }

  return otp;
}

module.exports = otpGenerator;
