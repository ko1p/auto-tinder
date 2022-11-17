export interface ICoupon {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  price: number;
  description: string;
  companyOwner: string;
  photoLink: string;
  Date: [moment.Moment, moment.Moment];
}
