import { ReactNode } from "react";
import { FlatList } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export function VirtualizedScrollView({
  children,
  bgBack,
}: {
  children: ReactNode;
  bgBack?: string;
}) {
  const { theme } = useTheme();
  const bg = bgBack ?? theme.colors.background;
  return (
    <FlatList
      style={{ backgroundColor: bg, flex: 1 }}
      data={[]}
      showsVerticalScrollIndicator={false}
      keyExtractor={(e, i) => "dom" + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={() => <>{children}</>}
    />
  );
}
