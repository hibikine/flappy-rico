import * as React from 'react';

const ResourceContext = React.createContext<PIXI.loaders.ResourceDictionary>(
  {}
);
export const ResourceConsumer = ResourceContext.Consumer;
export const ResourceProvider = ({
  children,
  resources,
}: {
  children: React.ReactNode;
  resources: PIXI.loaders.ResourceDictionary;
}) => (
  <ResourceContext.Provider value={resources}>
    {children}
  </ResourceContext.Provider>
);
export const resource = <T extends keyof P, P>(key: T, fileName: string) => (
  Component: React.ComponentType<P>
) => (props: Pick<P, Exclude<keyof P, T>>) => (
  <ResourceConsumer>
    {resources => (
      <Component {...{ [key]: resources[fileName].texture }} {...props} />
    )}
  </ResourceConsumer>
);
