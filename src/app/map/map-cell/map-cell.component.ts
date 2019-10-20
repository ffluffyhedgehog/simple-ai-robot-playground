import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapCellType } from '../map.model';

@Component({
  selector: 'app-map-cell',
  templateUrl: './map-cell.component.html',
  styleUrls: ['./map-cell.component.scss']
})
export class MapCellComponent implements OnInit {
  @Input() cell: MapCellType;
  @Output() cellChange = new EventEmitter<MapCellType>();

  constructor() { }

  ngOnInit() {
  }

  cellClick() {
    if (this.cell === 'w') {
      this.cell = 'e';
      this.cellChange.emit('e');
      return;
    }

    if (this.cell === 'e') {
      this.cell = 't';
      this.cellChange.emit('t');
      return;
    }

    if (this.cell === 't') {
      this.cell = 'w';
      this.cellChange.emit('w');
      return;
    }
  }

}
