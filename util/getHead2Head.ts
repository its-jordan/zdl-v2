export default function createBeatenOpponentsArray(schedule: any) {
  const beatenOpponents = {};

  // Iterate through each week
  for (const week in schedule) {
    const matches = schedule[week];

    // Iterate through each match in the week
    for (const match of matches) {
      const { player1, player2, score } = match;
      const [score1, score2] = score.split('-').map(Number);

      let winner, loser;

      // Determine the winner and loser
      if (score1 > score2) {
        winner = player1;
        loser = player2;
      } else {
        winner = player2;
        loser = player1;
      }

      // @ts-expect-error
      if (!beatenOpponents[winner]) {
        // @ts-expect-error
        beatenOpponents[winner] = [];
      }

      // @ts-expect-error

      if (!beatenOpponents[winner].includes(loser)) {
        // @ts-expect-error
        beatenOpponents[winner].push(loser);
      }

      // @ts-expect-error
      if (!beatenOpponents[loser]) {
        // @ts-expect-error
        beatenOpponents[loser] = [];
      }
    }
  }

  return beatenOpponents;
}
