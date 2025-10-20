import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { ConfigServiceResponse } from '../services/config.service.response';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
  response: ConfigServiceResponse;
  responseSubscription: Subscription;

  constructor(private configService: ConfigService) {
    this.response = new ConfigServiceResponse();
    this.responseSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.responseSubscription = this.configService.responseSubject.subscribe(
      (response: ConfigServiceResponse) => {
        this.response = response;
      }
    );
    this.configService.getConfig();
    this.configService.emitResponse();
  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe();
  }


  onClickButton() {
    this.configService.changeConfig(this.response.geoloc.current);
    
  }
}
