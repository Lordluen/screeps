var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.mySource = null;
            creep.say('ð harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('ð§ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
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
    }
};

module.exports = roleUpgrader;
