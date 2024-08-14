export enum STATUS_ENUM {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
  VERIFIED = 'verified',
  PENDING = 'pending',
  FAILED = 'failed',
  IN_PROGRESS = 'in progress',
  PROCESSING = 'processing',
  NA = 'N/A',

  COMPLETED = 'completed',
  ONGOING = 'ongoing',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
  PUBLISHED = 'published',
  DRAFT = 'draft',


  // RIDEBOOKED = 11, //Booked
  // DRIVERREACHED = 22, //Ongoing
  // RIDESTARTED = 33, //Ongoing
  // RIDECOMPLETED = 44, // Completed
  // RIDECANCELLED = 55, // Cancelled

  RIDEBOOKED = 'Booked', //Booked
  DRIVERREACHED = 'OnGoing', //Ongoing
  RIDESTARTED = 'OnGoing', //Ongoing
  RIDECOMPLETED = 'Completed', // Completed
  RIDECANCELLED = 'Cancelled',
}
