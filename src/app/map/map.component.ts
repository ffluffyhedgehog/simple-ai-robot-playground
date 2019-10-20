import {Component, Input, OnInit} from '@angular/core';
import {MapSchema} from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() schema: MapSchema;

  constructor() { }

  ngOnInit() {
  }

}
