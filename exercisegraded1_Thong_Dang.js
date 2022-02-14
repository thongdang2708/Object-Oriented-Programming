const prompts = require('prompts');
const Fraction = require('fraction.js');

prompts.override(require('yargs').argv);


//Prompts UI

async function roomWithFullElements () {

    const initialActionChoices = [
        { title: 'Look around', value: 'Look Around' },
        { title: 'Go to Room', value: 'Go To Room' },
        { title: 'Attack', value: 'Attack'},
        { title: 'Exit game', value: 'Exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function roomWithNothing () {
    const initialActionChoices = [
        { title: 'Look around', value: 'Look Around' },
        { title: 'Go to Room', value: 'Go To Room' },
        { title: 'Attack', value: 'Attack'},
        { title: 'Exit game', value: 'Exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function linkBetweenRoomsinentrance () {
    const initialActionChoices = [
        { title: 'Hall Way', value: 'Hallway'},
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;

}


async function linkBetweenRoomsinHallWay () {
    const initialActionChoices = [
        { title: 'Entrance Room', value: 'entrance' },
        { title: 'Chamber', value: 'chamber' }
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function linkBetweenRoomsinChamber () {
    const initialActionChoices = [
        { title: 'Portal', value: 'portal' },
        { title: 'Hallway', value: 'Hallway' }
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function linkBetweenRoomsinPortal () {

    const initialActionChoices = [
        { title: 'Chamber', value: 'chamber' }
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function roomAfterAll () {
    const initialActionChoices = [
        { title: 'Look around', value: 'Look Around' },
        { title: 'Go to Room', value: 'Go To Room' },
        { title: 'Attack', value: 'Attack'},
        { title: 'Exit game', value: 'Exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;
}

async function roomAfterAllSecond () {

    const initialActionChoices = [
        { title: 'Look around', value: 'Look Around' },
        { title: 'Go to Room', value: 'Go To Room' },
        { title: 'Attack', value: 'Attack'},
        { title: 'Exit game', value: 'Exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;



}


// Set Class for Number Of Rooms

class Room {
    constructor(name) {
        this.name = name;
        this.linkedRooms = [];
        this.linkEnemy = [];
    }

    linkRoom(roomToLink) {
        this.roomToLink = roomToLink
    
        
        this.linkedRooms.push({
            room: this.roomToLink.name
        })
        return this.linkedRooms;
   
    }


    linkMonster (enemy) {
        
        this.linkEnemy.push(enemy);
        return this.linkEnemy;
    }


}


// Set Class for Player in games
class Character {
    constructor (name,health_point,dam,hit_chance) {
        this.name = name;
        this.health_point = health_point;
        this.dam = dam;
        this.hit_chance = hit_chance;
        this.enemyHealth = Number;
        this.low_point = [];
        this.playerHealth = Number;
    }


    attackEnemy(enemy) {
        
        this.enemy = enemy;
        let defaultNumbers = [0,1];
        let f = new Fraction(this.hit_chance/100);

        let newArrayTwo = [];
        newArrayTwo.push(f.d-f.n,f.n);
        let sum = newArrayTwo.reduce((a,b) => a+b);
        let tongcong = [];
      
        for (let aw=0;aw<defaultNumbers.length;aw++) {
            const count = (newArrayTwo[aw]/sum)*sum;
            for (let r=0; r<count;r++) {
                tongcong.push(aw);
            }
        }
       
        let randomIndex = Math.floor(Math.random()*tongcong.length);

        for (let ad=0;ad <tongcong.length;ad++) {
            if (ad === randomIndex & tongcong[ad] === 0) {
                console.log('Misses');
               
            } else if (ad === randomIndex & tongcong[ad] != 0) {
                this.enemy.health_point -= this.dam;

                if (this.enemy.health_point > 0) {
                    console.log(`${this.enemy.name} is attacked and remains ${this.enemy.health_point}`);
                
                } else {
                    console.log(`${this.enemy.name} is dead`);
                    
                }

                return this.enemy.health_point;
            } 
        }
        
       
        }
    
        updateEnemyBlood() {
            return this.enemy.health_point;
        }

        
        


   attackPlayer(enemy) {
        this.enemy = enemy;
         let defaultNumbers = [0,1];
      let f = new Fraction(this.enemy.hit_chance/100);

       let newArrayTwo = [];
       newArrayTwo.push(f.d-f.n,f.n);
         let sum = newArrayTwo.reduce((a,b) => a+b);
        let tongcong = [];
      
       for (let aw=0;aw<defaultNumbers.length;aw++) {
            const count = (newArrayTwo[aw]/sum)*sum;
             for (let r=0; r<count;r++) {
              tongcong.push(aw);
          }
        }


       let randomIndex = Math.floor(Math.random()*tongcong.length);
        
       if (tongcong[randomIndex] === 0) {
            console.log(`${this.enemy.name} attacks unsuccessfully!`)
     } else if (tongcong[randomIndex] === 1) {

            this.health_point = this.health_point - this.enemy.dam;

            if (this.health_point > 0) {
              console.log(`${this.enemy.name} hits successfully`);
               console.log(`Hit points remains ${this.health_point}`)
          } else if (this.health_point <= 0) {
              console.log('Player is dead. Game over!')
             }
             return this.health_point;
      }
        
        
     }

    


    updatePlayerBlood() {
      return this.health_point;
}
}
        



//Set Class For Enemy in games
class Enemy {
    constructor (name,health_point,dam,hit_chance) {
        this.name = name,
        this.health_point = health_point,
        this.dam = dam,
        this.hit_chance = hit_chance;
    }

    

    updatePlayerBlood() {
        return this.player.health_point;
    }
        
}

let dungeon = new Room('Dungeon Place');
let hallway = new Room('Hallway')
let chamber = new Room('Chamber');
let portal = new Room('Portal');



chamber.linkRoom(hallway);
chamber.linkRoom(portal);
portal.linkRoom(chamber);
portal.linkRoom(portal);



let player = new Character('Thong',10,2,75);
let rat = new Enemy('rat',2,1,50);
let dragon = new Enemy('dragon',4,8,90);


//Set UI and function for Entrance Room. 

function entranceRoom () {

    roomWithNothing().then(response => {
        if (response === 'Look Around') {
            console.log('You are in Dungeon Area');
            entranceRoom();
        } else if (response === 'Go To Room') {
            linkBetweenRoomsinentrance().then(vastaus => {
                if (vastaus === 'Hallway') {
                        hallwayArea();
                    }
            })
        } else if (response === 'Attack') {
            console.log('There are no enemies to attack!')
            entranceRoom();
        } else if (response === 'Exit') {
            process.exit();
        }
    })
}


entranceRoom();





const inhallway = hallway.linkMonster(rat);

//Set UI and function for Entrance Room. Please look around to see enemy
function hallwayArea () {
    


    
    if (inhallway.length > 0) {

        
        roomWithFullElements().then(response => {
            

            if (response === 'Attack') {
                
                for (let af=0;af<inhallway.length;af++) {
                    player.attackEnemy(inhallway[af])
                    
                    if (player.updateEnemyBlood() > 0) {
                        hallwayArea();
                    } else if (player.updateEnemyBlood() === 0) {
                        for (let as=0; as<inhallway.length;as++) {
                        if (inhallway[as].name === 'rat')
                            inhallway.splice(as,1);}

                            roomWithNothing().then(vastaus => {
                             if (vastaus === 'Look Around') {
                            console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
                            console.log('There are doorways leading to:');
                            console.log('The Dungeon');
                            console.log('Chamber');
                            hallwayArea();
                            } else if (vastaus === 'Go To Room') {
                            linkBetweenRoomsinHallWay().then(traloi => {
                            if (traloi === 'entrance') {
                                        entranceRoom();
                            } else if (traloi === 'chamber') {
                                        chamberArea();
                                        }
                              })
                        } else if (vastaus === 'Attack') {
                         console.log('There are no enemies to kill');
                         hallwayArea();
                        } else if (vastaus === 'Exit') {
                         process.exit();
                                                        }
                                                    })
                                                }

                }



            } else if (response === 'Go To Room') {
               linkBetweenRoomsinHallWay().then(link => {
                    if (link === 'entrance') {
                        entranceRoom();
                    } else if (link === 'chamber') {
                        chamberArea();
             }
 })
             } else if (response === 'Look Around') {
                             
                                for (let at=0;at<inhallway.length;at++) {
                                    player.attackPlayer(inhallway[at])
                
                                    if (player.updatePlayerBlood() > 0) {
                                        hallwayArea();
                                    } else if (player.updatePlayerBlood() <= 0) {
                                        process.exit();
                                    }
                                }
                           
                            } 



})
        

    
}
    else { 
                         roomAfterAll().then(doithoai => {
                          if (doithoai === 'Look Around') {
                            console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
                            console.log('There are doorways leading to:');
                            console.log('The Dungeon');
                            console.log('Chamber');
                            hallwayArea();
                            } else if (doithoai === 'Attack') {
                            console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
                            console.log('There are doorways leading to:');
                            console.log('Hallway');
                            console.log('Portal')
                            console.log('There are no enemies to kill anymore');
                            hallwayArea();
                             } else if (doithoai === 'Go To Room') {
                            linkBetweenRoomsinHallWay().then(linkki => {
                             if (linkki === 'entrance') {
                                    entranceRoom();
                                 } else if (linkki === 'chamber') {
                                    chamberArea();
                    }
                     })
                    } else if (doithoai === 'Exit') {
                         process.exit();
              }
          });
        }

}

// }


const inchamber = chamber.linkMonster(dragon);

//Set UI and function for Chamber room. Please look around to see enemy

function chamberArea () {
    
   
    if (inchamber.length > 0) {

        roomWithFullElements().then(response => {

           
            if (response === 'Attack') {
            
            for (let ad=0;ad<inchamber.length;ad++) {
                player.attackEnemy(inchamber[ad]) 

                if (player.updateEnemyBlood() > 0) {
                    chamberArea();
                } else if (player.updateEnemyBlood() === 0){
                    for (let as=0; as<inchamber.length;as++) {
                     if (inchamber[as].name === 'dragon')
                            inchamber.splice(as,1);}

                               roomWithNothing().then(vastaus => {
                                if (vastaus === 'Look Around') {
                                console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
                                console.log('There are doorways leading to:');
                                console.log('Hallway');
                                console.log('Portal')
                                roomWithNothing();
                                } else if (vastaus === 'Go To Room') {
                                linkBetweenRoomsinChamber().then(traloi => {
                                if (traloi === 'portal') {
                                console.log('You move to Glowing Portal');
                                console.log('Congratulations. You are in the final portal! You made through the dungeons!');
                                } else if (traloi === 'Hallway') {
                                    hallwayArea();
                                }
                            })
                        } else if (vastaus === 'Attack') {
                            console.log('There are no enemies to kill');
                            chamberArea();
                        } else if (vastaus === 'Exit') {
                            process.exit();
                        }
                    })
                }
            }
        } else if (response === 'Go To Room') {
                linkBetweenRoomsinChamber().then(link => {
                                if (link === 'portal') {
                                console.log('You move to Glowing Portal');
                                console.log('Congratulations. You are in the final portal! You made through the dungeons!');
                                } else if (link === 'Hallway') {
                                    hallwayArea();
                                }
                        })
            } else if (response === 'Look Around') {
               
                for (let az=0;az<inchamber.length;az++) {
                    player.attackPlayer(inchamber[az])

                    if (player.updatePlayerBlood() > 0) {
                        chamberArea();
                    } else if (player.updatePlayerBlood() === 0) {
                        console.log('Game Over');
                    }
                }
            } else if (response === 'Exit') {
                    process.exit();
            }
        
        })} 
            else { 
                 roomAfterAllSecond().then(doithoai => {
                  if (doithoai === 'Look Around') {
                    console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
                    console.log('There are doorways leading to:');
                    console.log('Hallway');
                    console.log('Portal')
                    chamberArea();
                    } else if (doithoai === 'Attack') {
                    console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
                    console.log('There are doorways leading to:');
                    console.log('Hallway');
                    console.log('Portal')
                    console.log('There are no enemies to kill anymore');
                    chamberArea();
                     } else if (doithoai === 'Go To Room') {
                    linkBetweenRoomsinChamber().then(linkki => {
                     if (linkki === 'portal') {
                        console.log('You move to Glowing Portal');
                        console.log('Congratulations. You are in the final portal! You made through the dungeons!');
                         } else if (linkki === 'Hallway') {
                            hallwayArea();
            }
             })
            } else if (doithoai === 'Exit') {
                 process.exit();
      }
  });
}
}




            


 



          