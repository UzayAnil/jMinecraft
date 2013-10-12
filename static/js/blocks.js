function Block(name, textures, icon) {

	this.name = name;
	this.textures = textures !== undefined ? textures : [];
	this.icon = icon !== undefined ? icon : null;
	
	if (textures.length === 1)
		this.face = {
			top:    textures[0],
			bottom: textures[0],
			front:  textures[0],
			back:   textures[0],
			left:   textures[0],
			right:  textures[0]
		};
	
	else if (textures.length === 3)
		this.face = {
			top:    textures[0],
			bottom: textures[1],
			front:  textures[2],
			back:   textures[2],
			left:   textures[2],
			right:  textures[2]
		};
}
	
/*
var DataAPI = 'http://mc-data.jit.su/blocks/?callback=handleBlockData';
var blockInformationJsonp = document.createElement('script');
blockInformationJsonp.setAttribute('src', DataAPI);
blockInformationJsonp.setAttribute('id', 'jsonp');
var documentHead = document.getElementsByTagName('head')[0];
documentHead.appendChild(blockInformationJsonp);
*/

var blocks = [
	'air',             // 0
	'stone.png',       // 1
	'grass',           // 2
	'dirt.png',        // 3
	'cobblestone.png', // 4
	[
		'planks_oak.png',
		'planks_spruce.png',
		'planks_birch.png',
		'planks_jungle.png'
	],                   // 5
	[
		'sapling_oak.png',
		'sapling_spruce.png',
		'sapling_birch.png',
		'sapling_jungle.png'
	],                   // 6
	'bedrock.png',       // 7
	'water_flowing.png', // 8
	'water_still.png',   // 9
	'lava_flow.png',     // 10
	'lava_still.png',    // 11
	'sand.png',          // 12
	'gravel.png',        // 13
	'gold_ore.png',      // 14
	'iron_ore.png',      // 15
	'coal_ore.png',      // 16
	[                    // 17
		'log_oak.png',
		'log_birch_top.png',
		'log_jungle.png',
		'log_jungle_top.png',
		'log_oak.png',
		'log_oak_top.png',
		'log_spruce.png',
		'log_spruce_top.png'
	],
	[                    // 18
		'leaves_birch.png', // each of these also has an opaque version
		'leaves_oak.png',
		'leaves_spruce.png',
		'leaves_jungle.png'
	],
	'sponge.png',            // 19
	'glass.png',             // 20
	'lapis_ore.png',         // 21
	'lapis_block.png',       // 22
	[                        // 23
		'dispenser_front_horizontal.png',
		'dispenser_front_vertical.png',
		'piston_bottom.png' //??????????????
	],
	[
		'sandstone_top.png', // 24
		'sandstone.png',
		'sandstone_bottom.png',
		'sandstone_normal.png'
	],
	'noteblock.png',         // 25
	[                        // 26
		'bed_feet_end.png',
		'bed_feet_side.png',
		'bed_feet_top.png',
		'bed_head_end.png',
		'bed_head_side.png',
		'bed_head_top.png'
	],
	['rail_golden.png', 'rail_golden_powered.png'], // 27
	'rail_detector.png',     // 28
	[                        // 29
		'piston_bottom.png',
		'piston_side.png',
		'piston_inner.png',
		'piston_top_sticky.png'
	],
	'web.png', // 30
	'tallgrass.png', // 31
	'deadbush.png',  // 32
	null,
	null,
	null,
	null,
	'flower_dandelion.png', // 37 dandelion
	'flower_rose.png', // 38 poppy
	null,
	null,
	null,
	null,
	['stone_slab_top.png', 'stone_slab_side.png'], // 43 stone slab
	['stone_slab_top.png', 'stone_slab_side.png'], // 44 stone slab
	null,
	null,
	null,
	null,
	'obsidian.png', // 49 obsidian
	'torch_on.png', // 50 TODO
	null,
	null,
	'planks_oak.png', // 53 oak wood stairs TODO
	null,
	null,
	null,
	null,
	null,
	null,
	'farmland_dry.png',// 60 farmland
	['furnace_front_off.png', 'furnace_side.png', 'furnace_top.png'], // 61 furnace off
	null,
	null,
	null,
	null,
	'rail_normal.png', // 66 rail
	null,
	null,
	null,
	null, // 70
	null,
	null,
	'redstone_ore.png', // 73 redstone ore
	null,
	null, // 75
	null,
	null,
	null,
	null,
	null, // 80
	null, 
	null,
	null, // 83 sugar cane
	null, // 84
	'planks_oak.png', // 85 fence
	null,
	null,
	'soul_sand.png', // 88 soul sand
	null,
	null, // 90
	null,
	null,
	null,
	null,
	null, // 95
	null,
	null,
	'stonebrick.png', // 98
	null,
	null, // 100
	null,
	null,
	null,
	null,
	null, // 105
	'vine.png',
	'planks_oak.png', // 107 fence gate TODO
	'brick.png',      // 108 brick stairs TODO
	'stonebrick.png', // 109 stone brick stairs TODO
	null, // 110
	null,
	'nether_brick.png', // 112 nether brick
	null,
	'nether_brick.png', // 114 nether brick stairs TODO
	['nether_wart_stage_0.png', 'nether_wart_stage_1.png', 'nether_wart_stage_2.png'], // 115 nether wart
	null,
	null,
	null,
	null,
	null, // 120
	null,
	null,
	null,
	null,
	null, // 125
	null,
	null,
	null,
	null,
	null, // 130
	null,
	null,
	null,
	null,
	null, // 135
	null,
	null,
	null,
	'cobblestone.png', // 139 cobblestone wall TODO
	null,
	null,
	'potatoes_stage_3.png' // TODO
]

function handleBlockData(data) {
	for (item in data.items) {
		if (item >= 256)
			break;
		console.log(item);
		console.log(data.items[item].item_name.toUpperCase().replace(/\s/g, '_').replace(/[()]/g, ''))
	}
}

/*
anvil_base.png
anvil_top_damaged_0.png
anvil_top_damaged_1.png
anvil_top_damaged_2.png
beacon.png
bed_feet_end.png
bed_feet_side.png
bed_feet_top.png
bed_head_end.png
bed_head_side.png
bed_head_top.png
bedrock.png
bookshelf.png
brewing_stand_base.png
brewing_stand.png
brick.png
cactus_bottom.png
cactus_side.png
cactus_top.png
cake_bottom.png
cake_inner.png
cake_side.png
cake_top.png
carrots_stage_0.png
carrots_stage_1.png
carrots_stage_2.png
carrots_stage_3.png
cauldron_bottom.png
cauldron_inner.png
cauldron_side.png
cauldron_top.png
clay.png
coal_block.png
coal_ore.png
cobblestone_mossy.png
cobblestone.png
cocoa_stage_0.png
cocoa_stage_1.png
cocoa_stage_2.png
command_block.png
comparator_off.png
comparator_on.png
crafting_table_front.png
crafting_table_side.png
crafting_table_top.png
daylight_detector_side.png
daylight_detector_top.png
deadbush.png
destroy_stage_0.png
destroy_stage_1.png
destroy_stage_2.png
destroy_stage_3.png
destroy_stage_4.png
destroy_stage_5.png
destroy_stage_6.png
destroy_stage_7.png
destroy_stage_8.png
destroy_stage_9.png
diamond_block.png
diamond_ore.png
dirt.png
dispenser_front_horizontal.png
dispenser_front_vertical.png
door_iron_lower.png
door_iron_upper.png
door_wood_lower.png
door_wood_upper.png
dragon_egg.png
dropper_front_horizontal.png
dropper_front_vertical.png
emerald_block.png
emerald_ore.png
enchanting_table_bottom.png
enchanting_table_side.png
enchanting_table_top.png
endframe_eye.png
endframe_side.png
endframe_top.png
end_stone.png
farmland_dry.png
farmland_wet.png
fern.png
fire_layer_0.png
fire_layer_0.png.mcmeta
fire_layer_1.png
fire_layer_1.png.mcmeta
flower_dandelion.png
flower_pot.png
flower_rose.png
furnace_front_off.png
furnace_front_on.png
furnace_side.png
furnace_top.png
glass_pane_top.png
glass.png
glowstone.png
gold_block.png
gold_ore.png
grass_side_overlay.png
grass_side.png
grass_side_snowed.png
grass_top.png
gravel.png
hardened_clay.png
hardened_clay_stained_black.png
hardened_clay_stained_blue.png
hardened_clay_stained_brown.png
hardened_clay_stained_cyan.png
hardened_clay_stained_gray.png
hardened_clay_stained_green.png
hardened_clay_stained_light_blue.png
hardened_clay_stained_lime.png
hardened_clay_stained_magenta.png
hardened_clay_stained_orange.png
hardened_clay_stained_pink.png
hardened_clay_stained_purple.png
hardened_clay_stained_red.png
hardened_clay_stained_silver.png
hardened_clay_stained_white.png
hardened_clay_stained_yellow.png
hay_block_side.png
hay_block_top.png
hopper_inside.png
hopper_outside.png
hopper_top.png
ice.png
iron_bars.png
iron_block.png
iron_ore.png
itemframe_background.png
jukebox_side.png
jukebox_top.png
ladder.png
lapis_block.png
lapis_ore.png
lava_flow.png
lava_flow.png.mcmeta
lava_still.png
lava_still.png.mcmeta
leaves_birch_opaque.png
leaves_birch.png
leaves_jungle_opaque.png
leaves_jungle.png
leaves_oak_opaque.png
leaves_oak.png
leaves_spruce_opaque.png
leaves_spruce.png
lever.png
log_birch.png
log_birch_top.png
log_jungle.png
log_jungle_top.png
log_oak.png
log_oak_top.png
log_spruce.png
log_spruce_top.png
melon_side.png
melon_stem_connected.png
melon_stem_disconnected.png
melon_top.png
mob_spawner.png
mushroom_block_inside.png
mushroom_block_skin_brown.png
mushroom_block_skin_red.png
mushroom_block_skin_stem.png
mushroom_brown.png
mushroom_red.png
mycelium_side.png
mycelium_top.png
nether_brick.png
netherrack.png
nether_wart_stage_0.png
nether_wart_stage_1.png
nether_wart_stage_2.png
noteblock.png
obsidian.png
piston_bottom.png
piston_inner.png
piston_side.png
piston_top_normal.png
piston_top_sticky.png
planks_birch.png
planks_jungle.png
planks_oak.png
planks_spruce.png
portal.png
portal.png.mcmeta
potatoes_stage_0.png
potatoes_stage_1.png
potatoes_stage_2.png
potatoes_stage_3.png
pumpkin_face_off.png
pumpkin_face_on.png
pumpkin_side.png
pumpkin_stem_connected.png
pumpkin_stem_disconnected.png
pumpkin_top.png
quartz_block_bottom.png
quartz_block_chiseled.png
quartz_block_chiseled_top.png
quartz_block_lines.png
quartz_block_lines_top.png
quartz_block_side.png
quartz_block_top.png
quartz_ore.png
rail_activator.png
rail_activator_powered.png
rail_detector.png
rail_detector_powered.png
rail_golden.png
rail_golden_powered.png
rail_normal.png
rail_normal_turned.png
redstone_block.png
redstone_dust_cross_overlay.png
redstone_dust_cross.png
redstone_dust_line_overlay.png
redstone_dust_line.png
redstone_lamp_off.png
redstone_lamp_on.png
redstone_ore.png
redstone_torch_off.png
redstone_torch_on.png
reeds.png
repeater_off.png
repeater_on.png
sand.png
sandstone_bottom.png
sandstone_carved.png
sandstone_normal.png
sandstone_smooth.png
sandstone_top.png
sapling_birch.png
sapling_jungle.png
sapling_oak.png
sapling_spruce.png
snow.png
soul_sand.png
sponge.png
stonebrick_carved.png
stonebrick_cracked.png
stonebrick_mossy.png
stonebrick.png
stone.png
stone_slab_side.png
stone_slab_top.png
tallgrass.png
tnt_bottom.png
tnt_side.png
tnt_top.png
torch_on.png
trapdoor.png
trip_wire.png
trip_wire_source.png
vine.png
water_flow.png
water_flow.png.mcmeta
waterlily.png
water_still.png
water_still.png.mcmeta
web.png
wheat_stage_0.png
wheat_stage_1.png
wheat_stage_2.png
wheat_stage_3.png
wheat_stage_4.png
wheat_stage_5.png
wheat_stage_6.png
wheat_stage_7.png
wool_colored_black.png
wool_colored_blue.png
wool_colored_brown.png
wool_colored_cyan.png
wool_colored_gray.png
wool_colored_green.png
wool_colored_light_blue.png
wool_colored_lime.png
wool_colored_magenta.png
wool_colored_orange.png
wool_colored_pink.png
wool_colored_purple.png
wool_colored_red.png
wool_colored_silver.png
wool_colored_white.png
wool_colored_yellow.png
*/
