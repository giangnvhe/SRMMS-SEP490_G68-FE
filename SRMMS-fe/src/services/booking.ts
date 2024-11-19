import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

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
  return result;
};
