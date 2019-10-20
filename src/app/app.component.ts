import { Component, OnInit } from '@angular/core';
import { MapSchema } from './map.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  width = 9;
  height = 9;

  schemas: MapSchema[] = [[
    ['t', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'w', 'w', 'w', 'w', 'w', 'e'],
    ['e', 'e', 'e', 'w', 'w', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 't', 'e', 't', 't', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
  ], [
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 'w', 'w', 'w', 'w', 'w', 't'],
    ['t', 't', 't', 'w', 'w', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
    ['t', 't', 't', 't', 't', 't', 't', 't', 't'],
  ]];

  ngOnInit(): void {
    (window as any).getSchemas = () => this.getSchemas();
  }

  getSchemas() {
    return this.schemas;
  }

  newScheme() {
    console.log(this.height, this.width)
    const schema = new Array(this.height).fill([]);
    schema.forEach((_, i) => {
      schema[i] = new Array(this.width).fill('e');
    });

    this.schemas.unshift(schema);
  }

  deleteScheme(index: number) {
    this.schemas.splice(index, 1);
  }
}
