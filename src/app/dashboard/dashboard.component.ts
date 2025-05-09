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
  selectedVehicle: Vehicle | undefined = undefined

  dashboardService = inject(DashboardService)

  editVin() {
    this.isEditingVin.set(!this.isEditingVin());
  }

  ngOnInit(): void {
    this.dashboardService.getVehicles()
      .subscribe(
        (vehicles) => {
          this.vehicles = vehicles
          this.selectedVehicle = vehicles[0]


          this.dashboardService.getVinInfos(this.selectedVehicle.vin)
            .subscribe(
              (vinInfos) => {
                this.vinInfos = vinInfos
              }
            )
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
