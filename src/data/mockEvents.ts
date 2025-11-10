import { LiveEvent } from '../types';

// Helper function to create a date with specific time today
const createTodayDate = (hour: number, minute: number = 0): Date => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  // If the time has already passed today, set it for tomorrow
  if (date.getTime() < Date.now()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

export const mockEvents: LiveEvent[] = [
  {
    id: 'event_3',
    name: 'Farmers Market - Mission District',
    description: 'Weekly farmers market with fresh produce, artisanal goods, and food trucks',
    latitude: 37.7594,
    longitude: -122.4194,
    startTime: createTodayDate(6, 0), // 6 AM
    endTime: createTodayDate(12, 0), // 12 PM (noon)
    category: 'market',
  },
  {
    id: 'event_1',
    name: 'SF Street Food Festival',
    description: 'Annual street food festival with 50+ vendors, live music, and activities',
    latitude: 37.7749,
    longitude: -122.4194,
    startTime: createTodayDate(14, 0), // 2 PM
    endTime: createTodayDate(20, 0), // 8 PM
    category: 'festival',
  },
  {
    id: 'event_4',
    name: 'Beach Volleyball Tournament',
    description: 'Amateur beach volleyball tournament at Ocean Beach',
    latitude: 37.7594,
    longitude: -122.5108,
    startTime: createTodayDate(17, 0), // 5 PM
    endTime: createTodayDate(20, 0), // 8 PM
    category: 'sports',
  },
  {
    id: 'event_2',
    name: 'Jazz Night at Union Square',
    description: 'Free outdoor jazz concert featuring local artists',
    latitude: 37.7879,
    longitude: -122.4075,
    startTime: createTodayDate(21, 0), // 9 PM
    endTime: createTodayDate(23, 0), // 11 PM
    category: 'concert',
  },
];

