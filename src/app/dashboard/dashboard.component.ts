import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Vehicle, VinInfos } from '../model/dashboard';
import { MenuComponent } from '../components/menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, FormsModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  vin = "1NXBR12E11Z543327"
  inputVin = ""
  isEditingVin = signal(false)

  vinInfos: VinInfos = { id: -1, odometro: 0, nivelCombustivel: 0, status: "", lat: 0, long: 0 }
  selectedVehicle: Vehicle = { id: -1, connected: 0, img: "", softwareUpdates: 0, vehicle: "", vin: "", volumetotal: 0 }
  vehicles: Vehicle[] = []

  dashboardService = inject(DashboardService)

  router = inject(Router)

  editVin() {
    this.isEditingVin.set(!this.isEditingVin());
  }

  ngOnInit(): void {
    if(!sessionStorage.getItem("user-name")) {
      this.router.navigate([""])
    }

    this.dashboardService.getVehicles()
      .subscribe(
        (vehicles) => {
          this.vehicles = vehicles
          this.vehicles = Object.values(vehicles) as Vehicle[];

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

    this.dashboardService.getVinInfos(this.vin)
      .subscribe(
        (vinInfos) => {
          this.vinInfos = vinInfos
        }
      )

    this.inputVin = ""
  }

  onSelectCar(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value)
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === id)
    
    if(selectedVehicle) this.selectedVehicle = selectedVehicle

    this.dashboardService.getVinInfos(this.selectedVehicle.vin)
      .subscribe(
        (vinInfos) => {
          this.vinInfos = vinInfos
        }
      )
  }
}
