const prompts = require('prompts');
const Fraction = require('fraction.js');
const rooms = require('./promptUI');
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

// Set Class for Number Of Rooms
class Room {
    constructor(name) {
        this.name = name;
        this.linkedRooms = [];
        this.enemyStore = [];
    }

    linkRoom(roomToLink) {
        this.roomToLink = roomToLink
    
        
        this.linkedRooms.push({
            room: this.roomToLink.name
        })
        return this.linkedRooms;
   
    }


    linkEnemy (enemy) {
        
        this.enemyStore.push(enemy);
        return this.enemyStore;
    }


}


// Set Class for Character
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
                this.attackEnemy(enemy);
            } else if (ad === randomIndex & tongcong[ad] != 0) {
                this.enemy.health_point -= this.dam;

                if (this.enemy.health_point > 0) {
                    console.log(`${this.enemy.name} is attacked and remains ${this.enemy.health_point}`);
                    this.attackEnemy(enemy);
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
          } else if (this.health_point === 0) {
              console.log('Player is dead. Game over!')
             }
             return this.health_point;
      }
        
        
     }

    


    updatePlayerBlood() {
      return this.health_point;
}
}
        



//Set Class For Enemy with Inheritance
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

// console.log(player.attackEnemy(dragon));
// console.log(hallway.linkRoom(dungeon));
// console.log(hallway.linkRoom(chamber));
// console.log(dungeon.linkRoom(hallway));

chamber.linkRoom(hallway);
chamber.linkRoom(portal);
portal.linkRoom(chamber);
portal.linkRoom(portal);



let player = new Character('Thong',10,2,75);
let rat = new Enemy('rat',4,1,50);
let dragon = new Enemy('dragon',4,8,90);

console.log(chamber.linkEnemy(dragon));


// console.log(hallway.linkEnemy(rat));
// console.log(player.attackEnemy(hallway.linkEnemy(rat)));


// function entranceRoom () {

//     roomWithNothing().then(response => {
//         if (response === 'Look Around') {
//             console.log('You are in Dungeon Area');
//             entranceRoom();
//         } else if (response === 'Go To Room') {
//             linkBetweenRoomsinentrance().then(vastaus => {
//                 if (vastaus === 'Hallway') {
//                         hallwayArea();
//                         rat.attackPlayer(player);

//                         if (rat.updatePlayerBlood() > 0) {
//                             hallwayArea();
//                         } else {
//                             process.exit();
//                         }
                        
//                     }
//             })
//         } else if (response === 'Attack') {
//             console.log('There are no enemies to attack!')
//             entranceRoom();
//         } else if (response === 'Exit') {
//             process.exit();
//         }
//     })
// }

// entranceRoom();

// chamberArea();

// function chamberArea () {

//     if (allenemiesinchamber.length != 0) {
    
//         roomWithFullElements().then(response => {
    
//                 if (response === 'Attack') {
//                 for (let we=0;we<allenemiesinchamber.length;we++) {


//                     console.log(allenemiesinchamber[we]);
            //         if (allenemiesinchamber[we].name === 'dragon') {
            //         player.attackEnemy(allenemiesinchamber[we]);
    
            //     if (player.updateEnemyBlood() != 0) {
            //         console.log('You bravely attack a Giant Dragon with your Sharp sword');
            //         console.log('Dragon is attacked and has still ' + player.updateEnemyBlood()  +  ' hitpoints left');
            //         hallwayArea();
            //         return player.updateEnemyBlood();
            //     } else {
            //         for (let as=0; as<allenemiesinchamber.length;as++) {
            //             if (allenemiesinchamber[as].name === 'dragon')
            //             allenemiesinchamber.splice(as,1);
            //         }
            //         console.log(allenemiesinchamber);
            //         console.log('You bravely attack Dragon with your Sharp sword');
            //         console.log('Dragon is dead');
            //         roomWithNothing().then(vastaus => {
            //             if (vastaus === 'Look Around') {
            //                 console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
            //                 console.log('There are doorways leading to:');
            //                 console.log('Hallway');
            //                 console.log('Portal')
            //                 chamberArea();
            //             } else if (vastaus === 'Go To Room') {
            //                 linkBetweenRoomsinChamber().then(traloi => {
            //                     if (traloi === 'portal') {
            //                         portal();
            //                     } else if (traloi === 'Hallway') {
            //                         Hallway();
            //                     }
            //                 })
            //             } else if (vastaus === 'Attack') {
            //                 console.log('There are no enemies to kill');
            //                 hallwayArea();
            //             } else if (vastaus === 'Exit') {
            //                 process.exit();
            //             }
            //         })
            //     }
            // }
//         }
//         } else if (response === 'Go To Room') {
//                 linkBetweenRoomsinChamber().then(link => {
//                     if (link === 'portal') {
//                         portal();
//                     } else if (link === 'Hallway') {
//                         hallwayArea();
//                     }
//             })
    
//         } else if (response === 'Look Around') {
//             for (let ads=0;ads<allenemiesinchamber.length;ads++) {
//                 player.attackPlayer(allenemiesinchamber[ads]); 
    
//                 if (player.updatePlayerBlood() > 0) {
//                     console.log('You see a Giant Dragon');
//                     console.log('Giant dragon attacks Player with its Sharp Claws and fire breath');
//                     console.log('Giant Dragon hits Player with 8 points');
//                     console.log('Player is hit and has ' + player.updatePlayerBlood() + ' hitpoints remaning');
//                     chamberArea();
//                 } else if (player.updatePlayerBlood() <= 0) {
//                     console.log('Player is dead. Game Over!');
//                     console.log('End Game');
//                     process.exit();
//                 }
    
                
//             }
//         }})
//                 } else {
//                     roomAfterAll().then(doithoai => {
//                         if (doithoai === 'Look Around') {
//                             hallwayArea();
//                         } else if (doithoai === 'Attack') {
//                             console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                             console.log('There are doorways leading to:');
//                             console.log('Hallway');
//                             console.log('Portal')
//                             console.log('There are no enemies to kill anymore');
//                             hallwayArea();
//                         } else if (doithoai === 'Go To Room') {
//                             linkBetweenRoomsinHallWay().then(linkki => {
//                                 if (linkki === 'entrance') {
//                                     entranceRoom();
//                                 } else if (linkki === 'Hallway') {
//                                     hallwayArea();
//                                 }
//                         })
//                         } else if (doithoai === 'Exit') {
//                             process.exit();
//                         }
//                     });
//                 }
// }





// function hallwayArea () {

//         if (allenemies.length != 0) {
    
//             roomWithFullElements().then(response => {

//            if (response === 'Attack') {
//             player.attackEnemy(hallway.linkEnemy(rat));
            
//                 if (player.updateEnemyBlood() > 0) {
//                     hallwayArea();
//             } else {
//                 for (let ar in hallway.linkEnemy(rat)) {
//                     if (hallway.linkEnemy(rat)[ar] === 'rat') {
//                        delete hallway.linkEnemy(rat);
//                     }
//                 }
           
//             if (player.updateEnemyBlood() > 0) {
//                     hallwayArea();
//             } else if (player.updateEnemyBlood() === 0) {
//            for (let as=0; as<allenemies.length;as++) {
//                    if (allenemies[as].name === 'rat')
//                    allenemies.splice(as,1);
//                }
                
//            roomWithNothing().then(vastaus => {
//                  if (vastaus === 'Look Around') {
//                       console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                        console.log('There are doorways leading to:');
//                      console.log('The Dungeon');
//                      console.log('Chamber')
//                         hallwayArea();
//                   } else if (vastaus === 'Go To Room') {
//                       linkBetweenRoomsinHallWay().then(traloi => {
//                             if (traloi === 'entrance') {
//                               entranceRoom()
//                             } else if (traloi === 'chamber') {
//                                 chamberArea();
//                              for (let kz=0;kz<allenemiesinchamber.length;kz++) {
//                                     if (allenemiesinchamber[kz].name === 'dragon') {
//                                           player.attackPlayer(allenemiesinchamber[kz]) 
                                        
                    
//                               if (player.updatePlayerBlood() > 0) {
//                                        chamberArea();
//                               } else if (player.updatePlayerBlood() === 0) {
//                                         process.exit();
//                                 }
//                         }
//                             }
//                  })
//                     }else if (vastaus === 'Attack') {
//                          console.log('There are no enemies to kill');
//                  hallwayArea();
//                    } else if (vastaus === 'Exit') {
//                        process.exit();
//                   }
//               })
//           }
//                 }}
//  }else if (response === 'Go To Room') {
//            linkBetweenRoomsinHallWay().then(link => {
//           if (link === 'entrance') {
//                entranceRoom();
//          } else if (link === 'chamber') {
//                  chamberArea();
//                    for (let kz=0;kz<allenemiesinchamber.length;kz++) {
//                        if (allenemiesinchamber[kz].name === 'dragon') {
//                          player.attackPlayer(allenemiesinchamber[kz]) 
                            
        
//                     if (player.updatePlayerBlood() > 0) {
//                             chamberArea();
//                       } else if (player.updatePlayerBlood() === 0) {
//                          process.exit();
//                         }
//                          }
//                    }
//                 }
//        })

//     } else if (response === 'Look Around') {
//             hallwayArea();
//             for (let kz=0;kz<allenemies.length;kz++) {
//                 if (allenemies[kz].name === 'rat') {
//                     player.attackPlayer(allenemies[kz]) 

//                 if (player.updatePlayerBlood() > 0) {
//                     hallwayArea();
//                 } else if (player.updatePlayerBlood() === 0) {
//                     process.exit();
//                 }
//                 }
//             }

//     }})
//             } else {
//                 roomAfterAll().then(doithoai => {
//                     if (doithoai === 'Look Around') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         hallwayArea();
//                     } else if (doithoai === 'Attack') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         console.log('There are no enemies to kill anymore');
//                         hallwayArea();
//                     } else if (doithoai === 'Go To Room') {
//                         linkBetweenRoomsinHallWay().then(linkki => {
//                             if (linkki === 'entrance') {
//                                 entranceRoom();
//                             } else if (linkki === 'chamber') {
//                                 chamberArea();
//                                 for (let kz=0;kz<allenemiesinchamber.length;kz++) {
//                                     if (allenemiesinchamber[kz].name === 'dragon') {
//                                         player.attackPlayer(allenemiesinchamber[kz]) 
                                        
                    
//                                     if (player.updatePlayerBlood() > 0) {
//                                         chamberArea();
//                                     } else if (player.updatePlayerBlood() === 0) {
//                                         process.exit();
//                                     }
//                                     }
//                                 }
//                             }
//                     })
//                     } else if (doithoai === 'Exit') {
//                         process.exit();
//                     }
//                 });
//             }
// }
// chamberArea();

// function chamberArea () {

//     if (hallway.linkEnemy(rat) != {}) {
    
//     roomWithFullElements().then(response => {

//             if (response === 'Attack') {
//             for (let we=0;we<allenemiesinchamber.length;we++) {
//                 if (allenemiesinchamber[we].name === 'dragon') {
//                 player.attackEnemy(allenemiesinchamber[we]);
                
            
//             if (player.updateEnemyBlood() > 0) {
//                 chamberArea();
//             } else if (player.updateEnemyBlood() === 0) {
//                 for (let as=0; as<allenemiesinchamber.length;as++) {
//                     if (allenemiesinchamber[as].name === 'dragon')
//                     allenemiesinchamber.splice(as,1);
//                 }
//                 roomWithNothing().then(vastaus => {
//                     if (vastaus === 'Look Around') {
//                         console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                         console.log('There are doorways leading to:');
//                         console.log('Hallway');
//                         console.log('Portal')
//                         chamberArea();
//                     } else if (vastaus === 'Go To Room') {
//                         linkBetweenRoomsinChamber().then(traloi => {
//                             if (traloi === 'portal') {
//                                 console.log('You move to Glowing Portal');
//                                 console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                             } else if (traloi === 'Hallway') {
                                
//                                 hallwayArea();
//                                 for (let kz=0;kz<allenemies.length;kz++) {
                                    
//                                         player.attackPlayer(allenemies[kz]) 
                                        
                    
//                                     if (player.updatePlayerBlood() > 0) {
//                                         hallwayArea();
//                                     } else if (player.updatePlayerBlood() === 0){
//                                         process.exit();
//                                     }
                                    
//                                 }
//                             }
//                         })
//                     } else if (vastaus === 'Attack') {
//                         console.log('There are no enemies to kill as enemy is dead!');
//                         chamberArea();
//                     } else if (vastaus === 'Exit') {
//                         process.exit();
//                     }
//                 })
//             }
//         }}
//     } else if (response === 'Go To Room') {
//             linkBetweenRoomsinChamber().then(link => {
//                 if (link === 'portal') {
//                     console.log('You move to Glowing Portal');
//                     console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                 } else if (link === 'Hallway') {
//                     hallwayArea();
//                     for (let kz=0;kz<allenemies.length;kz++) {
                                    
//                         player.attackPlayer(allenemies[kz]) 
                        
    
//                     if (player.updatePlayerBlood() > 0) {
//                         hallwayArea();
//                     } else if (player.updatePlayerBlood() === 0){
//                         process.exit();
//                     }
                    
//                 }
//                 }
//         })

//     } else if (response === 'Look Around') {
//             chamberArea();
//             for (let ct=0;ct<allenemiesinchamber.length;ct++) {
                
//                     player.attackPlayer(allenemiesinchamber[ct]) 
                    

//                 if (player.updatePlayerBlood() > 0) {
//                     chamberArea();
//                 } else if (player.updatePlayerBlood() === 0) {
//                     process.exit();
//                 }
                
//             }

//     }})
//             } else {
//                 roomAfterAll().then(doithoai => {
//                     if (doithoai === 'Look Around') {
//                         console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                         console.log('There are doorways leading to:');
//                         console.log('Hallway');
//                         console.log('Portal')
//                         chamberArea();
//                     } else if (doithoai === 'Attack') {
//                         console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                         console.log('There are doorways leading to:');
//                         console.log('Hallway');
//                         console.log('Portal')
//                         console.log('There are no enemies to kill anymore');
//                         hallwayArea();
//                     } else if (doithoai === 'Go To Room') {
//                         linkBetweenRoomsinChamber().then(linkki => {
//                             if (linkki === 'portal') {
//                                 console.log('You move to Glowing Portal');
//                                 console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                             } else if (linkki === 'Hallway') {
//                                 hallwayArea();
//                                 for (let kz=0;kz<allenemies.length;kz++) {
//                                     if (allenemies[kz].name === 'rat') {
//                                         player.attackPlayer(allenemies[kz]) 
                                        
                    
//                                     if (player.updatePlayerBlood() > 0) {
//                                         hallwayArea();
//                                     } else if (player.updatePlayerBlood() === 0) {
//                                         process.exit();
//                                     }
//                                     }
//                                 }
//                             }
//                     })
//                     } else if (doithoai === 'Exit') {
//                         process.exit();
//                     }
//                 });
//             }
// }




// function hallwayArea () {

    
//     if (hallway.linkEnemy(rat).health_point > 0)
//     roomWithFullElements().then(response => {

//             if (response === 'Attack') {
           
//             rat.attacked(player);
//             console.log(rat.updateEnemyBlood());
//             if (rat.updateEnemyBlood() >= 0) {
//                 hallwayArea();
//             } else if (rat.updateEnemyBlood() < 0) {
                
//                 roomWithNothing().then(vastaus => {
//                     if (vastaus === 'Look Around') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         roomWithNothing();
//                     } else if (vastaus === 'Go To Room') {
//                         linkBetweenRoomsinHallWay().then(traloi => {
//                             if (traloi === 'entrance') {
//                                 entranceRoom()
//                             } else if (traloi === 'chamber') {
//                                 chamberArea();
//                                 dragon.attackPlayer(player);

//             if (dragon.updatePlayerBlood() > 0) {
//                 chamberArea();
//             } else {
//                 process.exit();
//             }
//                             }
//                         })
//                     } else if (vastaus === 'Exit') {
//                         process.exit();
//                     }
//                 })
//             }
        
            
        
//     } else if (response === 'Go To Room') {
//             linkBetweenRoomsinHallWay().then(link => {
//                 if (link === 'entrance') {
//                     entranceRoom();
//                 } else if (link === 'chamber') {
//                     chamberArea();
//                     dragon.attackPlayer(player);

//             if (dragon.updatePlayerBlood() > 0) {
//                 chamberArea();
//             } else if (dragon.updatePlayerBlood() === 0){
//                 process.exit();
//             }
                    
//                 }
//         })

//     } else if (response === 'Look Around') {
//             // hallwayArea();
            
            
//             // player.attackPlayer(hallway.linkEnemy(rat))
//             // hallwayArea();

//             // if (player.updatePlayerBlood() > 0) {
//             //     hallwayArea();
//             // } else {
//             //     process.exit();
//             // }

//             rat.attackPlayer(player);

//             if (rat.updatePlayerBlood() > 0) {
//                 hallwayArea();
//             } else {
//                 process.exit();
//             }
            
            

//     }}) 
//          else if (hallway.linkEnemy(rat).health_point === 0) {
//                 roomAfterAll().then(doithoai => {
//                     if (doithoai === 'Look Around') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         roomAfterAll();
//                     } else if (doithoai === 'Attack') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         console.log('There are no enemies to kill anymore');
//                         roomAfterAll();
//                     } else if (doithoai === 'Go To Room') {
//                         linkBetweenRoomsinHallWay().then(linkki => {
//                             if (linkki === 'entrance') {
//                                 entranceRoom();
//                             } else if (linkki === 'chamber') {
//                                 chamberArea();
//                                 dragon.attackPlayer(player);

//             if (dragon.updatePlayerBlood() > 0) {
//                 chamberArea();
//             } else if (dragon.updatePlayerBlood() === 0){
//                 process.exit();
//             }
//                             }
//                     })
//                     } else if (doithoai === 'Exit') {
//                         process.exit();
//                     }
//                 });
//             }
// }


// function chamberArea () {

    
//     if (chamber.linkEnemy(dragon).health_point > 0)
//     roomWithFullElements().then(response => {

//             if (response === 'Attack') {
           
//                 dragon.attacked(player);

//             if (dragon.updateEnemyBlood() >= 0) {
//                 chamberArea();
//             } else if (dragon.updateEnemyBlood() < 0){
                
//                 roomWithNothing().then(vastaus => {
//                     if (vastaus === 'Look Around') {
//                         dragon.attackPlayer(player);

//                         if (dragon.updatePlayerBlood() > 0) {
//                             chamberArea();
//                         } else if (dragon.updatePlayerBlood() === 0) {
//                             process.exit();
//                         }
//                         chamberArea();
//                     } else if (vastaus === 'Go To Room') {
//                         linkBetweenRoomsinChamber().then(traloi => {
//                             if (traloi === 'portal') {
//                                 console.log('You move to Glowing Portal');
//                                 console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                             } else if (traloi === 'Hallway') {
//                                 hallwayArea();
//                                 rat.attackPlayer(player);

//                                 if (rat.updatePlayerBlood() > 0) {
//                                     hallwayArea();
//                                 } else if (rat.updatePlayerBlood() === 0){
//                                     process.exit();
//                                 }
                                
//                             }
//                         })
//                     } else if (vastaus === 'Attack') {
//                         console.log('There are no enemies to kill');
//                         chamberArea();
//                     } else if (vastaus === 'Exit') {
//                         process.exit();
//                     }
//                 })
//             }
        
            
        
//     } else if (response === 'Go To Room') {
//             linkBetweenRoomsinChamber().then(link => {
//                 if (link === 'portal') {
//                     // console.log('You move to Glowing Portal');
//                     // console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                 } else if (link === 'Hallway') {
//                     hallwayArea();
//                                 rat.attackPlayer(player);

//                                 if (rat.updatePlayerBlood() > 0) {
//                                     hallwayArea();
//                                 } else if (rat.updatePlayerBlood() === 0){
//                                     process.exit();
//                                 }  
                    
//                 }
//         })

//     } else if (response === 'Look Around') {
//             // hallwayArea();
            
            
//             // player.attackPlayer(hallway.linkEnemy(rat))
//             // hallwayArea();

//             // if (player.updatePlayerBlood() > 0) {
//             //     hallwayArea();
//             // } else {
//             //     process.exit();
//             // }

           
//             chamberArea();
//             dragon.attackPlayer(player);

//             if (dragon.updatePlayerBlood() > 0) {
//                 chamberArea();
//                 } else if (dragon.updatePlayerBlood() === 0){
//             process.exit();
// }

//     }}) 
//          else if (chamber.linkEnemy(dragon).health_point === 0) {
//                 roomAfterAll().then(doithoai => {
//                     if (doithoai === 'Look Around') {
//                         console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                         console.log('There are doorways leading to:');
//                         console.log('Hallway');
//                         console.log('Portal')
//                         chamberArea();
//                     } else if (doithoai === 'Attack') {
//                         console.log('You are in Chamber and it is a small chamber, which is illuminated by a glowing portal of somekind.\n');
//                         console.log('There are doorways leading to:');
//                         console.log('Hallway');
//                         console.log('Portal')
//                         console.log('There are no enemies to kill anymore');
//                         chamberArea();
//                     } else if (doithoai === 'Go To Room') {
//                         linkBetweenRoomsinChamber().then(linkki => {
//                             if (linkki === 'portal') {
//                             console.log('You move to Glowing Portal');
//                             console.log('Congratulations. You are in the final portal! You made through the dungeons!');
//                             } else if (linkki === 'Hallway') {
//                                 hallwayArea();
//                                 rat.attackPlayer(player);

//                                 if (rat.updatePlayerBlood() > 0) {
//                                     hallwayArea();
//                                 } else if (rat.updatePlayerBlood() === 0){
//                                     process.exit();
//                                 }                    
//                             }
//                     })
//                     } else if (doithoai === 'Exit') {
//                         process.exit();
//                     }
//                 });
//             }
// }





// function chamberArea () {

    
//     if (chamber.linkEnemy(chamber).health_point > 0)
//     roomWithFullElements().then(response => {

//             if (response === 'Attack') {
           
//             player.attackEnemy(hallway.linkEnemy(rat));
            
//             if (player.updateEnemyBlood() > 0) {
//                 hallwayArea();
//             } else {
                
//                 console.log(hallway.linkEnemy(rat));
               
//                 roomWithNothing().then(vastaus => {
//                     if (vastaus === 'Look Around') {
//                         hallwayArea();
//                     } else if (vastaus === 'Go To Room') {
//                         linkBetweenRoomsinHallWay().then(traloi => {
//                             if (traloi === 'entrance') {
//                                 entranceRoom()
//                             } else if (traloi === 'hallway') {
//                                 hallwayArea();
//                             }
//                         })
//                     } else if (vastaus === 'Attack') {
//                         console.log('There are no enemies to kill');
//                         chamberArea();
//                     } else if (vastaus === 'Exit') {
//                         process.exit();
//                     }
//                 })
//             }
        
            
        
//     } else if (response === 'Go To Room') {
//             linkBetweenRoomsinHallWay().then(link => {
//                 if (link === 'entrance') {
//                     entranceRoom();
//                 } else if (link === 'hallway') {
                    
//                 }
//         })

//     } else if (response === 'Look Around') {
//             hallwayArea();
//             console.log(hallway.linkEnemy(rat));
            
//             player.attackPlayer(hallway.linkEnemy(rat));

//             if (player.updatePlayerBlood() > 0) {
//                 hallwayArea();
//             } else {
//                 process.exit();
//             }
        

//     }}) 
//          else if (hallway.linkEnemy(rat).health_point === 0) {
//                 roomAfterAll().then(doithoai => {
//                     if (doithoai === 'Look Around') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         hallwayArea();
//                     } else if (doithoai === 'Attack') {
//                         console.log('You are in Hallway and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n')
//                         console.log('There are doorways leading to:');
//                         console.log('The Dungeon');
//                         console.log('Chamber');
//                         console.log('There are no enemies to kill anymore');
//                         hallwayArea();
//                     } else if (doithoai === 'Go To Room') {
//                         linkBetweenRoomsinHallWay().then(linkki => {
//                             if (linkki === 'entrance') {
//                                 entranceRoom();
//                             } else if (linkki === 'chamber') {
//                                 chamberArea();
//                             }
//                     })
//                     } else if (doithoai === 'Exit') {
//                         process.exit();
//                     }
//                 });
//             }
// }





















let allenemiesinchamber = chamber.linkEnemy(dragon);
console.log(allenemiesinchamber);

// chamberArea();






