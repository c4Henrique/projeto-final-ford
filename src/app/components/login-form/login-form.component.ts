import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TranslateService, Language } from '../../service/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translateService = inject(TranslateService);

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  authorized = signal(false);
  errorMessageSignal = signal("");
  isLanguageMenuOpen = signal(false);
  currentLang: Language = 'pt';
  languages = this.translateService.getLanguages();

  constructor() {
    this.translateService.getCurrentLang().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  // getter para usar no template
  get errorMessage() {
    return this.errorMessageSignal();
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }

  getCurrentLanguageInfo() {
    return this.languages.find(lang => lang.code === this.currentLang) || this.languages[0];
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen.set(!this.isLanguageMenuOpen());
  }

  changeLanguage(langCode: string) {
    this.translateService.setLanguage(langCode as Language);
    this.isLanguageMenuOpen.set(false);
  }

  onSubmitLoginForm() {
    const { username, password } = this.loginForm.value;

    if (!this.loginForm.valid || !username || !password) {
      this.errorMessageSignal.set(this.translate('login.error.empty'));
      return;
    }

    this.authService.auth(username, password).subscribe({
      next: () => {
        this.errorMessageSignal.set("");
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessageSignal.set(this.translate('login.error.invalid'));
          return;
        }

        this.errorMessageSignal.set(this.translate('login.error.internal'));
      }
    });
  }
}
