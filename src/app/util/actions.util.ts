import { Action } from '../map.model';

export const moveActions = [
  Action.Down,
  Action.Up,
  Action.Left,
  Action.Right,
];

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n, 10))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];

  return randomEnumValue;
}

export function randomAction(): Action {
  return randomEnum(Action);
}

export function isMove(action: Action): boolean {
  return moveActions.includes(action);
}

export function randomMove(): Action {
  return moveActions[Math.floor(Math.random() * moveActions.length)];
}
