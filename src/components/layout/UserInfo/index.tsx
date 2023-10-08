import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "styled-components";
import { useUser } from "../../../hooks/useUser";
import { H5, Subtitle } from "../../shared/text";
import { Container, Row } from "./styles";

export function UserInfo() {
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
              Curso:{" "}
              <H5 color={theme.colors.white} weight="regular">
                {user?.user.courseName}
              </H5>
            </H5>
            <H5 color={theme.colors.white}>
              Ano de entrada:{" "}
              <H5 color={theme.colors.white} weight="regular">
                {user?.user.enrollmentYear}.{user?.user.enrollmentSemester}
              </H5>
            </H5>
          </View>
        </View>
      </Row>
    </Container>
  );
}
