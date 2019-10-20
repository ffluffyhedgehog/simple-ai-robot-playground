import { Component, Input, OnInit } from '@angular/core';
import { Action, Agent, MapCellType, MapSchema, Place } from '../map.model';
import { countTrashness, getCell, processAction, selectNewAgentLocation, spawnTrash } from '../util/schema.util';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() schema: MapSchema;
  agent: Agent;
  agentLoc: Place;
  autoMove: boolean;
  autoMoveSpeed = 500;
  ultrafastAutomove: boolean;
  ultrafastAutomoveUntil = 1000;
  trashProbabilityPercent = 10;
  steps = 0;
  lastStepWasBump: boolean;
  possibleActions = Action;
  lastTenActions: {action: Action, bumped: boolean, cleanSuccess: boolean}[];
  trashCounts: number[];
  avgTrashness: number;

  constructor() { }

  ngOnInit() {
  }

  agentChange(newAgent: Agent) {
    this.agent = newAgent;
    this.steps = 0;
    this.lastTenActions = [];
    this.trashCounts = [];

    this.agentLoc = selectNewAgentLocation(this.schema);
  }


  move() {
    this.steps++;
    const action = this.agent.perceive(
      getCell(this.schema, this.agentLoc) === 't',
      this.lastStepWasBump
    );
    const moveResults = processAction(this.agentLoc, this.schema, action);
    this.agentLoc = moveResults.loc;
    this.lastStepWasBump = moveResults.hasBumped;
    this.pushAction(action, moveResults.hasBumped, moveResults.cleanSuccess);

    spawnTrash(this.schema, this.trashProbabilityPercent);

    this.updateTrashness();
  }

  cycle() {
    this.move();

    if (this.ultrafastAutomove && this.steps > this.ultrafastAutomoveUntil) {
      this.ultrafastAutomove = false;
      this.autoMove = false;
    }

    if (this.autoMove) {
      if (this.ultrafastAutomove) {
        setTimeout(() => this.cycle());
      } else {
        setTimeout(() => this.cycle(), this.autoMoveSpeed);
      }
    }
  }

  updateTrashness() {
    this.trashCounts.push(countTrashness(this.schema));

    this.avgTrashness = this.trashCounts.reduce((prev, curr) => prev + curr, 0) / this.trashCounts.length;
  }

  pushAction(action: Action, bumped: boolean, cleanSuccess: boolean) {
    this.lastTenActions.unshift({action, bumped, cleanSuccess});

    if (this.lastTenActions.length > 10) {
      this.lastTenActions.pop();
    }
  }

  toggleAutomove() {
    this.autoMove = !this.autoMove;

    if (this.autoMove) {
      this.cycle();
    }
  }

  changeCell(newCell: MapCellType, top: number, left: number) {
    this.schema[top][left] = newCell;
  }

}
