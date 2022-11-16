export type TCoupons = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  price: number;
  description: string;
  companyOwner: string;
  photo: string;
  photoLink: string;
};

export type TCouponsResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<TCoupons>;
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
