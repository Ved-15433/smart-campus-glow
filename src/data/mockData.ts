export interface ScheduleItem {
  time: string;
  subject: string;
  room: string;
  professor: string;
}

export interface DiningItem {
  meal: string;
  items: string[];
  time: string;
  location: string;
}

export interface LibraryService {
  service: string;
  availability: string;
  description: string;
}

export interface FacilityStatus {
  name: string;
  status: 'open' | 'closed' | 'busy';
  hours: string;
  capacity?: string;
}

export const mockSchedule: Record<string, ScheduleItem[]> = {
  monday: [
    { time: '9:00 AM', subject: 'Computer Science 101', room: 'CS-201', professor: 'Dr. Smith' },
    { time: '11:00 AM', subject: 'Mathematics', room: 'MATH-105', professor: 'Prof. Johnson' },
    { time: '2:00 PM', subject: 'Physics Lab', room: 'PHY-LAB-1', professor: 'Dr. Wilson' },
  ],
  tuesday: [
    { time: '10:00 AM', subject: 'Data Structures', room: 'CS-203', professor: 'Dr. Brown' },
    { time: '1:00 PM', subject: 'English Literature', room: 'ENG-101', professor: 'Prof. Davis' },
    { time: '3:00 PM', subject: 'Chemistry', room: 'CHEM-201', professor: 'Dr. Miller' },
  ],
  // Add more days as needed
};

export const mockDiningMenu: DiningItem[] = [
  {
    meal: 'Breakfast',
    time: '7:00 AM - 10:00 AM',
    location: 'Main Cafeteria',
    items: ['Pancakes', 'Scrambled Eggs', 'Fresh Fruit', 'Coffee', 'Orange Juice']
  },
  {
    meal: 'Lunch',
    time: '11:30 AM - 2:30 PM',
    location: 'Main Cafeteria',
    items: ['Grilled Chicken', 'Vegetarian Pasta', 'Garden Salad', 'Soup of the Day', 'Dessert']
  },
  {
    meal: 'Dinner',
    time: '5:00 PM - 8:00 PM',
    location: 'Main Cafeteria',
    items: ['Pizza', 'Stir Fry', 'Rice Bowl', 'Side Vegetables', 'Ice Cream']
  }
];

export const mockLibraryServices: LibraryService[] = [
  { service: 'Book Checkout', availability: '24/7 (Self-service kiosks)', description: 'Borrow books using your student ID' },
  { service: 'Study Rooms', availability: 'Available', description: '12 group study rooms, book online' },
  { service: 'Computer Lab', availability: 'Open', description: '50 computers available for student use' },
  { service: 'Printing Services', availability: 'Available', description: 'Print, copy, and scan documents' },
  { service: 'Research Help', availability: 'Mon-Fri 9AM-5PM', description: 'Librarian assistance for research projects' }
];

export const mockFacilities: FacilityStatus[] = [
  { name: 'Gym', status: 'open', hours: '6:00 AM - 10:00 PM', capacity: '85% full' },
  { name: 'Swimming Pool', status: 'open', hours: '6:00 AM - 9:00 PM', capacity: '12 lanes available' },
  { name: 'Tennis Courts', status: 'open', hours: '7:00 AM - 8:00 PM', capacity: '3/6 courts free' },
  { name: 'Basketball Court', status: 'busy', hours: '24/7', capacity: 'Tournament in progress' },
  { name: 'Student Lounge', status: 'open', hours: '24/7', capacity: 'Moderate occupancy' }
];

export const aiResponses = {
  greeting: "Hey there! 👋 I'm your Smart Campus Assistant. I can help you with class schedules, dining info, library services, admin procedures, and campus facilities. What would you like to know?",
  
  schedule: (day?: string) => {
    const today = day || 'monday';
    const todaySchedule = mockSchedule[today.toLowerCase()] || [];
    
    if (todaySchedule.length === 0) {
      return `No classes scheduled for ${day || 'today'}. Enjoy your free day! 🎉`;
    }
    
    return `Here's your schedule for ${day || 'today'}:\n\n${todaySchedule.map(item => 
      `📚 ${item.time} - ${item.subject}\n📍 Room: ${item.room}\n👨‍🏫 ${item.professor}\n`
    ).join('\n')}`;
  },
  
  dining: () => {
    return `Today's dining options:\n\n${mockDiningMenu.map(meal => 
      `🍽️ **${meal.meal}** (${meal.time})\n📍 ${meal.location}\n🥘 ${meal.items.join(', ')}\n`
    ).join('\n')}`;
  },
  
  library: () => {
    return `Library services available:\n\n${mockLibraryServices.map(service => 
      `📚 **${service.service}**\n⏰ ${service.availability}\n💡 ${service.description}\n`
    ).join('\n')}`;
  },
  
  facilities: () => {
    return `Campus facilities status:\n\n${mockFacilities.map(facility => {
      const statusEmoji = facility.status === 'open' ? '🟢' : facility.status === 'busy' ? '🟡' : '🔴';
      return `${statusEmoji} **${facility.name}**\n⏰ ${facility.hours}\n📊 ${facility.capacity}\n`;
    }).join('\n')}`;
  },
  
  admin: () => {
    return `🏢 **Administrative Procedures**\n\n1️⃣ **Course Registration**\n   • Log into student portal\n   • Select semester\n   • Choose courses\n   • Submit for approval\n\n2️⃣ **Fee Payment**\n   • Access billing section\n   • Select payment method\n   • Confirm transaction\n\n3️⃣ **Document Requests**\n   • Visit registrar office\n   • Fill request form\n   • Pay processing fee\n   • Collect in 3-5 days`;
  },
  
  fallback: "I'm not sure about that specific request, but I can help you with:\n• 📅 Class schedules\n• 🍴 Dining menus\n• 📚 Library services\n• 🏢 Administrative procedures\n• 🏋️ Campus facilities\n\nTry asking about any of these topics!"
};