import { Component, Input, OnInit } from '@angular/core';
import { MapSimulationResult } from '../../map.model';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() agentName: string;
  @Input() experiments: MapSimulationResult[];
  @Input() simulationLengths: number[];
  @Input() trashChances: number[];

  constructor() { }

  ngOnInit() {
  }

  pluckData(simulationLen: number, trashChance: number) {
    return this.experiments.find(exp => exp.simulationLength === simulationLen && exp.trashChance === trashChance);
  }

}
