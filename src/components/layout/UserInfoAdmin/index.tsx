import { View } from "react-native";
import { Container, Row } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { H5, Subtitle } from "../../shared/text";
import { useTheme } from "styled-components";
import { useUser } from "../../../hooks/useUser";

export function UserInfoAdmin() {
  const theme = useTheme();
  const { user } = useUser();
  return (
    <Container>
      <Row>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color={theme.colors.white}
          />
          <View>
            <Subtitle color={theme.colors.white}>
              {user?.user.name} {user?.user.lastname}
            </Subtitle>
            <H5 color={theme.colors.white}>
              <H5 color={theme.colors.white} weight="regular">
                Adminstrador
              </H5>
            </H5>
          </View>
        </View>
      </Row>
    </Container>
  );
}
