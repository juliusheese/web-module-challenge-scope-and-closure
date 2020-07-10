// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 * counter 1 returns the counter function which returns count ++
 * also counter1 uses closure by assigning the counter1 const to counter maker
 * 
 * counter2's is used to return count++
 * count is incremented by 1 using the counter2 function
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * counter1 uses closure becaue counter1 is assigned to the value of ocunterMaker which creates
 * the closure because the variable is used outside the function and uses persistant data
 * 
 * counter2 uses closure because the count variable is used outside of the function; the function
 * increments count which is outside of the scope of the function which means that it uses closure
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
  count is global on counter2, so it doesn't ever go away
  in counter1 the count is protected, so counter2 could be changed by other functions
  but count in counter1 cannot be changed
 */


// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){
      p = Math.floor(Math.random() * Math.floor(3));
      return p;
}

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(inn , n) {
  let s = {
    Home:  0,
    Away: 0,
  };
  for (i = 0; i < n; i++){
    s.Home = s.Home + inning();
  }
  for (i = 0; i < n; i++){
    s.Away = s.Away + inning();
  }
  return s;
}

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `inning` that you wrote above
(1) Callback function `getInningScore`
(3) A number of innings

and returns the score at each pont in the game, like so:

1st inning: 0 - 2
2nd inning: 1 - 3
3rd inning: 1 - 3
4th inning: 2 - 4
5th inning: 4 - 6
6th inning: 4 - 6
7th inning: 4 - 6
8th inning: 5 - 8
9th inning: 6 - 10

Final Score: 6 - 10 

function getInningScore(inning, n){
  if (n == 1){
    return console.log(`1st inning: ` + inning() ` - ` + inning());
  }
  else if (n == 3) {
    return console.log(`3rd inning: ` + inning() ` - ` + inning());
  } else {
    return console.log(n+ `th inning: ` + inning() ` - ` + inning());
  }
}

function scoreboard(inning, getInningScore, n) {
  for (i = 0; i < n; i++){
    getInningScore();
  }
  return console.log(`\nFinal Score: ` + inning() ` - ` + inning() );
}
*/

function scoreboard(getScores, scores, numOfInnings) {
  let suffix = "";
  let s = {
    Home:  0,
    Away: 0,
  };
  for (i = 1; i <= numOfInnings; i ++){
    s.Home = s.Home + inning();
    s.Away = s.Away + inning();
    if (i === 1){
      suffix = "st";
    }
    else if (i === 2) {
      suffix = "nd";
    }
    else if (i === 3) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    console.log(`${i}${suffix} inning: ${s.Home} - ${s.Away} `);
  }
    
  return `Final Score: ${s.Home} - ${s.Away} `;
}
function getInningScore(){
 let s = {
  Home:  0,
  Away: 0,
};
  return s.Home,s.Away;
}
console.log(scoreboard(getInningScore,inning,9));

/*
function scoreboard(getScores, scores, numOfInnings) {
  let suffix = "";
  let s = {
    Home:  0,
    Away: 0,
  };
    let homeArray = []
    let awayArray = []
  for (i = 1; i <= numOfInnings; i ++){
    getScores(scores);
    s.Home = s.Home + inning();
    s.Away = s.Away + inning();
    homeArray.push( s.Home )
    awayArray.push( s.Away )
    if (i === 1){
      suffix = "st";
    }
    else if (i === 2) {
      suffix = "nd";
    }
    else if (i === 3) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    console.log(`${i}${suffix} inning: ${s.Home} - ${s.Away} `);
  }
  const reducer = ( total, num ) => total + num
  s.Home = homeArray.reduce( reducer )
  s.Away = awayArray.reduce( reducer ) 
  return `Final Score: ${s.Home} - ${s.Away} `;
}
function getInningScore(){
 let s = {
  Home:  0,
  Away: 0,
};
  return s.Home,s.Away;
}
console.log(scoreboard(getInningScore,inning,9))

function getInningScore(inningCB){
  let s = {
    home: 0,
    away: 0,
  };
  return function ()
  {
    home += inningCB();
    away += inningCB();
    return (s.home, s.away)
  }
}

function scoreboard (getInningScoreCB, inningCB, innings){
  const scoreByInning=[];
  const temp = getInningScoreCB(inningCB);
  for (let i = 1; i <= innings; i++){
    scoresByInning.push(temp());
  }
}
*/