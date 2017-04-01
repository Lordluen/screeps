var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            // filter to available sources
            availSources = []
            for(var source in sources){
                var count = 0;
                // loop through all creeps to find out if someone is assigned to this source
                for(var tcreep in Game.creeps){
                    if(tcreep.memory.mySource == source) {
                        count = count + 1;
                        // if count is 2 or more, we can stop this
                        if(count > 1) {
                            break;
                        }
                    }
                }
                // if there are less than 2 creeps assigned to source keep it
                if(count < 2) {
                    availSources.push(source)
                }
            }

            // choosing a source at random
            if(!creep.memory.mySource) {
                creep.memory.mySource = availSources[Math.round(Math.random()*(availSources.length-1))];
            }
            if(creep.harvest(creep.memory.mySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.mySource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.memory.mySource = null;
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
