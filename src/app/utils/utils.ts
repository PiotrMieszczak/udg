export function assertProperties(props: string[], object: object) {
  const data = props.every((prop) => hasOwnProperty(object, prop));
  if (!data)
    throw Error('Frontend object model does not match file object model');

  return true;
}

function hasOwnProperty<T, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function parseKeysToLowerCase(data: any[]) {
  return data.map((entity) => {
    return Object.entries(entity).reduce(
      (acc, [k, v]) => ({ ...acc, [k.toLocaleLowerCase()]: v }),
      {}
    );
  });
}
