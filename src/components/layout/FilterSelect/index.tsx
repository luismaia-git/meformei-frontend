import { Entypo } from "@expo/vector-icons";
import { ISelectProps, Icon, Select, View } from "native-base";
import { useTheme } from "../../../hooks/useTheme";
import { SelectComponent } from "./styles";

const { Item } = Select;

interface SelectProps {
  label: string;
  value: string;
}

interface FilterSelectProps {
  values: SelectProps[];
  config?: ISelectProps;
  flex?: number;
}

export function FilterSelect({ values, config, flex = 1 }: FilterSelectProps) {
  const { theme, isDark } = useTheme();

  return (
    <View flex={flex}>
      <SelectComponent
        borderColor={isDark ? theme.colors.black : theme.colors.white}
        backgroundColor={isDark ? theme.colors.black : theme.colors.white}
        color={theme.colors.text}
        borderRadius={10}
        height={12}
        fontSize={14}
        fontFamily="Nunito-Regular"
        {...config}
        dropdownIcon={
          <Icon as={Entypo} name="chevron-down" size={4} right={2} />
        }
      >
        
        {values.map((value) => {
          return <Item key={value.label} {...value} />;
        })}
      </SelectComponent>
    </View>
  );
}
