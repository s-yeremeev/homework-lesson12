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



class RegisterForm extends visibleForm {
    constructor(...props) {
        super(...props)
        this.clickRegisterFormBtn = document.getElementById("registerFormBtn")

        this.onClickRegisterFormBtn = this.onClickRegisterFormBtn.bind(this)
        this.clickRegisterFormBtn.addEventListener("click", this.onClickRegisterFormBtn)

        this.validateAsync = function (username, password, telefon, mail) {
            return new Promise((res, rej) => {
                console.info(username, password, telefon, mail)
                const _username = username.trim()
                const _password = password.trim()
                const _telefon = telefon.trim()
                const _mail = mail.trim()
                const visibleButton = document.getElementsByClassName("validateRegister")
                const user = document.getElementById("username")
                const pas = document.getElementById("password")
                const tel = document.getElementById("telefon")
                const maile = document.getElementById("mail")
                 
                if (!/^[A-Z]{1}[a-z]{2,}/.test(_username))                    {
                    visibleButton[0].innerHTML = "The name must begin with a capital letter, and consist of letters!"                   
                    user.style.borderColor = "red"
                    } else {
                        visibleButton[0].innerHTML = ""
                        user.style.borderColor = "blue"
                    }
                        
                 if(!/[0-9a-z]{8,}/i.test(_password))
                    {
                   
                    let inerOld = visibleButton[0].innerHTML
                    visibleButton[0].innerHTML = inerOld + "<br>Password must be 8 digits and letters!"                    
                    pas.style.borderColor = "red"
                    } else {
                        pas.style.borderColor = "blue"
                        }
                 if (!/[0-9]{11,}/.test(_telefon)) 
                    {
                        let inerOld = visibleButton[0].innerHTML
                        visibleButton[0].innerHTML = inerOld + "<br>Phone must be 11 digits long!"
                        tel.style.borderColor = "red"
                    } else {
                       tel.style.borderColor = "blue"
                        }
                 if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_mail)) 
                    {
                        let inerOld = visibleButton[0].innerHTML
                        visibleButton[0].innerHTML = inerOld + "<br>The example of @mail \"test@test.test\"!"
                        
                        maile.style.borderColor = "red"
                      
                 } else {
                      maile.style.borderColor = "blue"
                   res({
                        username: _username,
                        password: _password,
                        telefon: _telefon,
                        mail: _mail
                    })                  
                }
            })
        }
    }
    onClickRegisterFormBtn(event) {
            event.preventDefault()
            this.disabled = true
            this.validateAsync(username.value, password.value, telefon.value, mail.value)
                .then(console.info)
                .catch(err => console.error(err) || Promise.resolve())
                .then(() => { this.disabled = false })
            

        // this.displayform("none", "none", "block")
    }

}

const register = new RegisterForm()