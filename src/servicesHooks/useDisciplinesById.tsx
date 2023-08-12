import { useMemo, useState, useEffect } from "react";
import { university } from "../service/universities";
import { DisciplineData } from "Discipline";
import { useUser } from "../hooks/useUser";

export function useDisciplinesById(ids: string[]) {
  const [data, setData] = useState<{ disciplines: DisciplineData[] }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    university
      .getDisciplinesByCod(
        user?.user.university.id,
        user?.user.curriculumId,
        ids
      )
      .then((res) => {
          console.log(res);
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return useMemo(() => ({ loading, error, data }), [loading, error, data]);
}
