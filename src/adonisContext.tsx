import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { AdonisContextContract } from '@ioc:Preact';

const adonisContext = createContext<AdonisContextContract | null>(null);

export const AdonisContextProvider = adonisContext.Provider;

export function useAdonisContext(): AdonisContextContract {
  const context = useContext(adonisContext);
  if (!context) {
    throw new Error('useAdonisContext called in the wrong context');
  }
  return context;
}
