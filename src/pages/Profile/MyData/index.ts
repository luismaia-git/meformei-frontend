import { UseUser } from 'react';
import { useTheme, useUser } from "../../../hooks/useTheme";

export function ProfileMyData() {
  const { theme, toggleColorMode } = useTheme();
  const { deleteUser, loading } = useUser();
}