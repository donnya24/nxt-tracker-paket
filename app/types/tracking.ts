export interface TrackingHistory {
  date: string;
  desc: string;
}

export interface TrackingResponse {
  status: number;
  message: string;
  data: {
    summary: {
      awb: string;
      courier: string;
      service: string;
      status: string;
      date: string;
      desc: string;
      amount: string;
      weight: string;
    };
    detail: {
      origin: string;
      destination: string;
      shipper: string;
      receiver: string;
    };
    history: TrackingHistory[];
  } | null;
}

export interface Courier {
  code: string;
  name: string;
  website: string;
  phone: string;
}
