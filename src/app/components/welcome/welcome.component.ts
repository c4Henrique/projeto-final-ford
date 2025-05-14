import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../service/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  private router = inject(Router);
  private translateService = inject(TranslateService);

  translate(key: string): string {
    return this.translateService.translate(key);
  }

  goToDashboard() {
    this.router.navigate(["/vehicle"]);
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
}
