const marginHouse = 0.3

const data = []
const pioresMargens = []
function run(){
const game = {
    odds: [3 - marginHouse, 3 - marginHouse, 3 - marginHouse],
    volume: [0, 0, 0],
    divida: [0, 0, 0]
}
const probabilities = [0.54, 0.3, 0.16]

function calculatePayouts(probs, totalBet) {
  const odds = probs.map(prob => {
    const odd = (1 / prob).toFixed(2);
    return ((odd -1)*(1 - marginHouse)+1);
  });

  const payouts = probs.map((prob, index) => {
    const odd = odds[index];
    const payout = ((totalBet * odd) + 1).toFixed(2);
    return payout;
  });

  return payouts.map(payout => parseFloat((payout / totalBet).toFixed(2)));
}




const oddInicial = calculatePayouts(probabilities, 100)

function bet(amount, id){
    recalculateOdds()
    game.volume[id] += Number(amount)
    game.divida[id] += Number(amount)*Number(game.odds[id])
    recalculateOdds()
}

function recalculateOdds(){
        const equilibriumConst = (game.volume[0] + game.volume[1] + game.volume[2] + 1000);
        const balanceListDuplicate = [...game.volume, ...game.volume];
        const newOdds = [];
        game.volume.forEach((bet) => {
            const A = balanceListDuplicate[game.volume.indexOf(bet)] + equilibriumConst;
            const B = balanceListDuplicate[game.volume.indexOf(bet) + 1] + equilibriumConst;
            const C = balanceListDuplicate[game.volume.indexOf(bet) + 2] + equilibriumConst;

            const odd =  (1 + B / A + C/A);
            newOdds.push(Number(odd.toFixed(2)));
        });
        for (let i = 0; i < 3; i++){
          var finalOdd = (newOdds[i] * 1 + oddInicial[i] * 1)/2
          finalOdd < 1 ? finalOdd = 1.1 : null
          game.odds[i] = Number(((1 - marginHouse) * finalOdd).toFixed(2))
        }
}

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

function getRandomNumber(probabilities) {
  const randomNumber = Math.random();
  
  if (randomNumber < probabilities[0]) {
    return 0;
  } else if (randomNumber < probabilities[0] + probabilities[1]) {
    return 1;
  } else {
    return 2;
  }
}
  for(let i = 0; i < 100; i++){
    bet(getRandomArbitrary(1, 200), getRandomNumber(probabilities))
  }



var maiorDivida = game.divida.reduce(function(a, b) {
    return Math.max(a, b);
  }, -Infinity);

const volumeTotal = game.volume[0] + game.volume[1] + game.volume[2]
const cenarios =  [volumeTotal - game.divida[0], volumeTotal - game.divida[1], volumeTotal - game.divida[2]]
const margens = cenarios.map(cenario => Number((cenario / volumeTotal*100).toFixed(2)) + '%')
const margensInt = margens.map(margem => Number(margem.slice(0, -1)))
var margemMedia = margensInt.reduce(function(soma, i) {
    return soma + i;
})/3;
const piorMargem = (volumeTotal - maiorDivida)/volumeTotal*100
pioresMargens.push(piorMargem)
data.push({margem:  ((volumeTotal - maiorDivida)/volumeTotal*100).toFixed(2)+'%', lucro: (volumeTotal - maiorDivida).toFixed(2)})
// console.log(game)
console.log(volumeTotal)

}
for(let i = 0; i < 100; i++){
    run()
}
// run()
const margemGeralMedia = pioresMargens.reduce(function(soma, i) {
    return soma + i;
})/pioresMargens.length;
console.log(margemGeralMedia.toFixed(2)+'%')