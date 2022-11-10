export type TUtils = {
  id: number;
  name: string;
};

export type TCar = {
  id: number;
  vinCode: string;
  stateNumber: string;
  manufacturedAt: number;
  mileage: number;
  price: number;
  photos: Array<{ id: number; photoLink: string }>;
  isPromoted: boolean;
  isExchanged: boolean;
  isVerified: boolean;
  totalLikes: number | null;
  totalViews: number | null;
  brand: TUtils;
  model: TUtils;
  engine: TUtils;
  user: TUtils & {
    email: string;
    phone: string | null;
    authority: 'USER' | 'ADMIN' | 'MANAGER';
  };
  drive: TUtils;
  gearbox: TUtils;
  body: TUtils;
  report: {
    isMatchCharacteristics: boolean;
    totalOwners: number;
    isBanned: boolean;
    isWanted: boolean;
    totalMileageRecords: number;
  };
  city: TUtils;
  description: string;
  totalOwners: number;
  todayLikes: number | null;
  todayViews: number | null;
};

export type TCarsResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<TCar>;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};
