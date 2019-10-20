import { Action, Agent } from '../map.model';
import { randomAction } from '../util/actions.util';

export class RandomReflexAgent implements Agent {
  private pEnergySpent = 0;
  get energySpent() {
    return this.pEnergySpent;
  }

  perceive(isDirty: boolean): Action {
    const action = randomAction();

    if (action === Action.Clean) {
      this.pEnergySpent += 1;
    }

    if (action !== Action.Idle) {
      this.pEnergySpent += 1;
    }

    return action;
  }
}
