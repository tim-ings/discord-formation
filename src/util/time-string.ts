export const parseTimeString = (value: string): { seconds: number } | undefined => {
  const match = value.match(/((?<hours>\d+)h)?((?<minutes>\d+)m)?((?<seconds>\d+)s)?/);
  if (!match) return undefined;
  if (match.groups?.hours === undefined && match.groups?.minutes === undefined && match.groups?.seconds === undefined) return undefined;

  const hours = Number(match.groups?.hours ?? 0);
  const minutes = Number(match.groups?.minutes ?? 0);
  const seconds = Number(match.groups?.seconds ?? 0);

  return { seconds: (hours * 60 * 60) + (minutes * 60) + seconds };
};
