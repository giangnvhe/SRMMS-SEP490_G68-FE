import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";
import socket from "~/common/const/mockSocket";

export interface BookingRequest {
  nameBooking?: string;
  phoneBooking?: string;
  dayBooking?: moment.Moment;
  hourBooking?: moment.Moment;
  numberOfPeople?: number;
}

interface BookingResponse {
  success: boolean;
  message: string;
}

export const Booking = async (
  data: BookingRequest
): Promise<AxiosResponse<BookingResponse>> => {
  const formattedData = {
    ...data,
    dayBooking: data.dayBooking?.format("YYYY-MM-DD"),
    hourBooking: data.hourBooking?.format("HH:mm"),
  };
  const result = await axiosInstance.post(
    getApi("api", "booking/Create"),
    formattedData
  );

  if (result.data) {
    socket.emit("newBooking", data);
  }

  return result;
};

export interface BookingData {
  bookingId: number;
  dayBooking: string;
  hourBooking: string;
  numberOfPeople: number;
  nameBooking: string;
  phoneBooking: string;
  shift: string;
  statusId: number;
  statusName: string;
}

export interface BookingDataResponse {
  data: {
    pageNumber: number;
    pageSize: number;
    totalBookings: number;
    bookings: BookingData[];
  };
}

export interface FormFields {
  bookingDate: string;
  pageNumber: number;
  pageSize: number;
  totalBookings: number;
  statusId: number;
}

export const getListBooking = async (
  params: FormFields
): Promise<BookingDataResponse> => {
  const result = await axiosInstance.get(getApi("api", "booking/getList"), {
    params,
  });
  return result;
};

export interface StatusRequest {
  statusId: number;
}

export const ChangeStatusBooking = async (
  id: number,
  request: StatusRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `booking/updateStatus/${id}`),
    request
  );
  return response.data;
};

export interface SetTableForBookingRequest {
  tableId: number;
  bookingId: number;
}

export const SetBookingForTable = async (
  data: SetTableForBookingRequest
): Promise<AxiosResponse<BookingResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "table/SetBookingForTable"),
    data
  );

  return result;
};

export interface DataBookingResponse {
  data: {
    bookings: BookingData[];
  };
}

export const getBookingList = async (): Promise<DataBookingResponse> => {
  const result = await axiosInstance.get(getApi("api", "booking/getList"));
  return result;
};
