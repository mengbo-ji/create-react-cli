const container = new Map();

const modelsContainer = {
  set(namespace: string, model: any) {
    container.set(namespace, model);
  },
  get(namespace?: string) {
    if (!namespace) {
      return container;
    }
    if (!container.has(namespace)) {
      console.warn(`the key of '${namespace}' does not exist in modelsContainer`)
    }
    return container.get(namespace);
  },
};

export {
  modelsContainer,
};
