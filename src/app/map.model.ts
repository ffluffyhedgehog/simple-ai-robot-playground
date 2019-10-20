export type MapCellType = 'w' | 'e' | 't';

export type MapSchema = MapCellType[][];

export interface Agent {
  energySpent: number;
  perceive(isDirty: boolean, bumpOccurred: boolean): Action;
}

export interface Place {
  top: number;
  left: number;
}

export enum Action {
  Left,
  Right,
  Up,
  Down,
  Idle,
  Clean,
}
