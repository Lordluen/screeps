// Spawn a creep (harvester)
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester1' );
// give memory of being a harvester
Game.creeps['Harvester1'].memory.role = 'harvester';

// create upgrader
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
// create memory of being an upgrader
Game.creeps['Upgrader1'].memory.role = 'upgrader';

// create worker with memory
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Builder1',
    { role: 'builder' } );

// Big harvester
Game.spawns['Spawn1'].createCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     'HarvesterBig',     { role: 'harvester' } );

// safe mode
Game.spawns['Spawn1'].room.controller.activateSafeMode();

// build tower
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
