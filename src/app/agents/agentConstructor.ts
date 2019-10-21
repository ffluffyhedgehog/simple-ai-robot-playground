import { ModelBasedReflexAgent } from './model-based-reflex-agent';
import { RandomReflexAgent } from './random-reflex-agent';
import { SimpleReflexAgent } from './simple-reflex-agent';

export type AgentConstructor = (typeof ModelBasedReflexAgent | typeof SimpleReflexAgent | typeof RandomReflexAgent);

export const agents: (AgentConstructor)[] = [ModelBasedReflexAgent, RandomReflexAgent, SimpleReflexAgent];
