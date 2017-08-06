/**
 * @class visibleForm
 */
class VisibleForm {
    constructor() {
        this.clickLogin = document.getElementById("loginBtn")
        this.clickRegister = document.getElementById("registerBtn")
        this.visibleRegisterForm = document.getElementsByClassName("registerFields")
        this.visibleLoginForm = document.getElementsByClassName("loginFields")
        this.visibleButton = document.getElementsByClassName("buttonform")
        this.visibleForm = document.getElementsByClassName("formall")
        this.correctLogin = document.getElementsByClassName("corectlogin")

        this.onClickLogin = this.onClickLogin.bind(this)
        this.clickLogin.addEventListener("click", this.onClickLogin)  

        this.onClickRegister = this.onClickRegister.bind(this)
        this.clickRegister.addEventListener("click", this.onClickRegister) 

        this.displayform = function (loginDisplay, registerDisplay, buttonFormDisplay, visibleForm, correctLogin) {
            this.visibleLoginForm[0].style.display = loginDisplay;            
            this.visibleRegisterForm[0].style.display = registerDisplay;
            this.visibleButton[0].style.display = buttonFormDisplay;
            this.visibleForm[0].style.display = visibleForm;
            this.correctLogin[0].style.display = correctLogin;
        }
    }

    onClickLogin() {
        this.displayform("block", "none", "none", "block", "none")                
    }

    onClickRegister() {
        this.displayform("none", "block", "none", "block", "none")
    }
}

const form = new VisibleForm()

/**
 * @class Validate
 */
class Validate extends VisibleForm {
    constructor(...props) {
        super(...props)

        this.validateClickRegister = function(username, password, telefon, mail) {
            return new Promise((res, rej) => {
                const _username = username.trim()
                const _password = password.trim()
                const _telefon = telefon.trim()
                const _mail = mail.trim()
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
                    rej("Rej")
                    this.displayform("none", "none", "block", "none", "none")
                    } 
                else {
                     alert("Enter the data!")
                     }
            })
        }

        this.validateClickLogin = function(usernamelogin, passwordlogin) {
            return new Promise((res, rej) => {
                const _username = usernamelogin
                const _password = passwordlogin
                this.updateDataLocalstorage()
                if(this.checkLocal.username == _username &&this.checkLocal.password == _password) 
                    {
                    rej("Rej")
                    this.displayform("none", "none", "none", "none" , "block")
                    }
                else {
                    alert("Enter correct data!") 
                    }
            })
        }

        this.validateBlur = function(valid, validInerClass, formColorId, textValid) {
            const validIner = document.getElementsByClassName(validInerClass)
            const formColor = document.getElementById(formColorId)
            if(valid)
                {
                validIner[0].innerHTML = textValid
                formColor.style.borderColor = "red"
                } 
            else {
                validIner[0].innerHTML = ""
                formColor.style.borderColor = "blue"
                }
        }
    }
}

const validate = new Validate()

/**
 * @class RegisterForm
 */
class RegisterForm extends Validate {
    constructor(...props) {
        super(...props)
        this.clickRegisterFormBtn = document.getElementById("goBtn")
        this.clickCancelFormBtn = document.getElementById("backBtn")
        this.formUsername = document.getElementById("username")
        this.formPassword = document.getElementById("password")
        this.formTelefon = document.getElementById("telefon")
        this.formMail = document.getElementById("mail")
        this.valUser = document.getElementsByClassName("validateUser")
        this.validPass = document.getElementsByClassName("validatePassword")
        this.validTelefon = document.getElementsByClassName("validateTelefon")
        this.validEmail = document.getElementsByClassName("validateEmail")

        this.onClickRegisterFormBtn = this.onClickRegisterFormBtn.bind(this)
        this.clickRegisterFormBtn.addEventListener("click", this.onClickRegisterFormBtn)

        this.onclickCancel = this.onclickCancel.bind(this)
        this.clickCancelFormBtn.addEventListener("click", this.onclickCancel)

        this.validUserBlur = this.validUserBlur.bind(this)
        this.formUsername.addEventListener("blur", this.validUserBlur);

        this.validPasswordBlur = this.validPasswordBlur.bind(this)
        this.formPassword.addEventListener("blur", this.validPasswordBlur);

        this.validTelefonBlur = this.validTelefonBlur.bind(this)
        this.formTelefon.addEventListener("blur", this.validTelefonBlur);

        this.validMailBlur = this.validMailBlur.bind(this)
        this.formMail.addEventListener("blur", this.validMailBlur);

        this.checkDisBtnRegister = function() {
            if (
                this.valUser[0].innerHTML == "" 
                &&this.validPass[0].innerHTML == ""
                &&this.validTelefon[0].innerHTML == ""
                &&this.validEmail[0].innerHTML == ""
                ) this.clickRegisterFormBtn.disabled = false
            else this.clickRegisterFormBtn.disabled = true
        }

    }

    onClickRegisterFormBtn(event) 
        {
        event.preventDefault()
        this.clickRegisterFormBtn.disabled = true
        this.validateClickRegister(username.value, password.value, telefon.value, mail.value)
            .then(console.info)
            .catch(err => console.error(err) || Promise.resolve())
            .then(() => { this.clickRegisterFormBtn.disabled = false })
        }

    onclickCancel(event) 
        {
        event.preventDefault()
        this.displayform("none", "none", "block", "none", "none")
        }

    validUserBlur(event) 
        {
        return new Promise((res, rej) => {
            const _username = username.value.trim()
            this.validateBlur(!REG_USER.test(_username), "validateUser", "username", VALID_USER)
            this.checkDisBtnRegister()
        })
    }

    validPasswordBlur(event) 
        {
        return new Promise((res, rej) => {
            const _password = password.value.trim()
            this.validateBlur(!REG_PASS.test(_password), "validatePassword", "password", VALID_PASS)
            this.checkDisBtnRegister()
        })
    }

    validTelefonBlur(event) 
        {
        return new Promise((res, rej) => {
            const _telefon = telefon.value.trim()
            this.validateBlur(!REG_PHONE.test(_telefon), "validateTelefon", "telefon", VALID_PHONE)
            this.checkDisBtnRegister()
        })
    }

    validMailBlur(event) 
        {
        return new Promise((res, rej) => {
            const _mail = mail.value.trim()
            this.validateBlur(!REG_MAIL.test(_mail), "validateEmail", "mail", VALID_MAIL)
            this.checkDisBtnRegister()
        })
    }

}

const register = new RegisterForm()


/**
 * @class LoginForm
 */
class LoginForm extends Validate {
    constructor(...props){
        super(...props)
        this.clickLoginFormBtn = document.getElementById("goLogin")
        this.clickCancelFormBtn = document.getElementById("backBtn")
        this.formUsernameLogin = document.getElementById("usernamelogin")
        this.formPasswordLogin = document.getElementById("passwordlogin")
        this.valUserLogin = document.getElementsByClassName("validateUserLogin")
        this.validPassLogin = document.getElementsByClassName("validatePasswordLogin")
        this.checkLocal = JSON.parse(localStorage.getItem("json"))

        this.onClickLoginFormBtn = this.onClickLoginFormBtn.bind(this)
        this.clickLoginFormBtn.addEventListener("click", this.onClickLoginFormBtn)

        this.onclickCancel = this.onclickCancel.bind(this)
        this.clickCancelFormBtn.addEventListener("click", this.onclickCancel)

        this.userBlur = this.userBlur.bind(this)
        this.formUsernameLogin.addEventListener("blur", this.userBlur);

        this.passwordBlur = this.passwordBlur.bind(this)
        this.formPasswordLogin.addEventListener("blur", this.passwordBlur);

        this.checkDisBtnLogin = function() {
            if (
                this.valUserLogin[0].innerHTML == "" 
                &&this.validPassLogin[0].innerHTML == ""
                ) this.clickLoginFormBtn.disabled = false
            else this.clickLoginFormBtn.disabled = true
        }

        this.updateDataLocalstorage = function() {
            this.checkLocal = JSON.parse(localStorage.getItem("json"))
        }
    }

    userBlur() 
        {
        const _username = usernamelogin.value
        this.updateDataLocalstorage()
        this.validateBlur(this.checkLocal.username != _username, "validateUserLogin", "usernamelogin", INCORRECT_USER)
        this.checkDisBtnLogin()
    }

    passwordBlur() 
        {
        event.preventDefault()
        const _password = passwordlogin.value
        this.updateDataLocalstorage()
        this.validateBlur(this.checkLocal.password != _password, "validatePasswordLogin", "passwordlogin", INCORRECT_PASS)
        this.checkDisBtnLogin()
    }

    onClickLoginFormBtn(event) 
        {
        event.preventDefault()
            this.clickLoginFormBtn.disabled = true
            this.validateClickLogin(usernamelogin.value, passwordlogin.value)
                .then(console.info)
                .catch(err => console.error(err) || Promise.resolve())
                .then(() => { this.clickLoginFormBtn.disabled = false })
    }

    onclickCancel(event) 
        {
        event.preventDefault()
        this.displayform("none", "none", "block", "none", "none")
        }
}

const login = new LoginForm()