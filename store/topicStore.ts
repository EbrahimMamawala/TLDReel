import { create } from "zustand";

interface TopicStore {
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  selectedTopics: [],
  setSelectedTopics: (topics) => set({ selectedTopics: topics }),
}));
