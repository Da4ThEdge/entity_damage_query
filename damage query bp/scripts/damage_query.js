import { world, MolangVariableMap } from "@minecraft/server";

world.afterEvents.entityHealthChanged.subscribe(
    (onHitEvent) => {
        if(onHitEvent.entity.typeId === "edge:training_target"){
            let oldHP = onHitEvent.oldValue;
            let newHP = onHitEvent.newValue;
            let damage = oldHP - newHP;
            let entityLocation = onHitEvent.entity.getHeadLocation();
            entityLocation.y = entityLocation.y + 0.6;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.dmgpoint", damage);
            onHitEvent.entity.runCommand(`say Damage = §c${damage}§f\nCurrent HP = §a${newHP}`);
            onHitEvent.entity.runCommand(`playanimation @s hurt`);
            onHitEvent.entity.dimension.spawnParticle("edge:dmgpoint_particle", entityLocation, molang);
        }
    }
);