import { icons, COLORS } from "@/constants";
import { animalIcons } from "./icons";

// Constants
export const healthyStatus = "H" as const;
export const sickStatus = "S" as const;
// Organizing and typing the icons

// Types
export type HealthStatusType = typeof healthyStatus | typeof sickStatus;
// Typing for Animal Icons
export type AnimalIconType = typeof animalIcons[keyof typeof animalIcons];

export type Animal = {
    id: number;
    animalType: string;  // e.g., "Cow", "Chicken"
    breed: string;
    count: number;
    location: string;
    healthStatus: HealthStatusType;
};

export type Category = {
    id: string;
    name: string;
    breeds: string[];
    icon: AnimalIconType;
    color: typeof COLORS[keyof typeof COLORS];
    animals: Animal[];
};

// Data
export const categoriesData: Category[] = [
    // {
    //     id: 1,
    //     name: "Cow",
    //     icon: icons.cow,
    //     color: COLORS.purple,
    //     breeds: ["Angus", "Holstein", "Hereford", "Jersey"],
    //     animals: [
    //         { id: 1, animalType: "Cow", breed: "Angus", count: 50, location: "Field A", healthStatus: healthyStatus },
    //         { id: 2, animalType: "Cow", breed: "Holstein", count: 30, location: "Field B", healthStatus: sickStatus },
    //     ],
    // },
    // {
    //     id: 2,
    //     name: "Chicken",
    //     icon: icons.chicken,
    //     color: COLORS.peach,
    //     breeds: ["Broiler", "Layer"],
    //     animals: [
    //         { id: 3, animalType: "Chicken", breed: "Broiler", count: 200, location: "Chicken Coop 1", healthStatus: healthyStatus },
    //         { id: 4, animalType: "Chicken", breed: "Layer", count: 150, location: "Chicken Coop 2", healthStatus: healthyStatus },
    //         { id: 5, animalType: "Chicken", breed: "Broiler", count: 100, location: "Chicken Coop 3", healthStatus: sickStatus },
    //         { id: 6, animalType: "Chicken", breed: "Layer", count: 80, location: "Chicken Coop 4", healthStatus: healthyStatus },
    //         { id: 7, animalType: "Chicken", breed: "Broiler", count: 60, location: "Chicken Coop 5", healthStatus: healthyStatus },
    //     ],
    // },
    // {
    //     id: 3,
    //     name: "Sheep",
    //     icon: icons.sheep,
    //     color: COLORS.darkgreen,
    //     breeds: ["Merino", "Suffolk", "Dorper", "Southdown"],
    //     animals: [
    //         { id: 5, animalType: "Sheep", breed: "Merino", count: 75, location: "Field C", healthStatus: healthyStatus },
    //         { id: 6, animalType: "Sheep", breed: "Suffolk", count: 60, location: "Field D", healthStatus: sickStatus },
    //     ],
    // },
    // {
    //     id: 4,
    //     name: "Pigs",
    //     icon: icons.pig,
    //     color: COLORS.blue,
    //     breeds: ["Yorkshire", "Duroc", "Hampshire", "Berkshire"],
    //     animals: [
    //         { id: 7, animalType: "Pigs", breed: "Yorkshire", count: 40, location: "Pigsty A", healthStatus: healthyStatus },
    //         { id: 8, animalType: "Pigs", breed: "Duroc", count: 35, location: "Pigsty B", healthStatus: healthyStatus },
    //     ],
    // },
    // {
    //     id: 5,
    //     name: "Goats",
    //     icon: icons.goat,
    //     color: COLORS.red,
    //     breeds: ["Boer", "Alpine", "Nubian", "LaMancha"],
    //     animals: [
    //         { id: 9, animalType: "Goats", breed: "Boer", count: 20, location: "Barn A", healthStatus: healthyStatus },
    //         { id: 10, animalType: "Goats", breed: "Alpine", count: 18, location: "Barn B", healthStatus: sickStatus },
    //     ],
    // },
    // {
    //     id: 6,
    //     name: "Horses",
    //     icon: icons.food,
    //     color: COLORS.primary,
    //     breeds: ["Thoroughbred", "Quarter", "Appaloosa", "Mustang", "Arabian"],
    //     animals: [
    //         { id: 11, animalType: "Horses", breed: "Thoroughbred", count: 10, location: "Stable A", healthStatus: healthyStatus },
    //         { id: 12, animalType: "Horses", breed: "Quarter", count: 8, location: "Stable B", healthStatus: healthyStatus },
    //         { id: 13, animalType: "Horses", breed: "Appaloosa", count: 5, location: "Stable C", healthStatus: sickStatus },
    //         { id: 14, animalType: "Horses", breed: "Mustang", count: 3, location: "Stable D", healthStatus: healthyStatus },
    //         { id: 15, animalType: "Horses", breed: "Arabian", count: 2, location: "Stable E", healthStatus: healthyStatus },
    //     ],
    // },
];
