import { AgentConstructor } from './agents/agentConstructor';

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

export interface MapSimulationJob {
  agentConstructor: AgentConstructor;
  trashChance: number;
  simulationLength: number;
  schema: MapSchema;
}

export interface MapSimulationResult extends MapSimulationJob {
  avgTrashness: number;
  energySpent: number;
}

export interface MapExperimentResult {
  experiments: MapSimulationResult[];
  simulationLengths: number[];
  trashChances: number[];
}
