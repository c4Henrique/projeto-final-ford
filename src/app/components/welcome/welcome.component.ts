import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  private router = inject(Router)

  ngOnInit(): void {
    if(!sessionStorage.getItem("user-name")) {
      this.router.navigate([""])
    }
  }

  goToDashboard() {
    this.router.navigate(["/dashboard"])
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigate([""])
  }
}
