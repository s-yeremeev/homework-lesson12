const VALID_USER = "The name must begin with a capital letter, and consist of letters!"
const VALID_PASS = "<br>Password must be 8 digits and letters!"
const VALID_PHONE = "<br>Phone must be 11 digits long!"
const VALID_MAIL = "<br>The example of @mail \"test@test.test\"!"
const REG_USER = /^[A-Z]{1}[a-z]{2,}/
const REG_PASS = /[0-9a-z]{8,}/i
const REG_PHONE = /[0-9]{11,}/
const REG_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/