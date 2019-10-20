import * as _ from 'lodash';

import { Action, Agent, Place } from '../map.model';
import { isMove, moveActions } from '../util/actions.util';
import { makeMove } from '../util/schema.util';

interface MultidimensionalMap {
  [top: number]: {[left: number]: Partial<MapPlace>};
}

interface MapPlace {
  isWall: boolean;
  lastVisited: number;
}

export class ModelBasedReflexAgent implements Agent {
  prevAction: Action;
  iterations = 0;
  loc: Place = {top: 0, left: 0};

  map: MultidimensionalMap = {};

  private pEnergySpent = 0;
  get energySpent() {
    return this.pEnergySpent;
  }

  handleLastMove(bumpOccurred: boolean) {
    const nextLoc = makeMove(this.loc, this.prevAction);
    if (bumpOccurred) {
      this.getMapPlace(nextLoc).isWall = true;
      return;
    }

    this.getMapPlace(this.loc).lastVisited = this.iterations;
    this.loc = nextLoc;
  }

  getMapPlace(loc: Place) {
    if (!this.map[loc.top]) {
      this.map[loc.top] = {};
    }

    if (!this.map[loc.top][loc.left]) {
      this.map[loc.top][loc.left] = {
        isWall: false,
        lastVisited: -1,
      };
    }
    return this.map[loc.top][loc.left];
  }

  clean(): Action {
    this.pEnergySpent += 2;
    return Action.Clean;
  }

  move(): Action {
    const possibleActions = moveActions
      .map(action => ({action, destination: this.getMapPlace(makeMove(this.loc, action))}))
      .filter(({destination}) => !destination.isWall);

    if (possibleActions.length) {
      this.pEnergySpent++;
      console.log(possibleActions, _.minBy(possibleActions, 'destination.lastVisited'));
      return _.minBy(possibleActions, 'destination.lastVisited').action;
    } else {
      return Action.Idle;
    }
  }

  perceive(isDirty: boolean, bumpOccurred: boolean): Action {
    if (isMove(this.prevAction)) {
      this.handleLastMove(bumpOccurred);
    }

    this.prevAction = isDirty ? this.clean() : this.move();

    this.iterations += 1;

    return this.prevAction;
  }
}
