import { useTheme } from "styled-components";
import { Container } from "./styles";
import { IInputProps, Icon, Input } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useTheme as Theme } from "../../../hooks/useTheme";

interface SearchInputProps {
  title?: string;
  config?: IInputProps;
  onClear?: (value: string) => void;
  flex?: number;
}

export function SearchInput({
  title,
  config,
  onClear,
  flex = 1,
}: SearchInputProps) {
  const theme = useTheme();
  const { isDark } = Theme();

  return (
    <Container flex={flex}>
      <Input
        borderColor={isDark ? theme.colors.black : theme.colors.white}
        backgroundColor={isDark ? theme.colors.black : theme.colors.white}
        color={theme.colors.text}
        borderRadius={10}
        height={12}
        fontSize={14}
        placeholder={`Buscar ${title}`}
        InputLeftElement={<Icon as={<Ionicons name="search" />} ml="3" />}
        InputRightElement={
          onClear ? (
            <Icon
              as={<Ionicons name="close" />}
              ml="3"
              right={3}
              onPress={() => onClear("")}
            />
          ) : undefined
        }
        {...config}
      />
    </Container>
  );
}
