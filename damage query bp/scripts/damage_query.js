import { world, MolangVariableMap } from "@minecraft/server";

world.afterEvents.entityHealthChanged.subscribe(
    (onHitEvent) => {
        if(onHitEvent.entity.typeId === "edge:training_target"){
            let oldHP = onHitEvent.oldValue;
            let newHP = onHitEvent.newValue;
            let entityLocation = onHitEvent.entity.getHeadLocation();
            entityLocation.y = entityLocation.y + 0.6;
            const molang = new MolangVariableMap();
            molang.setColorRGB("variable.color", {
                red: Math.random(),
                green: Math.random(),
                blue: Math.random()
            });
            onHitEvent.entity.runCommand(`say Damage = §c${oldHP-newHP}§f\nCurrent HP = §a${newHP}`);
            onHitEvent.entity.runCommand(`playanimation @s hurt`);
            onHitEvent.entity.dimension.spawnParticle("minecraft:colored_flame_particle", entityLocation, molang);
        }
    }
);