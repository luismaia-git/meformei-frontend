import { H5 } from "../../shared/text";
import {
  Container,
  Content,
  DisciplineItem,
  InputSelectedItem,
  DisciplineTitle,
} from "./styles";
import { TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { FormControl, HStack, Icon, VStack, useTheme as useNativeTheme } from "native-base";
import { useTheme } from "../../../hooks/useTheme";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { CustomizedStatusBar } from "../CustomizedStatusBar";
import { SearchInput } from "../SearchInput";
const { Label } = FormControl;

interface Discipline {
  name: string;
  cod: string;
  id: number;
}

interface SelectMultipleProps {
  label?: String,
  data: Discipline[];
  onChange: () => void;
  defaultValue?: Discipline[];
  placeholder?: string;
  max?: number;
}

export function SelectMultiple({
  label,
  data,
  onChange,
  defaultValue = [],
  placeholder,
  max,
}: SelectMultipleProps) {
  const { colors } = useNativeTheme();
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Discipline[]>([]);
  const [list, setList] = useState<Discipline[]>([]);
  const [selected, setSelected] = useState<Discipline[]>([]);

  const [temporarySelected, setTemporarySelected] = useState<Discipline[]>([]);

  const [isFull, setIsFull] = useState(false);

  const [termo, setTermo] = useState("");

  useEffect(() => {
    if (defaultValue.length > 0) setSelected(defaultValue);
    setOptions(data);
    setList(data);
  }, [data]);

  useEffect(() => {
    if (max) setIsFull(temporarySelected.length >= max);
  }, [temporarySelected]);

  const toggleSelection = (item: Discipline) => {
    const index = temporarySelected.findIndex((i) => i.id === item.id);
    const arrSelected = [...temporarySelected];
    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      if (max) {
        if (arrSelected.length < max) arrSelected.push(item);
      } else arrSelected.push(item);
    }
    setTemporarySelected(arrSelected);
  };

  function renderItem(item: Discipline, index: number) {
    const selectedItem =
      temporarySelected.findIndex((i) => i.id === item.id) !== -1;
    return (
      <TouchableOpacity
        key={index}
        disabled={!selectedItem && isFull}
        style={{
          opacity: !selectedItem && isFull ? 0.4 : 1,
        }}
        onPress={() => toggleSelection(item)}
      >
        <DisciplineItem space={3}>
          {!selectedItem ? (
            <Icon
              as={AntDesign}
              name="pluscircle"
              color={theme.colors.green[500]}
              size={22}
            />
          ) : (
            <Icon
              as={AntDesign}
              name="minuscircle"
              color={theme.colors.red[500]}
              size={22}
            />
          )}

          <DisciplineTitle>
            <H5 color={theme.colors.trueGray[400]} numberOfLines={1}>
              #{item.cod}
            </H5>
            <H5 color={theme.colors.text} numberOfLines={1}>
              {item.name}
            </H5>
          </DisciplineTitle>
        </DisciplineItem>
      </TouchableOpacity>
    );
  }

  const filteredList =
    termo.length > 0
      ? options.filter(
        (d) =>
          d.name.toLowerCase().includes(termo.toLowerCase()) ||
          d.cod.toLowerCase().includes(termo.toLowerCase())
      )
      : [];

  return (
    <VStack>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14} style={{ paddingBottom: 10 }}>
          {label}
        </H5>
      </Label>
      <Container onPress={() => setVisible(true)}>
        {selected.length > 0 ? (
          <VStack space={2}>
            {selected.map((item, i) => {
              return (
                <InputSelectedItem key={i}>
                  <H5 numberOfLines={1}>{item.name}</H5>
                </InputSelectedItem>
              );
            })}
          </VStack>
        ) : (
          <H5 color={colors.trueGray[400]} weight="regular">
            {placeholder}
          </H5>
        )}

        <Icon as={Entypo} name="chevron-down" size={4} />
        <Modal
          animationType="slide"
          onRequestClose={() => setVisible(false)}
          visible={visible}
        >
          <CustomizedStatusBar />
          <Content>
            <VStack space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    setTemporarySelected(selected);
                  }}
                >
                  <Icon
                    as={Entypo}
                    name="chevron-left"
                    color={theme.colors.text}
                    size={36}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    setSelected(temporarySelected);
                  }}
                >
                  <H5 color={theme.colors.primary[500]} size={22}>
                    OK
                  </H5>
                </TouchableOpacity>
              </HStack>
              <SearchInput
                title="disciplina"
                config={{ defaultValue: termo, onChangeText: setTermo }}
                onClear={setTermo}
              />
            </VStack>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 65 }}
              keyExtractor={(_, i) => `${i}`}
              data={termo.length > 0 ? filteredList : list}
              renderItem={({ item, index }) => renderItem(item, index)}
            />
          </Content>
        </Modal>
      </Container>
    </VStack>
  );
}
