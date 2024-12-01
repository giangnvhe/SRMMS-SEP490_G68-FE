import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface FeedbackData {
  feedbackId: number;
  feedback1: string;
  rateStar: number;
  accId: number;
  accountFullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackResponse {
  feedbacks: FeedbackData[];
}

export const getListFeedbacks = async (): Promise<FeedbackResponse> => {
  try {
    const response: AxiosResponse<FeedbackResponse> =
      await axiosInstance.get<FeedbackResponse>(getApi("api", "feedbacks"));
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

export interface FeedbackRequest {
  feedback1: string;
  rateStar: number;
  accId: number;
}

export const postFeedback = async (
  data: FeedbackRequest
): Promise<AxiosResponse<FeedbackResponse>> => {
  const result = await axiosInstance.post(getApi("api", "feedbacks"), data);
  return result;
};
