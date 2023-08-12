import { Icon } from "native-base";
import { Container } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface CreateButtonProps {
  onPress: () => void;
}

export function CreateButton({onPress}: CreateButtonProps) {
  return (
    <Container onPress={onPress} height={12}>
      <Icon as={MaterialIcons} name="add" size="6" color="#ffffff" />
    </Container>
  );
}
