import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile, ThesisMilestones, MilestoneTask } from "@/types";

interface ResearchStore {
  locale: "en" | "bn";
  setLocale: (locale: "en" | "bn") => void;

  userProfile: UserProfile;
  setUserProfile: (profile: Partial<UserProfile>) => void;

  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;

  showOnboardingModal: boolean;
  setShowOnboardingModal: (val: boolean) => void;

  currentRoadmap: ThesisMilestones | null;
  setCurrentRoadmap: (roadmap: ThesisMilestones | null) => void;
  toggleTaskCompletion: (taskId: string) => void;

  savedPaperIds: string[];
  toggleSavePaper: (id: string) => void;

  resetToDefault: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  institution: "",
  facultyCode: "FSIT",
  departmentCode: "CSE",
  primaryInterest: "",
  academicLevel: "undergraduate",
  skillLevel: "beginner",
  targetTimelineWeeks: 16,
  customDepartmentName: "",
  customFacultyName: ""
};

export const useResearchStore = create<ResearchStore>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),

      userProfile: DEFAULT_PROFILE,
      setUserProfile: (profileUpdates) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profileUpdates }
        })),

      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (hasCompletedOnboarding) =>
        set({ hasCompletedOnboarding }),

      showOnboardingModal: false,
      setShowOnboardingModal: (showOnboardingModal) =>
        set({ showOnboardingModal }),

      currentRoadmap: null,
      setCurrentRoadmap: (currentRoadmap) => set({ currentRoadmap }),

      toggleTaskCompletion: (taskId: string) => {
        const roadmap = get().currentRoadmap;
        if (!roadmap) return;

        const updatedTasks = roadmap.tasks.map((task: MilestoneTask) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        set({
          currentRoadmap: {
            ...roadmap,
            tasks: updatedTasks,
            updatedAt: new Date().toISOString()
          }
        });
      },

      savedPaperIds: [],
      toggleSavePaper: (id: string) => {
        const current = get().savedPaperIds;
        if (current.includes(id)) {
          set({ savedPaperIds: current.filter((item) => item !== id) });
        } else {
          set({ savedPaperIds: [...current, id] });
        }
      },

      resetToDefault: () =>
        set({
          userProfile: DEFAULT_PROFILE,
          currentRoadmap: null,
          hasCompletedOnboarding: false,
          savedPaperIds: []
        })
    }),
    {
      name: "researchforge_v1_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
        userProfile: state.userProfile,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        currentRoadmap: state.currentRoadmap,
        savedPaperIds: state.savedPaperIds
      })
    }
  )
);
