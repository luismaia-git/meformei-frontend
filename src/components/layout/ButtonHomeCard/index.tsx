import { useTheme } from "styled-components";
import { H5 } from "../../shared/text";
import { Container } from "./styles";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableHighlight, View } from "react-native";
import { IIconProps, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

interface ButtonHomeCardProps {
  name: string;
  icon?: IIconProps;
  nameIcon?: string;
  linkTo?: string;
  hasIcon?: boolean;
  root?: string;
  onPress?: (fn: () => void) => void;
  isLoading?: boolean;
}

export function ButtonHomeCard({
  name,
  icon,
  nameIcon,
  linkTo,
  hasIcon = true,
  root,
  onPress,
  isLoading = false,
}: ButtonHomeCardProps) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  return (
    <TouchableHighlight
      disabled={isLoading}
      style={{ borderRadius: 10, margin: 0 }}
      activeOpacity={0.9}
      onPress={() => {
        if (onPress) onPress(() => navigation.navigate(root));
        else navigation.navigate(root, { screen: linkTo });
      }}
    >
      <Container>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          {hasIcon && (
            <Icon
              as={icon}
              name={nameIcon}
              size={5}
              color={theme.colors.primary[500]}
            />
          )}
          <H5>{name}</H5>
        </View>
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.text} style={{height: 25}} />
        ) : (
          <MaterialCommunityIcons
            name="chevron-right"
            size={25}
            color={theme.colors.text}
          />
        )}
      </Container>
    </TouchableHighlight>
  );
}
