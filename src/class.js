/**
 * @class visibleForm
 */
class visibleForm {
    constructor() {
        this.clickLogin = document.getElementById("loginBtn")
        this.clickRegister = document.getElementById("registerBtn")

        this.onClickLogin = this.onClickLogin.bind(this)
        this.clickLogin.addEventListener("click", this.onClickLogin)  

        this.onClickRegister = this.onClickRegister.bind(this)
        this.clickRegister.addEventListener("click", this.onClickRegister) 

         this.displayform = function (loginDisplay, registerDisplay, buttonFormDisplay) {
            let visibleLoginForm = document.getElementsByClassName("loginform")
            visibleLoginForm[0].style.display = loginDisplay; 
            let visibleRegisterForm = document.getElementsByClassName("registerform")
            visibleRegisterForm[0].style.display = registerDisplay;
            let visibleButton = document.getElementsByClassName("buttonform")
            visibleButton[0].style.display = buttonFormDisplay;
        }

    }

    onClickLogin(){
        this.displayform("block", "none", "none")                
    }

    onClickRegister() {
        this.displayform("none", "block", "none")
    }
}

const form = new visibleForm()


/**
 * @class RegisterForm
 */
class RegisterForm extends visibleForm {
    constructor(...props) {
        super(...props)
        this.clickRegisterFormBtn = document.getElementById("registerFormBtn")
        this.formUsername = document.getElementById("username")
        this.formPassword = document.getElementById("password")
        this.formTelefon = document.getElementById("telefon")
        this.formMail = document.getElementById("mail")

        this.onClickRegisterFormBtn = this.onClickRegisterFormBtn.bind(this)
        this.clickRegisterFormBtn.addEventListener("click", this.onClickRegisterFormBtn)

        this.validUserBlur = this.validUserBlur.bind(this)
        this.formUsername.addEventListener("blur", this.validUserBlur);

        this.validPasswordBlur = this.validPasswordBlur.bind(this)
        this.formPassword.addEventListener("blur", this.validPasswordBlur);

        this.validTelefonBlur = this.validTelefonBlur.bind(this)
        this.formTelefon.addEventListener("blur", this.validTelefonBlur);

        this.validMailBlur = this.validMailBlur.bind(this)
        this.formMail.addEventListener("blur", this.validMailBlur);

        this.validateAsync = function(username, password, telefon, mail) {
            return new Promise((res, rej) => {
                const _username = username.trim()
                const _password = password.trim()
                const _telefon = telefon.trim()
                const _mail = mail.trim()
               
                const visibleButton = document.getElementsByClassName("validateRegister")
                visibleButton[0].innerHTML = ""

                if (
                    REG_USER.test(_username)
                    &&REG_PASS.test(_password)
                    &&REG_PHONE.test(_telefon)
                    &&REG_MAIL.test(_mail)
                ) 
                    {
                    localStorage.setItem("json", JSON.stringify(
                        {
                                username: _username,
                                password: _password,
                                telefon: _telefon,
                                mail: _mail
                        }
                    ))
                    this.displayform("none", "none", "block")
                    } else {
                        if(!REG_USER.test(_username)) 
                            {
                                visibleButton[0].innerHTML = VALID_USER                   
                                this.formUsername.style.borderColor = "red"
                            } else {                        
                                this.formUsername.style.borderColor = "blue"
                                }
                            if(!REG_PASS.test(_password)) {
                                let inerOld = visibleButton[0].innerHTML
                                visibleButton[0].innerHTML = inerOld + VALID_PASS                    
                                this.formPassword.style.borderColor = "red"
                            } else {
                                    this.formPassword.style.borderColor = "blue"
                                }
                            if(!REG_PHONE.test(_telefon)) {
                                let inerOld = visibleButton[0].innerHTML
                                visibleButton[0].innerHTML = inerOld + VALID_PHONE
                                this.formTelefon.style.borderColor = "red"
                            } else {
                                this.formTelefon.style.borderColor = "blue"
                            }
                            if(!REG_MAIL.test(_mail)) {
                                let inerOld = visibleButton[0].innerHTML
                                visibleButton[0].innerHTML = inerOld + VALID_MAIL                        
                                this.formMail.style.borderColor = "red"
                            } else {
                                this.formMail.style.borderColor = "blue"
                            }
                }
                })
            }
       
    }
    onClickRegisterFormBtn(event) 
        {
            event.preventDefault()
            this.disabled = true
            this.validateAsync(username.value, password.value, telefon.value, mail.value)
                .then(console.info)
                .catch(err => console.error(err) || Promise.resolve())
                .then(() => { this.disabled = false })
        }

      

     validUserBlur(event) 
        {
             return new Promise((res, rej) => {
             const _username = username.value.trim()
             const visibleButton = document.getElementsByClassName("validateRegister")
             visibleButton[0].innerHTML = ""
             if (!REG_USER.test(_username))     
                {
                    visibleButton[0].innerHTML = VALID_USER                   
                     this.formUsername.style.borderColor = "red"
                    } else {                        
                         this.formUsername.style.borderColor = "blue"
                    }
            })
        }

    validPasswordBlur(event) 
        {
            return new Promise((res, rej) => {
             const _password = password.value.trim()
             const visibleButton = document.getElementsByClassName("validateRegister")
             visibleButton[0].innerHTML = ""
            if(!REG_PASS.test(_password))
                    {
                    let inerOld = visibleButton[0].innerHTML
                    visibleButton[0].innerHTML = inerOld + VALID_PASS                    
                    this.formPassword.style.borderColor = "red"
                    } else {
                        this.formPassword.style.borderColor = "blue"
                        }
            })
        }

        validTelefonBlur(event) 
            {
             return new Promise((res, rej) => {
             const _telefon = telefon.value.trim()
             const visibleButton = document.getElementsByClassName("validateRegister")
             visibleButton[0].innerHTML = ""
             if (!REG_PHONE.test(_telefon)) 
                {
                    let inerOld = visibleButton[0].innerHTML
                    visibleButton[0].innerHTML = inerOld + VALID_PHONE
                    this.formTelefon.style.borderColor = "red"
                } else {
                        this.formTelefon.style.borderColor = "blue"
                        }
            })
            }
        validMailBlur(event) 
            {
             return new Promise((res, rej) => {
             const _mail = mail.value.trim()
             const visibleButton = document.getElementsByClassName("validateRegister")
             visibleButton[0].innerHTML = ""
             if (!REG_MAIL.test(_mail)) 
                    {
                    let inerOld = visibleButton[0].innerHTML
                    visibleButton[0].innerHTML = inerOld + VALID_MAIL                        
                    this.formMail.style.borderColor = "red"
                    } else {
                        this.formMail.style.borderColor = "blue"
                        }
            })
            }

}
const register = new RegisterForm()



/**
 * @class LoginForm
 */
class LoginForm extends visibleForm {
    constructor(...props){
        super(...props)
        this.clickLoginFormBtn = document.getElementById("loginFormBtn")

        this.onClickLoginFormBtn = this.onClickLoginFormBtn.bind(this)
        this.clickLoginFormBtn.addEventListener("click", this.onClickLoginFormBtn)

        this.validateData = function(usernamelog, passwordlog) {
             return new Promise((res, rej) => {
              const _usernamelog = usernamelog
              const _passwordlog = passwordlog
              const visibleButton = document.getElementsByClassName("validateRegister")
              const checkData = JSON.parse(localStorage.getItem("json"))
              visibleButton[0].innerHTML = ""
              if(checkData.password != _passwordlog) visibleButton[0].innerHTML = "Incorrect Password"
              if(checkData.username != _usernamelog) visibleButton[0].innerHTML = "Incorrect Username"
              if(checkData.username == _usernamelog &&checkData.password == _passwordlog) this.displayform("none", "none", "block")
             })
        }
    }

    onClickLoginFormBtn(event) {
         event.preventDefault()
            this.disabled = true
            this.validateData(usernamelog.value, passwordlog.value)
                .then(console.info)
                .catch(err => console.error(err) || Promise.resolve())
                .then(() => { this.disabled = false })
    }
}

const login = new LoginForm()