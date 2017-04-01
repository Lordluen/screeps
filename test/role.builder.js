var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.mySource = null;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // switch to harvester if there is nothing to build
                creep.memory.role = 'harvester';
            }
        }
        else {
            // choosing a source at random
            if(!creep.memory.mySource || creep.memory.mySource == null) {
                var sources = creep.room.find(FIND_SOURCES);
                var availSources = [];
                var maxAssign = 4;
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

module.exports = roleBuilder;
