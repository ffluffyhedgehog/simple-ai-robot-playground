import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MapExperimentResult, MapSchema, MapSimulationJob } from './map.model';
import { MapComponent } from './map/map.component';
import { agents } from './agents/agentConstructor';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(MapComponent) mapComponents: QueryList<MapComponent>;
  width = 9;
  height = 9;
  runSilently = false;

  experimentResults: MapExperimentResult[];

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
    const schema = new Array(this.height).fill([]);
    schema.forEach((_, i) => {
      schema[i] = new Array(this.width).fill('e');
    });

    this.schemas.unshift(schema);
  }

  deleteScheme(index: number) {
    this.schemas.splice(index, 1);
  }

  runExperiments() {
    const trashChances = [2, 5, 10, 15, 20];
    const simulationLengths = [100, 500, 1000];
    // const trashChances = [2, 5];
    // const simulationLengths = [100, 500];

    const resultObservables = this.mapComponents.map(map => {
      const mapJobs: MapSimulationJob[] = [];

      agents.forEach(agentConstructor => {
        trashChances.forEach(trashChance => {
          simulationLengths.forEach(simulationLength => {
            mapJobs.push({
              agentConstructor,
              trashChance,
              simulationLength,
              schema: JSON.parse(JSON.stringify(map.schema)),
            });
          });
        });
      });

      return map.runJobs(mapJobs);
    });

    forkJoin(resultObservables)
      .subscribe(results => {
        this.experimentResults = results.map(experiments => ({
          experiments,
          trashChances,
          simulationLengths,
        }));
      });
  }
}
