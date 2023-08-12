import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { H5, Subtitle } from "../../shared/text";
import { BorderedContent, Container, ContainerModal, Header } from "./styles";
import { Modal, TouchableOpacity } from "react-native";
import { HStack, Icon, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { CustomizedStatusBar } from "../CustomizedStatusBar";
import { WeekSelected } from "../WeekSelected";
import { InputSelect } from "../UI";
import { zeroLeftMask } from "../../../utils/masks";

interface EditHoursModalProps {
  item: {
    name: string;
    cod: string;
  };
}

export function EditHoursModal({ item }: EditHoursModalProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const hours = new Array(15)
    .fill({
      label: 8,
      value: 8,
    })
    .map((v, i) => {
      return {
        label: `${zeroLeftMask(v.label + i)}:00`,
        value: String(v.value + i),
      };
    });

  return (
    <Container>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <H5 color={theme.colors.trueGray[400]} numberOfLines={1}>
          #{item.cod}
        </H5>
        <H5 color={theme.colors.text} numberOfLines={1}>
          {item.name}
        </H5>
      </TouchableOpacity>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <CustomizedStatusBar />

        <ContainerModal>
          <Header>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
            >
              <Icon
                as={Entypo}
                name="chevron-left"
                color={theme.colors.text}
                size={36}
              />
            </TouchableOpacity>
            <Subtitle align="left" color={theme.colors.text} size={22}>
              Editar Horário
            </Subtitle>
          </Header>
          <BorderedContent space={6} paddingBottom={30}>
            <WeekSelected />
            <InputSelect
              config={{ placeholder: "Selecione o horário" }}
              values={hours}
              label="Horário inicial"
            />
            <InputSelect
              config={{ placeholder: "Selecione o horário" }}
              values={hours}
              label="Horário final"
            />
          </BorderedContent>
        </ContainerModal>
      </Modal>
    </Container>
  );
}
