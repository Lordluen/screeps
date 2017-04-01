var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.mySource = -1;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var spawn = Game.spawns['Spawn1'];
                creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            // choosing a source at random
            if(!creep.memory.mySource || creep.memory.mySource == -1) {
                creep.memory.mySource = Math.round(Math.random()*sources.length);
            }
            if(creep.harvest(sources[creep.memory.mySource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.mySource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;
