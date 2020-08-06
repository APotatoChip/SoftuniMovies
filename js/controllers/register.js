import { register as apiRegister } from '../data.js';
import { showInfo, showError } from '../notifications.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs'),
    };
    this.partial('./templates/user/registerPage.hbs',this.app.userData);
}

export async function registerPost() {
    if (this.params.password !== this.params.repeatPassword) {
        alert("Passwords don't macth!");
        return;
    }

    if (this.params.username < 3) {
        alert("Username must be at least 3 characters long!");
        return;
    }

    if (this.params.password < 6) {
        alert("Passwords must be at least 6 characters long!");
        return;
    }
    try {
        const result = await apiRegister(this.params.username, this.params.password);
        if (result.hasOwnProperty("errorData")) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        showInfo('Successfullu registered!');   
        this.redirect("#/login");
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}



