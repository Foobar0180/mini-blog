const isNotNullOrEmpty = (argument) => {
  if (!argument) {
    return false;
  }
  if (argument.trim().length === 0) {
    return false;
  }
  return true;
};

const isNotOutOfLength = (argument, length) => {
  return argument.trim().length > length ? true : false;
};

const isValidEmail = (argument) => {
  if (!argument) {
    return false;
  }
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return argument.match(emailRegex) ? true : false;
};

const isValidPassword = (argument) => {
  if (!argument) {
    return false;
  }

  // At least one digit               (?=.*\d)
  // At least one uppercase character (?=.*[A-Z])
  // At least one lowercase character (?=.*[a-z])
  // At least one special character   (?=.*[a-zA-Z!#$%&?"])[a-zA-Z0-9!#$%&?]
  // Minimum of 8 and a maximum of 20 characters {8,20}
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/;
  return argument.match(passwordRegex) ? true : false;
};

module.exports = {
  isNotNullOrEmpty,
  isNotOutOfLength,
  isValidEmail,
  isValidPassword,
};
