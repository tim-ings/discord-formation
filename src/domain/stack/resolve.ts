import { DiscordformationStack } from './decode';

export interface ReferenceResolver {
  (stack: DiscordformationStack): 
}

export const referenceResolver = () => {
  
};

// 1. decode a stack into a Stack
// 2. query server for current state into a State (like a stack but contains discord ids)
// 3. link stack to state
// 4. resolve !refs
