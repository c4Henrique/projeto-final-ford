import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Vehicle, VinInfos } from '../model/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  vin = "1NXBR12E11Z543327"
  inputVin = ""
  isEditingVin = signal(false)

  vinInfos: VinInfos | null = null
  vehicles: Vehicle[] = []

  dashboardService = inject(DashboardService)

  editVin() {
    this.isEditingVin.set(!this.isEditingVin());
  }

  ngOnInit(): void {
    const response = this.dashboardService.getVehicles()
    response.subscribe(
      (vehicle) => {
        this.vehicles = vehicle
      }
    )
  }

  showVinInfos() {
    this.vin = this.inputVin
    this.editVin()

    const response = this.dashboardService.getVinInfos(this.vin)
    response.subscribe(
      (vinInfos) => {
        this.vinInfos = vinInfos
      }
    )

    this.inputVin = ""
  }
}
