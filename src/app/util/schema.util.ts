import { Action, MapCellType, MapSchema, Place } from '../map.model';


const MAX_RANDOM_TRIES = 1000;


export function schemaHeight(schema: MapSchema): number {
  return schema.length;
}

export function schemaWidth(schema: MapSchema): number {
  return schema.reduce((prev, curr) => prev > curr.length ? prev : curr.length, -1);
}

export function getCell(schema: MapSchema, {left, top}: Place): MapCellType {
  if (
    top >= schemaHeight(schema) ||
    left >= schemaWidth(schema) ||
    top < 0 ||
    left < 0 ||
    !schema[top] ||
    !schema[top][left]
  ) {
    return 'w';
  }

  return schema[top][left];
}

export function processAction(
  loc: Place,
  schema: MapSchema,
  action: Action
): {
  loc: Place,
  hasBumped?: boolean,
  cleanSuccess?: boolean
} {
  if (action === Action.Clean) {
    const cleanSuccess = schema[loc.top][loc.left] === 't';
    schema[loc.top][loc.left] = 'e';
    return {loc, cleanSuccess};
  }

  if (action === Action.Idle) {
    return {loc};
  }

  const nextLoc = makeMove(loc, action);

  if (getCell(schema, nextLoc) === 'w') {
    return {loc, hasBumped: true};
  }

  return {loc: nextLoc};
}

export function makeMove(loc: Place, action: Action) {
  const nextLoc = {...loc};

  if (action === Action.Left) {
    nextLoc.left -= 1;
  }

  if (action === Action.Up) {
    nextLoc.top -= 1;
  }

  if (action === Action.Right) {
    nextLoc.left += 1;
  }

  if (action === Action.Down) {
    nextLoc.top += 1;
  }

  return nextLoc;
}

export function selectNewAgentLocation(schema: MapSchema, tries = 0): Place {
  if (tries > MAX_RANDOM_TRIES) {
    return {left: -1, top: -1};
  }

  const loc: Place = {
    left: Math.floor(Math.random() * schemaWidth(schema)),
    top: Math.floor(Math.random() * schemaHeight(schema)),
  };

  if (getCell(schema, loc) === 'w') {
    return selectNewAgentLocation(schema, ++tries);
  }

  return loc;
}

export function selectNewTrashLocation(schema: MapSchema, tries = 0): Place {
  if (tries > MAX_RANDOM_TRIES) {
    return {left: -1, top: -1};
  }

  const loc: Place = {
    left: Math.floor(Math.random() * schemaWidth(schema)),
    top: Math.floor(Math.random() * schemaHeight(schema)),
  };

  if (getCell(schema, loc) === 'w' || getCell(schema, loc) === 't') {
    return selectNewTrashLocation(schema, ++tries);
  }

  return loc;
}

export function spawnTrash(schema: MapSchema, probabilityPercent: number) {
  if (Math.random() > probabilityPercent / 100) {
    return;
  }

  const trashLoc = selectNewTrashLocation(schema);

  if (trashLoc.left === -1) {
    return;
  }

  schema[trashLoc.top][trashLoc.left] = 't';
}

export function countTrashness(schema: MapSchema) {
  const trashes = schema.reduce((prev, curr) =>
    prev + curr.reduce((p, c) => p + (c === 't' ? 1 : 0), 0), 0
  );

  const walls = schema.reduce((prev, curr) =>
    prev + curr.reduce((p, c) => p + (c === 'w' ? 1 : 0), 0), 0
  );

  const area = schemaHeight(schema) * schemaWidth(schema);

  return trashes / (area - walls);
}
