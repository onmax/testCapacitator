import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';

import { map } from 'rxjs/operators/map'

const { Geolocation, Modals} = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  coords: Coordinates;
  ngOnInit(){
    this.watchPosition().subscribe(coords=>
      this.coords = coords
    );
  }


  watchPosition(): Observable <any>{
    const watch = bindCallback(Geolocation.watchPosition)({});
    return watch.pipe(map(pos=>pos.coords));
  }

  showPosition(){
    const lat = this.coords.latitude;
    const lon = this.coords.longitude;
    const alerta = Modals.alert ({
      title: "Tú posición",
      message: `Estas en Latitud: ${lat}. Longitud: ${lon}`,
    });
  }
}
