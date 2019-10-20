import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Agent } from '../../map.model';
import { RandomReflexAgent } from '../../agents/random-reflex-agent';
import { SimpleReflexAgent } from '../../agents/simple-reflex-agent';
import { ModelBasedReflexAgent } from '../../agents/model-based-reflex-agent';

type Agents = 'random' | 'simple' | 'model-based';

@Component({
  selector: 'app-map-agent-selector',
  templateUrl: './map-agent-selector.component.html',
  styleUrls: ['./map-agent-selector.component.scss']
})
export class MapAgentSelectorComponent implements AfterViewInit {
  agent: Agents = 'random';
  @Output() newAgent = new EventEmitter<Agent>();

  constructor() { }

  ngAfterViewInit() {
    this.emitAgent();
  }

  onAgentChange(val: Agents) {
    console.log(val);
    this.agent = val;
    this.emitAgent();
  }

  emitAgent() {
    if (this.agent === 'random') {
      this.newAgent.emit(new RandomReflexAgent());
    }

    if (this.agent === 'simple') {
      this.newAgent.emit(new SimpleReflexAgent());
    }

    if (this.agent === 'model-based') {
      this.newAgent.emit(new ModelBasedReflexAgent());
    }
  }

}
