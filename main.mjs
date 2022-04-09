import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, HEAL, RANGED_ATTACK } from '/game/constants';

export function loop() {
    const creeps =  getObjectsByPrototype(Creep);
    const myCreeps = creeps.filter(creep => creep.my);
    const myDamagedCreeps = myCreeps.filter(i => i.my && i.hits < i.hitsMax);
    const enemyCreep = creeps.find(creep => !creep.my);

    myCreeps.forEach(myCreep => {
        console.log(myCreep.body);
        if(myCreep.body.some(bodyPart => bodyPart.type == ATTACK)) {
            if(myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
                myCreep.moveTo(enemyCreep);
            }
        }
        if(myCreep.body.some(bodyPart => bodyPart.type == HEAL)) {
            if(myDamagedCreeps.length > 0) {
                const damagedCreep = myDamagedCreeps[0];
                if(myCreep.rangedHeal(damagedCreep) == ERR_NOT_IN_RANGE) {
                    myCreep.moveTo(damagedCreep);
                }
            }
        }
        if(myCreep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
            if(myCreep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
                myCreep.moveTo(enemyCreep);
            }
        }
    });
}