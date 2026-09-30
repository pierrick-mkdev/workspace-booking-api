export interface Reservation {
  id: number;
  resourceId: number;
  resourceName: string;
  userEmail: string;
  startTime: string;
  endTime: string;
}

export type CreateReservationData = Omit<Reservation, 'id' | 'resourceName'>;
