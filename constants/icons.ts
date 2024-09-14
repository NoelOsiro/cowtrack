import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons,FontAwesome6 } from '@expo/vector-icons';

// Navigation Icons
const navigationIcons = {
  back_arrow: { name: 'arrow-back', library: Ionicons },
  down_arrow: { name: 'arrow-down', library: FontAwesome },
  up_arrow: { name: 'arrow-up', library: FontAwesome },
  menu: { name: 'menu', library: Ionicons },
  pin: { name: 'location-pin', library: MaterialIcons },
};

// Animal Icons
export const animalIcons = {
  cow: { name: 'cow', library: MaterialCommunityIcons },
  goat: { name: 'goat', library: MaterialIcons },
  bull: { name: 'cow', library: FontAwesome6 },
  sheep: { name: 'sheep', library: MaterialCommunityIcons },
  chicken: { name: 'kiwi-bird', library: FontAwesome6 },
  pig: { name: 'pig', library: MaterialCommunityIcons },
  bee: { name: 'bug', library: MaterialCommunityIcons  },
  horse: { name: 'horse', library: MaterialCommunityIcons },
};

// Utility Icons
const utilityIcons = {
  baby_car: { name: 'baby-carriage', library: FontAwesome },
  calendar: { name: 'calendar', library: FontAwesome },
  chart: { name: 'bar-chart', library: Ionicons },
  education: { name: 'school', library: MaterialIcons },
  food: { name: 'fast-food', library: Ionicons },
  healthcare: { name: 'local-hospital', library: MaterialIcons },
  more: { name: 'more-horiz', library: MaterialIcons },
};

// Transport Icons
const transportIcons = {
  transport: { name: 'bus', library: FontAwesome },
  sports: { name: 'ios-football', library: Ionicons },
};

// Export all groups together
export const icons = {
  ...navigationIcons,
  ...animalIcons,
  ...utilityIcons,
  ...transportIcons,
};
