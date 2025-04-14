import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  authorized = signal(false)
  errorMessage = signal("")


  onSubmitLoginForm() {
    const { username, password } = this.loginForm.value

    if(!this.loginForm.valid || !username || !password) {
      this.errorMessage = signal("Existem campos não preenchidos!")
      return
    }

    this.authService.auth(username, password).subscribe({
      next: () => {
        this.errorMessage = signal("")
        this.router.navigate(["/home"])
      },
      error: (err) => {
        if(err.status === 401) {
          this.errorMessage = signal("Os dados de usuário ou senha são inválidos!")
          return
        }

        this.errorMessage = signal("Erro interno. Tente novamente mais tarde!")
      }
    })
  }
}
