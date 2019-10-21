import { Component, Input, OnInit } from '@angular/core';
import { Action, Agent, MapCellType, MapExperimentResult, MapSchema, MapSimulationJob, MapSimulationResult, Place } from '../map.model';
import { countTrashness, getCell, processAction, selectNewAgentLocation, spawnTrash } from '../util/schema.util';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() schema: MapSchema;
  @Input() showControls: boolean;
  @Input() verbose: boolean;
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

  simRunning = false;

  autoMoveBS = new BehaviorSubject<boolean>(false);

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
    } else {
      this.autoMoveBS.next(false);
    }
  }

  runJobs(jobs: MapSimulationJob[]): Observable<MapSimulationResult[]> {
    return new Observable((observer) => {
      this.autoMove = false;
      this.simRunning = true;

      const results: MapSimulationResult[] = [];
      let lastJob: MapSimulationJob = null;

      const sub = this.autoMoveBS
        .subscribe(running => {
          if (!running) {
            if (lastJob) {
              results.push({
                avgTrashness: this.avgTrashness,
                energySpent: this.agent.energySpent,
                ...lastJob
              });
            }
            if (!jobs.length) {
              sub.unsubscribe();
              observer.next(results);
              observer.complete();
              this.simRunning = false;
              return;
            }
            lastJob = jobs.pop();
            this.ultrafastAutomove = true;
            this.autoMove = true;
            this.schema = lastJob.schema;
            this.ultrafastAutomoveUntil = lastJob.simulationLength;
            this.agentChange(new lastJob.agentConstructor());
            this.trashProbabilityPercent = lastJob.trashChance;
            this.cycle();
          }
        });
    });
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

    this.autoMoveBS.next(this.autoMove);

    if (this.autoMove) {
      this.cycle();
    }
  }

  changeCell(newCell: MapCellType, top: number, left: number) {
    this.schema[top][left] = newCell;
  }

}
