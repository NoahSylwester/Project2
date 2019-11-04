// if type = racial
// iterate through each creature on players side of the field
// apply spell at value (spell is phrased [type, value])
var spellCreation = [
  {
    title: "Sick Comeback",
    description: "Deal One Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "bashful_blumpkin.PNG",
    cardData: [
      {
        type: "cost",
        data: 1
      },
      {
        type: "ability",
        data: ["directDamage", 1]
      }
    ]
  },
  {
    title: "Arrow in the Shoulder",
    description: "Deal Two Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "shocked_viking.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["directDamage", 2]
      }
    ]
  },
  {
    title: "Hatchet of Death",
    description: "Deal Three Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "pristine_hatchet.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["directDamage", 3]
      }
    ]
  },
  {
    title: "Rabid Demon Strike",
    description: "Deal Four Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "winged_ghoul.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["directDamage", 4]
      }
    ]
  },
  {
    title: "Scorpion Strike",
    description: "Deal Five Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "scorpion.PNG",
    cardData: [
      {
        type: "cost",
        data: 5
      },
      {
        type: "ability",
        data: ["directDamage", 5]
      }
    ]
  },
  {
    title: "Pirate's Sword",
    description: "Deal Six Damage to Any Creature or Player",
    type: "Spell",
    imagePath: "pirates_sword.PNG",
    cardData: [
      {
        type: "cost",
        data: 6
      },
      {
        type: "ability",
        data: ["directDamage", 6]
      }
    ]
  },
  {
    title: "Pious Werewolf",
    description: "Return One Health to Any Creature or Player",
    type: "Spell",
    imagePath: "pious_werewolf.PNG",
    cardData: [
      {
        type: "cost",
        data: 1
      },
      {
        type: "ability",
        data: ["directHealing", 1]
      }
    ]
  },
  {
    title: "Reinforcements Arrive",
    description: "Return Two Health to Any Creature or Player",
    type: "Spell",
    imagePath: "tiny_armored_warrior.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["directHealing", 2]
      }
    ]
  },
  {
    title: "Sanctuary Cave",
    description: "Return Three Health to Any Creature or Player",
    type: "Spell",
    imagePath: "sanctuary_cave.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["directHealing", 3]
      }
    ]
  },
  {
    title: "Packed Yak",
    description: "Return Four Health to Any Creature or Player",
    type: "Spell",
    imagePath: "packed_yak.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["directHealing", 4]
      }
    ]
  },
  {
    title: "Bird of Paradise",
    description: "Return Five Health to Any Creature or Player",
    type: "Spell",
    imagePath: "parrot.PNG",
    cardData: [
      {
        type: "cost",
        data: 5
      },
      {
        type: "ability",
        data: ["directHealing", 5]
      }
    ]
  },
  {
    title: "Rejuvinating Pipe",
    description: "Return Six Health to Any Creature or Player",
    type: "Spell",
    imagePath: "pipe.PNG",
    cardData: [
      {
        type: "cost",
        data: 6
      },
      {
        type: "ability",
        data: ["directHealing", 6]
      }
    ]
  },
  {
    title: "Mage's Potion",
    description: "All Magic Users receive +2/+2",
    type: "Spell",
    imagePath: "mages_potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Magic"]]
      }
    ]
  },
  {
    title: "Mage's Revenge",
    description: "All Magic Users receive +3/+3",
    type: "Spell",
    imagePath: "mages_potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Magic"]]
      }
    ]
  },
  {
    title: "Human Advantage",
    description: "All Humans receive +2/+2",
    type: "Spell",
    imagePath: "warrior_male.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Human"]]
      }
    ]
  },
  {
    title: "Human Supremacy",
    description: "All Humans receive +3/+3",
    type: "Spell",
    imagePath: "scout_male.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Human"]]
      }
    ]
  },
  {
    title: "Shocked Kangaroo",
    description: "All Animals receive +2/+2",
    type: "Spell",
    imagePath: "shocked_kangaroo.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Animal"]]
      }
    ]
  },
  {
    title: "The Power of Nature",
    description: "All Animals receive +3/+3",
    type: "Spell",
    imagePath: "turned_me.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Animal"]]
      }
    ]
  },
  {
    title: "Visage of the Snake",
    description: "All Orcs receive +2/+2",
    type: "Spell",
    imagePath: "snake.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Orc"]]
      }
    ]
  },
  {
    title: "Orcish Ceremonial Mask",
    description: "All Orcs receive +3/+3",
    type: "Spell",
    imagePath: "ornamentle_mask.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Orc"]]
      }
    ]
  },
  {
    title: "Impish Cheerleader",
    description: "All Imps receive +2/+2",
    type: "Spell",
    imagePath: "screaming_grouch.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Imp"]]
      }
    ]
  },
  {
    title: "Revenge of the Imps",
    description: "All Imps receive +3/+3",
    type: "Spell",
    imagePath: "mages_potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Imp"]]
      }
    ]
  },
  {
    title: "Revenge of the Imps",
    description: "All Imps receive +3/+3",
    type: "Spell",
    imagePath: "mages_potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Imp"]]
      }
    ]
  },
  {
    title: "Hood of the Rogue",
    description: "All Rougues receive +2/+2",
    type: "Spell",
    imagePath: "rouge_hood.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Rogue"]]
      }
    ]
  },
  {
    title: "Crossbow of the Rogue",
    description: "All Rouges receive +3/+3",
    type: "Spell",
    imagePath: "worn_crossbow.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Rouge"]]
      }
    ]
  },
  {
    title: "Warrior's Potion",
    description: "All Warriors receive +2/+2",
    type: "Spell",
    imagePath: "warrior_potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Warrior"]]
      }
    ]
  },
  {
    title: "To Arms!",
    description: "All Warriors receive +3/+3",
    type: "Spell",
    imagePath: "warrior_female.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Warrior"]]
      }
    ]
  },
  {
    title: "Starving Demon",
    description: "All Demons receive +2/+2",
    type: "Spell",
    imagePath: "starving_dragon.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Demon"]]
      }
    ]
  },
  {
    title: "Rise of the Insects",
    description: "All Insects receive +2/+2",
    type: "Spell",
    imagePath: "wood_spider.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Insect"]]
      }
    ]
  },
  {
    title: "The Sluggish Alliance",
    description: "All Insects receive +3/+3",
    type: "Spell",
    imagePath: "slug.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Insect"]]
      }
    ]
  },
  {
    title: "Demon's Blade",
    description: "All Demons receive +2/+2",
    type: "Spell",
    imagePath: "dagger.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Demon"]]
      }
    ]
  },
  {
    title: "Demon's Wing Blade",
    description: "All Demons receive +3/+3",
    type: "Spell",
    imagePath: "wing_blade.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 4, "Demon"]]
      }
    ]
  },
  {
    title: "Dwarvish Mask",
    description: "All Dwarves receive +2/+2",
    type: "Spell",
    imagePath: "dwarf.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Dwarf"]]
      }
    ]
  },
  {
    title: "Dwarvish Runes",
    description: "All Dwarves receive +3/+3",
    type: "Spell",
    imagePath: "runes.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Dwarf"]]
      }
    ]
  },
  {
    title: "Skeleton's Axe",
    description: "All Familiars receive +2/+2",
    type: "Spell",
    imagePath: "axe.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Familiar"]]
      }
    ]
  },
  {
    title: "Skeleton's Seal",
    description: "All Familiars receive +3/+3",
    type: "Spell",
    imagePath: "skull.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Familiar"]]
      }
    ]
  },
  {
    title: "Goblin's Idol",
    description: "All Goblins receive +2/+2",
    type: "Spell",
    imagePath: "idol.PNG",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Imp"]]
      }
    ]
  },
  {
    title: "Goblin's Magic Skull",
    description: "All Goblins receive +3/+3",
    type: "Spell",
    imagePath: "horns.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Goblin"]]
      }
    ]
  },
  {
    title: "Elvish Amulet",
    description: "All Elves receive +2/+2",
    type: "Spell",
    imagePath: "amulet.png",
    cardData: [
      {
        type: "cost",
        data: 3
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 2, "Elf"]]
      }
    ]
  },
  {
    title: "Elvish Rune",
    description: "All Elves receive +3/+3",
    type: "Spell",
    imagePath: "rune.PNG",
    cardData: [
      {
        type: "cost",
        data: 4
      },
      {
        type: "ability",
        data: ["racial", ["increaseBoth", 3, "Elf"]]
      }
    ]
  },
  {
    title: "Ancient Artifact",
    description: "If you control magicians, do 3 damage.",
    type: "Spell",
    imagePath: "artifact.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Magic"]]
      }
    ]
  },
  {
    title: "Rogue's Offensive",
    description: "If you control Rogues, do 3 damage.",
    type: "Spell",
    imagePath: "bow.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Rogue"]]
      }
    ]
  },
  {
    title: "Orcish Signature",
    description: "If you control Orcs, do 3 damage.",
    type: "Spell",
    imagePath: "wolf.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Orc"]]
      }
    ]
  },
  {
    title: "Sign of the Spider",
    description: "If you control Insects, do 3 damage.",
    type: "Spell",
    imagePath: "spider.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Insect"]]
      }
    ]
  },
  {
    title: "Ancient Artifact",
    description: "If you control magicians, do 3 damage.",
    type: "Spell",
    imagePath: "artifact.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Magic"]]
      }
    ]
  },
  {
    title: "Legacy of the Crown",
    description: "If you control Humans, do 3 damage.",
    type: "Spell",
    imagePath: "lion.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Human"]]
      }
    ]
  },
  {
    title: "Impish Potion",
    description: "If you control Imps, do 3 damage.",
    type: "Spell",
    imagePath: "potion.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Imp"]]
      }
    ]
  },
  {
    title: "Animal Empire",
    description: "If you control Animals, do 3 damage.",
    type: "Spell",
    imagePath: "egypt.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Animal"]]
      }
    ]
  },
  {
    title: "Rise of the Warrior",
    description: "If you control Warriors, do 3 damage.",
    type: "Spell",
    imagePath: "fist.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Warrior"]]
      }
    ]
  },
  {
    title: "Possessed Orb",
    description: "If you control Familiars, do 3 damage.",
    type: "Spell",
    imagePath: "orb.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Familiar"]]
      }
    ]
  },
  {
    title: "Dwarven Hammer",
    description: "If you control Dwarves, do 3 damage.",
    type: "Spell",
    imagePath: "hammer.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Dwarf"]]
      }
    ]
  },
  {
    title: "Goblin Assault",
    description: "If you control Goblins, do 3 damage.",
    type: "Spell",
    imagePath: "artifact.PNG",
    cardData: [
      {
        type: "cost",
        data: 2
      },
      {
        type: "ability",
        data: ["racial", ["directDamage", 3, "Goblin"]]
      }
    ]
  }
]