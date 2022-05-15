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

export function getDataPercentageByKey(
  data: any[],
  prop: string
): { label: string; value: any }[] {
  const getUniqueValues = [...new Set(data.map((item) => item[prop]))];
  return getUniqueValues.map((key) => {
    return {
      label: key ? key : 'no data',
      value:
        (data.filter((row) => row[prop] == key).length / data.length) * 100,
    };
  });
}
