import { defaultTheme, ThemeProvider as EvThemeProvider } from "evergreen-ui";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const draft: any = defaultTheme;
  const theme = {
    ...draft,
    components: {
      ...draft.components,
      Button: {
        ...draft.components.Button,
        baseStyle: {
          ...draft.components.Button.baseStyle,
          borderRadius: 8,
        },
      },
      Input: {
        ...draft.components.Input,
        baseStyle: {
          ...draft.components.Input.baseStyle,
          borderRadius: 8,
        },
      },
      Select: {
        ...draft.components.Select,
        baseStyle: {
          ...draft.components.Select.baseStyle,
          borderRadius: 8,
        },
      },
    },
  };

  return <EvThemeProvider value={theme}>{children}</EvThemeProvider>;
};

export default ThemeProvider;
