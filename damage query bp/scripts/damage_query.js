import { world, MolangVariableMap } from "@minecraft/server";

world.afterEvents.entityHealthChanged.subscribe(
    (onHitEvent) => {
        if(onHitEvent.entity.typeId != "minecraft:player"){
            let oldHP = onHitEvent.oldValue;
            let newHP = onHitEvent.newValue;
            let damage = oldHP - newHP;
            if (damage > 0){
                let entityLocation = onHitEvent.entity.getHeadLocation();
                entityLocation.y = entityLocation.y + 0.6;

                let damage1 = damage.toFixed(1);
                let molang_middle = new MolangVariableMap();
                let damage_middle = Math.floor(damage1) % 10;
                molang_middle.setFloat("variable.dmgpoint_middle", damage_middle);

                let molang_left1 = new MolangVariableMap();
                let damage_left1 = Math.floor(damage1/10);
                molang_left1.setFloat("variable.dmgpoint_left1", damage_left1);

                let molang_right1 = new MolangVariableMap();
                let damage_right1 = (damage1*10) % 10;
                molang_right1.setFloat("variable.dmgpoint_right1", damage_right1);

                onHitEvent.entity.dimension.spawnParticle("edge:dmgpoint_particle", entityLocation, molang_middle);
                onHitEvent.entity.dimension.spawnParticle("edge:dmgpoint_particle_left1", entityLocation, molang_left1);
                onHitEvent.entity.dimension.spawnParticle("edge:dmgpoint_particle_right1", entityLocation, molang_right1);

                if (onHitEvent.entity.typeId === "edge:training_target") {
                    onHitEvent.entity.runCommand(`say Damage = §c${damage}§f\nCurrent HP = §a${newHP}`);
                    onHitEvent.entity.runCommand(`playanimation @s hurt`);
                }
            }
        }
    }
);