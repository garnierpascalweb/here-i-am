import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigServiceResponse } from '../services/config.service.response';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
   response : ConfigServiceResponse;

   ngOnInit(): void {
     // throw new Error('Method not implemented.');
   }
   
  ngOnDestroy(): void {    
     //throw new Error('Method not implemented.');
   }

   onClickButton() {   
   }
}
