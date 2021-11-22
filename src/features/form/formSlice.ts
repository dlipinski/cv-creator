import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import firebase from "firebase";

export interface Meta {
  name: string;
  language: "en_EN" | "pl_PL";
}

export interface Personal {
  firstName: string;
  lastName: string;
  position: string;
  photo: string;
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

export interface Document {
  meta: Meta;
  personal: Personal;
  contact: Contact;
  summary: string;
  skills: Skill[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  interests: string;
}

export interface Documents {
  saving?: boolean;
  active: number;
  array: Document[];
}

export const initialState: Documents = {
  active: 0,
  array: [
    {
      meta: {
        name: "Document 1",
        language: "en_EN",
      },
      personal: {
        firstName: "",
        lastName: "",
        position: "",
        photo: "",
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
      interests: "",
    },
  ],
};

interface PayLoad {
  displayName?: string | null;
  email?: string | null;
}
export const fetchDocuments = createAsyncThunk<Documents, PayLoad>(
  "fetchDocuments",
  async (_, thunkAPI: any) => {
    try {
      const currentUser: any = firebase.auth().currentUser;
      const userRef = firebase.database().ref(`/users/${currentUser.uid}`);
      const snapshot = await userRef.once("value");
      return snapshot.val();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const saveDocuments = createAsyncThunk<Documents, Documents>(
  "saveDocuments",
  async (documents, thunkAPI: any) => {
    console.log("saving");
    try {
      const currentUser: any = firebase.auth().currentUser;
      const userRef = firebase.database().ref(`/users/${currentUser.uid}`);
      await userRef.set(documents);
      console.log("Saved");
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addNewDocument: (state) => {
      state.array.push({
        meta: {
          name: "Document",
          language: "en_EN",
        },
        personal: {
          firstName: "",
          lastName: "",
          position: "",
          photo: "",
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
        interests: "",
      });
      state.active = state.array.length - 1;
    },
    removeDocument: (state) => {
      const documentIndex = state.active;
      state.array = state.array.filter((_, i) => i !== documentIndex);
      if (state.array.length === 0) {
        state.array.push({
          meta: {
            name: "Document",
            language: "en_EN",
          },
          personal: {
            firstName: "",
            lastName: "",
            position: "",
            photo: "",
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
          interests: "",
        });
      }
    },
    setActive: (state, action: PayloadAction<number>) => {
      state.active = action.payload;
    },
    updatePersonal: (state, action: PayloadAction<Personal>) => {
      state.array[state.active].personal = action.payload;
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.array[state.active].contact = action.payload;
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.array[state.active].summary = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      console.log(state.array, state.active);
      state.array[state.active].personal.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.array[state.active].personal.lastName = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.array[state.active].personal.position = action.payload;
    },
    setPhoto: (state, action: PayloadAction<string>) => {
      state.array[state.active].personal.photo = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.array[state.active].contact.phone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.array[state.active].contact.email = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.array[state.active].contact.address = action.payload;
    },
    setSummary: (state, action: PayloadAction<string>) => {
      state.array[state.active].summary = action.payload;
    },
    addNewSkill: (state) => {
      const newSkill = {
        name: "",
        details: "",
      };
      state.array[state.active].skills.push(newSkill);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      const skillIndex = action.payload;
      state.array[state.active].skills = state.array[
        state.active
      ].skills.filter((_, i) => i !== skillIndex);
      if (state.array[state.active].skills.length === 0) {
        state.array[state.active].skills.push({
          name: "",
          details: "",
        });
      }
    },
    moveSkillUp: (state, action: PayloadAction<number>) => {
      try {
        const skillIndex = action.payload;
        const tempSkill = state.array[state.active].skills[skillIndex - 1];
        state.array[state.active].skills[skillIndex - 1] =
          state.array[state.active].skills[skillIndex];
        state.array[state.active].skills[skillIndex] = tempSkill;
      } catch (e) {
        console.log(e);
      }
    },
    moveSkillDown: (state, action: PayloadAction<number>) => {
      try {
        const skillIndex = action.payload;
        const tempSkill = state.array[state.active].skills[skillIndex + 1];
        state.array[state.active].skills[skillIndex + 1] =
          state.array[state.active].skills[skillIndex];
        state.array[state.active].skills[skillIndex] = tempSkill;
      } catch (e) {
        console.log(e);
      }
    },
    setSkillName: (
      state,
      action: PayloadAction<{ skillIndex: number; value: string }>
    ) => {
      const { skillIndex, value } = action.payload;
      state.array[state.active].skills[skillIndex].name = value;
    },
    setSkillDetails: (
      state,
      action: PayloadAction<{ skillIndex: number; value: string }>
    ) => {
      const { skillIndex, value } = action.payload;
      state.array[state.active].skills[skillIndex].details = value;
    },
    addNewLanguage: (state) => {
      const newLanguage = {
        name: "",
        details: "",
      };
      state.array[state.active].languages.push(newLanguage);
    },
    removeLanguage: (state, action: PayloadAction<number>) => {
      const languageIndex = action.payload;
      state.array[state.active].languages = state.array[
        state.active
      ].languages.filter((_, i) => i !== languageIndex);
      if (state.array[state.active].languages.length === 0) {
        state.array[state.active].languages.push({
          name: "",
          details: "",
        });
      }
    },
    moveLanguageUp: (state, action: PayloadAction<number>) => {
      try {
        const languageIndex = action.payload;
        const tempLanguage =
          state.array[state.active].languages[languageIndex - 1];
        state.array[state.active].languages[languageIndex - 1] =
          state.array[state.active].languages[languageIndex];
        state.array[state.active].languages[languageIndex] = tempLanguage;
      } catch (e) {
        console.log(e);
      }
    },
    moveLanguageDown: (state, action: PayloadAction<number>) => {
      try {
        const languageIndex = action.payload;
        const tempLanguage =
          state.array[state.active].languages[languageIndex + 1];
        state.array[state.active].languages[languageIndex + 1] =
          state.array[state.active].languages[languageIndex];
        state.array[state.active].languages[languageIndex] = tempLanguage;
      } catch (e) {
        console.log(e);
      }
    },
    setLanguageName: (
      state,
      action: PayloadAction<{ languageIndex: number; value: string }>
    ) => {
      const { languageIndex, value } = action.payload;
      state.array[state.active].languages[languageIndex].name = value;
    },
    setLanguageDetails: (
      state,
      action: PayloadAction<{ languageIndex: number; value: string }>
    ) => {
      const { languageIndex, value } = action.payload;
      state.array[state.active].languages[languageIndex].details = value;
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
      state.array[state.active].experience.push(newExperience);
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      const experienceIndex = action.payload;
      state.array[state.active].experience = state.array[
        state.active
      ].experience.filter((_, i) => i !== experienceIndex);
      if (state.array[state.active].experience.length === 0) {
        state.array[state.active].experience.push({
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
        const tempExperience =
          state.array[state.active].experience[experienceIndex - 1];
        state.array[state.active].experience[experienceIndex - 1] =
          state.array[state.active].experience[experienceIndex];
        state.array[state.active].experience[experienceIndex] = tempExperience;
      } catch (e) {
        console.log(e);
      }
    },
    moveExperienceDown: (state, action: PayloadAction<number>) => {
      try {
        const experienceIndex = action.payload;
        const tempExperience =
          state.array[state.active].experience[experienceIndex + 1];
        state.array[state.active].experience[experienceIndex + 1] =
          state.array[state.active].experience[experienceIndex];
        state.array[state.active].experience[experienceIndex] = tempExperience;
      } catch (e) {
        console.log(e);
      }
    },
    setExperienceFrom: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.array[state.active].experience[experienceIndex].from = value;
    },
    setExperienceTo: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.array[state.active].experience[experienceIndex].to = value;
    },
    setExperienceName: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.array[state.active].experience[experienceIndex].name = value;
    },
    setExperienceDetails: (
      state,
      action: PayloadAction<{ experienceIndex: number; value: string }>
    ) => {
      const { experienceIndex, value } = action.payload;
      state.array[state.active].experience[experienceIndex].details = value;
    },
    addNewDuty: (state, action) => {
      const experienceIndex = action.payload;
      const newDuty = {
        name: "",
        details: "",
      };
      state.array[state.active].experience[experienceIndex].duties.push(
        newDuty
      );
    },
    removeDuty: (
      state,
      action: PayloadAction<{ experienceIndex: number; dutyIndex: number }>
    ) => {
      const { experienceIndex, dutyIndex } = action.payload;
      state.array[state.active].experience[experienceIndex].duties =
        state.array[state.active].experience[experienceIndex].duties.filter(
          (_, i) => i !== dutyIndex
        );
      if (
        state.array[state.active].experience[experienceIndex].duties.length ===
        0
      ) {
        state.array[state.active].experience[experienceIndex].duties.push({
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
          state.array[state.active].experience[experienceIndex].duties[
            dutyIndex - 1
          ];
        state.array[state.active].experience[experienceIndex].duties[
          dutyIndex - 1
        ] =
          state.array[state.active].experience[experienceIndex].duties[
            dutyIndex
          ];
        state.array[state.active].experience[experienceIndex].duties[
          dutyIndex
        ] = tempDuty;
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
          state.array[state.active].experience[experienceIndex].duties[
            dutyIndex + 1
          ];
        state.array[state.active].experience[experienceIndex].duties[
          dutyIndex + 1
        ] =
          state.array[state.active].experience[experienceIndex].duties[
            dutyIndex
          ];
        state.array[state.active].experience[experienceIndex].duties[
          dutyIndex
        ] = tempDuty;
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
      state.array[state.active].experience[experienceIndex].duties[
        dutyIndex
      ].name = value;
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
      state.array[state.active].experience[experienceIndex].duties[
        dutyIndex
      ].details = value;
    },
    addNewEducation: (state) => {
      const newEducation = {
        from: "",
        to: "",
        name: "",
        details: "",
      };
      state.array[state.active].education.push(newEducation);
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      const educationIndex = action.payload;
      state.array[state.active].education = state.array[
        state.active
      ].education.filter((_, i) => i !== educationIndex);
      if (state.array[state.active].education.length === 0) {
        state.array[state.active].education.push({
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
        const tempEducation =
          state.array[state.active].education[educationIndex - 1];
        state.array[state.active].education[educationIndex - 1] =
          state.array[state.active].education[educationIndex];
        state.array[state.active].education[educationIndex] = tempEducation;
      } catch (e) {
        console.log(e);
      }
    },
    moveEducationDown: (state, action: PayloadAction<number>) => {
      try {
        const educationIndex = action.payload;
        const tempEducation =
          state.array[state.active].education[educationIndex + 1];
        state.array[state.active].education[educationIndex + 1] =
          state.array[state.active].education[educationIndex];
        state.array[state.active].education[educationIndex] = tempEducation;
      } catch (e) {
        console.log(e);
      }
    },
    setEducationFrom: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.array[state.active].education[educationIndex].from = value;
    },
    setEducationTo: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.array[state.active].education[educationIndex].to = value;
    },
    setEducationName: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.array[state.active].education[educationIndex].name = value;
    },
    setEducationDetails: (
      state,
      action: PayloadAction<{ educationIndex: number; value: string }>
    ) => {
      const { educationIndex, value } = action.payload;
      state.array[state.active].education[educationIndex].details = value;
    },
    setInterests: (state, action: PayloadAction<string>) => {
      state.array[state.active].interests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDocuments.fulfilled,
      (state, action: PayloadAction<Documents>) => {
        state.active = action.payload.active;
        state.array = action.payload.array;
      }
    );
    builder.addCase(saveDocuments.pending, (state) => {
      state.saving = true;
    });
    builder.addCase(saveDocuments.fulfilled, (state) => {
      state.saving = false;
    }); //saveDocuments
  },
});

export const selectActiveDocument = (state: RootState) =>
  state.form.array[state.form.active];

export const {
  addNewDocument,
  removeDocument,
  setActive,
  setFirstName,
  setLastName,
  setPosition,
  setPhoto,
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
} = documentSlice.actions;

export default documentSlice.reducer;
