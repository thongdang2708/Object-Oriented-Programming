// Set PROMPT UI for each specific room;
const prompts = require('prompts');
prompts.override(require('yargs').argv);

let roomWithFull = async function roomWithFullElements () {

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

let roomWithNothing = async function roomWithNothing () {
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

let linkInEntrance = async function linkBetweenRoomsinentrance () {
    const initialActionChoices = [
        { title: 'Hall Way', value: 'Hallway' },
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices,
    });

    return response.value;

}


let linkInHallWay = async function linkBetweenRoomsinHallWay () {
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

let linkInChamber = async function linkBetweenRoomsinChamber () {
    const initialActionChoices = [
        { title: 'Hall Way', value: 'Hallway' },
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

let linkInPortal = async function linkBetweenRoomsinPortal () {

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





