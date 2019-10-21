import { Component, Input, OnInit } from '@angular/core';
import { MapExperimentResult } from '../map.model';
import { agents } from '../agents/agentConstructor';

@Component({
  selector: 'app-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.scss']
})
export class ExperimentResultsComponent implements OnInit {
  @Input() experimentResult: MapExperimentResult;
  agentNames = agents.map(agentConstructor => agentConstructor.name);

  constructor() { }

  ngOnInit() {
  }

  experimentsByAgentName(agentName: string) {
    return this.experimentResult.experiments
      .filter(experiment => experiment.agentConstructor.name === agentName);
  }

}
