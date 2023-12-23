import { world } from "@minecraft/server";

world.afterEvents.entityHealthChanged.subscribe(
    (onHitEvent) => {
        if(onHitEvent.entity.typeId === "edge:training_target"){
            let oldHP = onHitEvent.oldValue;
            let newHP = onHitEvent.newValue;
            onHitEvent.entity.runCommand(`say Damage = §c${oldHP-newHP}§f\nCurrent HP = §a${newHP}`);
            onHitEvent.entity.runCommand(`playanimation @s hurt`);
        }
    }
);