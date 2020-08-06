import { register as apiRegister } from '../data.js';
import { showInfo, showError } from '../notifications.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs'),
    };
    this.partial('./templates/user/registerPage.hbs', this.app.userData);
}

export async function registerPost() {

    try {
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error("Passwords don't macth!");

        }

        if (this.params.username < 3) {
            throw new Error("Username must be at least 3 characters long!");

        }

        if (this.params.password < 6) {
            throw new Error("Passwords must be at least 6 characters long!");

        }


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



