import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MarkService } from "../services/mark.service";
import { MarkServiceResponse } from "../services/mark.service.response";

@Component({
  selector: "app-mark",
  templateUrl: "./mark.component.html",
  styleUrls: ["./mark.component.scss"],
})
export class MarkComponent implements OnInit, OnDestroy {
  response: MarkServiceResponse;
  responseSubscription: Subscription;

  constructor(private readonly markService: MarkService) {
    this.response = new MarkServiceResponse();
    this.responseSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.responseSubscription = this.markService.responseSubject.subscribe(
      (response: MarkServiceResponse) => {
        this.response = response;
      },
    );
    this.markService.emitResponse();
  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe();
  }

  /**
   * Click sur le bouton
   * @since 2.0.0
   */
  onClickButton(): void {
    this.response.marked = false;
    this.setResponse("Envoi de la position en cours", "warning");

    const geoLocOptions: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000,
    };

    if (!navigator.geolocation) {
      this.setResponse("La géolocalisation n'est pas supportée", "warning");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        this.markService.markPosition(position);
      },

      (error: GeolocationPositionError): void => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.setResponse("Permission de géolocalisation refusée", "danger");
            break;

          case error.TIMEOUT:
            this.setResponse(
              "Délai dépassé pour récupérer la position",
              "warning",
            );
            break;

          default:
            this.setResponse(
              "Erreur lors de la récupération de la position",
              "danger",
            );
        }
      },

      geoLocOptions,
    );
  }

  private setResponse(message: string, status: string): void {
    this.response.message = message;
    this.response.status = status;
  }
}
