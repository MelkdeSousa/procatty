/* Checking if the password is 8 characters long and contains at least one lowercase letter, one
uppercase letter, one number, and one special character. */
export const PASSWORD_STRONG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,128}$/

/*
  Checking if the phone number is in the format of: 99 99999-9999
*/
export const PHONE_NUMBER_PT_BT = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm

/*
  Checking if the username is 6 characters long and only contains letters and numbers.
*/
export const USERNAME = /^[a-z0-9]{6,32}$/i
