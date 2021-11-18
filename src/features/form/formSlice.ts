import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Personal {
  firstName: string;
  lastName: string;
  position: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Skill {
  name: string;
  details: string;
}

export interface Language {
  name: string;
  details: string;
}

export interface Duty {
  name: string;
  details: string;
}

export interface Experience {
  from: string;
  to: string;
  name: string;
  details: string;
  duties: Duty[];
}

export interface Education {
  from: string;
  to: string;
  name: string;
  details: string;
}

export interface CV {
  personal: Personal;
  contact: Contact;
  summary: string;
  skills: Skill[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  interests: string;
}

const localInitialState =
  localStorage.getItem("form") !== null
    ? JSON.parse(localStorage.getItem("form") || "{}")
    : undefined;

export const initialState: CV = localInitialState || {
  personal: {
    firstName: "",
    lastName: "",
    position: "",
  },
  contact: {
    phone: "",
    email: "",
    address: "",
  },
  summary: "",
  skills: [
    {
      name: "",
      details: "",
    },
  ],
  languages: [
    {
      name: "",
      details: "",
    },
  ],
  experience: [
    {
      from: "",
      to: "",
      name: "",
      details: "",
      duties: [
        {
          name: "",
          details: "",
        },
      ],
    },
  ],
  education: [
    {
      from: "",
      to: "",
      name: "",
      details: "",
    },
  ],
  hobbys: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updatePersonal: (state, action: PayloadAction<Personal>) => {
      state.personal = action.payload;
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload;
    },
    updateSummary: (state, action: PayloadAction<string>) => {
        state.summary = action.payload;
    }
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    addNewSkill: (state) => {
      const newSkill = {
        name: "",
        details: "",
      };
      state.skills.push(newSkill);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      const skillIndex = action.payload;
      state.skills = state.skills.filter((_, i) => i !== skillIndex);
      if (state.skills.length === 0) {
        state.skills.push({
          name: "",
          details: "",
        });
      }
    },
    moveSkillUp: (state, action: PayloadAction<number>) => {
      try {
        const skillIndex = action.payload;
        const tempSkill = state.skills[skillIndex - 1];
        state.skills[skillIndex - 1] = state.skills[skillIndex];
        state.skills[skillIndex] = tempSkill;
      } catch (e) {
        console.log(e);
      }
    },
    moveSkillDown: (state, action: PayloadAction<number>) => {
      try {
        const skillIndex = action.payload;
        const tempSkill = state.skills[skillIndex + 1];
        state.skills[skillIndex + 1] = state.skills[skillIndex];
        state.skills[skillIndex] = tempSkill;
      } catch (e) {
        console.log(e);
      }
    },
    setSkillName: (
      state,
      action: PayloadAction<{ skillIndex: number; value: string }>
    ) => {
      const { skillIndex, value } = action.payload;
      state.skills[skillIndex].name = value;
    },
    setSkillDetails: (
      state,
      action: PayloadAction<{ skillIndex: number; value: string }>
    ) => {
      const { skillIndex, value } = action.payload;
      state.skills[skillIndex].details = value;
    },
    addNewLanguage: (state) => {
      const newLanguage = {
        name: "",
        details: "",
      };
      state.languages.push(newLanguage);
    },
    removeLanguage: (state, action: PayloadAction<number>) => {
      const languageIndex = action.payload;
      state.languages = state.languages.filter((_, i) => i !== languageIndex);
      if (state.languages.length === 0) {
        state.languages.push({
          name: "",
          details: "",
        });
      }
    },
    moveLanguageUp: (state, action: PayloadAction<number>) => {
      try {
        const languageIndex = action.payload;
        const tempLanguage = state.languages[languageIndex - 1];
        state.languages[languageIndex - 1] = state.languages[languageIndex];
        state.languages[languageIndex] = tempLanguage;
      } catch (e) {
        console.log(e);
      }
    },
    moveLanguageDown: (state, action: PayloadAction<number>) => {
      try {
        const languageIndex = action.payload;
        const tempLanguage = state.languages[languageIndex + 1];
        state.languages[languageIndex + 1] = state.languages[languageIndex];
        state.languages[languageIndex] = tempLanguage;
      } catch (e) {
        console.log(e);
      }
    },
    setLanguageName: (
      state,
      action: PayloadAction<{ languageIndex: number; value: string }>
    ) => {
      const { languageIndex, value } = action.payload;
      state.languages[languageIndex].name = value;
    },
    setLanguageDetails: (
      state,
      action: PayloadAction<{ languageIndex: number; value: string }>
    ) => {
      const { languageIndex, value } = action.payload;
      state.languages[languageIndex].details = value;
    },
    addNewExperience: (state) => {
      const newExperience = {
        from: "",
        to: "",
        name: "",
        details: "",
        duties: [
          {
            name: "",
            details: "",
          },
        ],
      };
      state.experience.push(newExperience);
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      const experienceIndex = action.payload;
      state.experience = state.experience.filter(
        (_, i) => i !== experienceIndex
      );
      if (state.experience.length === 0) {
        state.experience.push({
          from: "",
          to: "",
          name: "",
          details: "",
          duties: [
            {
              name: "",
              details: "",
            },
          ],
        });
      }
    },
    moveExperienceUp: (state, action: PayloadAction<number>) => {
      try {
        const experienceIndex = action.payload;
        const tempExperience = state.experience[experienceIndex - 1];
        state.experience[experienceIndex - 1] =
          state.experience[experienceIndex];
        state.experience[experienceIndex] = tempExperience;
      } catch (e) {
        console.log(e);
      }
    },
    moveExperienceDown: (state, action: PayloadAction<number>) => {
      try {
        const experienceIndex = action.payload;
        const tempExperience = state.experience[experienceIndex + 1];
        state.experience[experienceIndex + 1] =
          state.experience[experienceIndex];
        state.experience[experienceIndex] = tempExperience;
      } catch (e) {
        console.log(e);
      }
    },
    setExperienceFrom: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.experience[experienceIndex].from = value;
    },
    setExperienceTo: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.experience[experienceIndex].to = value;
    },
    setExperienceName: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.experience[experienceIndex].name = value;
    },
    setExperienceDetails: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.experience[experienceIndex].details = value;
    },
    addNewDuty: (state, action) => {
      const experienceIndex = action.payload;
      const newDuty = {
        name: "",
        details: "",
      };
      state.experience[experienceIndex].duties.push(newDuty);
    },
    removeDuty: (
      state,
      action: PayloadAction<{ experienceIndex: number; dutyIndex: number }>
    ) => {
      const { experienceIndex, dutyIndex } = action.payload;
      state.experience[experienceIndex].duties = state.experience[
        experienceIndex
      ].duties.filter((_, i) => i !== dutyIndex);
      if (state.experience[experienceIndex].duties.length === 0) {
        state.experience[experienceIndex].duties.push({
          name: "",
          details: "",
        });
      }
    },
    moveDutyUp: (
      state,
      action: PayloadAction<{ experienceIndex: number; dutyIndex: number }>
    ) => {
      try {
        const { experienceIndex, dutyIndex } = action.payload;
        const tempDuty =
          state.experience[experienceIndex].duties[dutyIndex - 1];
        state.experience[experienceIndex].duties[dutyIndex - 1] =
          state.experience[experienceIndex].duties[dutyIndex];
        state.experience[experienceIndex].duties[dutyIndex] = tempDuty;
      } catch (e) {
        console.log(e);
      }
    },
    moveDutyDown: (
      state,
      action: PayloadAction<{ experienceIndex: number; dutyIndex: number }>
    ) => {
      try {
        const { experienceIndex, dutyIndex } = action.payload;
        const tempDuty =
          state.experience[experienceIndex].duties[dutyIndex + 1];
        state.experience[experienceIndex].duties[dutyIndex + 1] =
          state.experience[experienceIndex].duties[dutyIndex];
        state.experience[experienceIndex].duties[dutyIndex] = tempDuty;
      } catch (e) {
        console.log(e);
      }
    },
    setDutyName: (
      state,
      action: PayloadAction<{
        experienceIndex: number;
        dutyIndex: number;
        value: string;
      }>
    ) => {
      const { experienceIndex, dutyIndex, value } = action.payload;
      state.experience[experienceIndex].duties[dutyIndex].name = value;
    },
    setDutyDetails: (
      state,
      action: PayloadAction<{
        experienceIndex: number;
        dutyIndex: number;
        value: string;
      }>
    ) => {
      const { experienceIndex, dutyIndex, value } = action.payload;
      state.experience[experienceIndex].duties[dutyIndex].details = value;
    },
    addNewEducation: (state) => {
      const newEducation = {
        from: "",
        to: "",
        name: "",
        details: "",
      };
      state.education.push(newEducation);
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      const educationIndex = action.payload;
      state.education = state.education.filter((_, i) => i !== educationIndex);
      if (state.education.length === 0) {
        state.education.push({
          from: "",
          to: "",
          name: "",
          details: "",
        });
      }
    },
    moveEducationUp: (state, action: PayloadAction<number>) => {
      try {
        const educationIndex = action.payload;
        const tempEducation = state.education[educationIndex - 1];
        state.education[educationIndex - 1] = state.education[educationIndex];
        state.education[educationIndex] = tempEducation;
      } catch (e) {
        console.log(e);
      }
    },
    moveEducationDown: (state, action: PayloadAction<number>) => {
      try {
        const educationIndex = action.payload;
        const tempEducation = state.education[educationIndex + 1];
        state.education[educationIndex + 1] = state.education[educationIndex];
        state.education[educationIndex] = tempEducation;
      } catch (e) {
        console.log(e);
      }
    },
    setEducationFrom: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.education[educationIndex].from = value;
    },
    setEducationTo: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.education[educationIndex].to = value;
    },
    setEducationName: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.education[educationIndex].name = value;
    },
    setEducationDetails: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.education[educationIndex].details = value;
    },
    setInterests: (state, action: PayloadAction<string>) => {
      state.interests = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setPosition,
  setPhone,
  setEmail,
  setAddress,
  setSummary,
  addNewSkill,
  removeSkill,
  moveSkillUp,
  moveSkillDown,
  setSkillName,
  setSkillDetails,
  addNewLanguage,
  removeLanguage,
  moveLanguageUp,
  moveLanguageDown,
  setLanguageName,
  setLanguageDetails,
  addNewExperience,
  removeExperience,
  moveExperienceUp,
  moveExperienceDown,
  setExperienceFrom,
  setExperienceTo,
  setExperienceName,
  setExperienceDetails,
  addNewDuty,
  removeDuty,
  moveDutyUp,
  moveDutyDown,
  setDutyName,
  setDutyDetails,
  addNewEducation,
  removeEducation,
  moveEducationUp,
  moveEducationDown,
  setEducationFrom,
  setEducationTo,
  setEducationName,
  setEducationDetails,
  setInterests,
} = formSlice.actions;

export default formSlice.reducer;
