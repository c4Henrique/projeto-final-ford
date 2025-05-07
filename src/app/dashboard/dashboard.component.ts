import { Component, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  vin = "1NXBR12E11Z543327"
  inputVin = ""
  isEditingVin = signal(false)

  editVin() {
    this.isEditingVin.set(!this.isEditingVin());
  }

  showVinInfos() {
    this.vin = this.inputVin
    this.editVin()

    this.inputVin = ""
  }
}
