import { Action, Agent } from '../map.model';
import { randomMove } from '../util/actions.util';

export class SimpleReflexAgent implements Agent {
  private pEnergySpent = 0;
  get energySpent() {
    return this.pEnergySpent;
  }

  perceive(isDirty: boolean): Action {
    if (isDirty) {
      this.pEnergySpent += 2;
      return Action.Clean;
    }

    this.pEnergySpent += 1;
    return randomMove();
  }
}
