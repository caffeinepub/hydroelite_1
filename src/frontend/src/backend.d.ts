export interface FeedbackEntry {
  name: string;
  rating: bigint;
  message: string;
  timestamp: bigint;
}
export interface backendInterface {
  submitFeedback(entry: FeedbackEntry): Promise<void>;
  getAllFeedbacks(): Promise<FeedbackEntry[]>;
}
