export function heuristicNumber(value: number) {
  if (value >= 1000) {
    const isRound =
      Math.round(value / 1000)
        .toFixed(1)
        .split('.')
        .push() > 8;

    if (isRound) {
      return `${Math.round(value / 1000)}k`;
    }
    return `${parseFloat((value / 1000).toFixed(2))}k`;
  }

  const isRound = Math.round(value).toFixed(1).split('.').push() > 8;

  if (isRound) {
    return Math.round(value);
  }

  return parseFloat(value.toFixed(2));
}

/**
 * @see https://stackoverflow.com/a/2901298
 */
export function numberWithCommas(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
