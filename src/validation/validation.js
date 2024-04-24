export const checkNull = (value) => {
  if (value === null) {
    return false;
  } 
  else if (value === "") {
    return false;
  } else if (value.trim() === "") {
    return false;
  } else {
    return true;
  }
};

export function ValidateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
