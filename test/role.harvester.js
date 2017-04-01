var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            // choosing a source at random
            if(!creep.memory.mySource || creep.memory.mySource == null) {
                var sources = creep.room.find(FIND_SOURCES);
                var availSources = [];
                var maxAssign = 3;
                console.log(creep.name);
                console.log(sources);
                for(var sname in sources){
                    var source = sources[sname];
                    console.log(source.id);
                    var count = 0;
                    // loop through all creeps to find out if someone is assigned to this source
                    for(var name in Game.creeps){
                        var tcreep = Game.creeps[name];
                        if(tcreep.memory.mySource == source.id) {
                            count = count + 1;
                            // if count is 2 or more, we can stop this
                            if(count > (maxAssign - 1)) {
                                break;
                            }
                        }
                    }
                    // if there are less than 2 creeps assigned to source keep it
                    if(count < maxAssign) {
                        availSources.push(source)
                    }
                }
                console.log(availSources);
                if(availSources.length > 0) {
                    creep.memory.mySource = availSources[Math.round(Math.random()*(availSources.length-1))].id;
                }
            }
            if(creep.harvest(Game.getObjectById(creep.memory.mySource)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.mySource), {visualizePathStyle: {stroke: '#ffaa00'}});
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
