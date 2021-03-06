var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            // choosing a source at random
            if(!creep.memory.mySource || creep.memory.mySource == -1) {
                creep.memory.mySource = Math.round(Math.random()*(sources.length-1));
            }
            if(creep.harvest(sources[creep.memory.mySource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.mySource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.memory.mySource = -1;
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
    }
};

module.exports = roleHarvester;
