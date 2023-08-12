import { useMemo, useState, useEffect } from "react";
import { Courses } from "University";
import { university } from "../service/universities";

export function useCourses(id: string) {
  const [data, setData] = useState<Courses>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  useEffect(() => {
    setLoading(true);
    university
      .getCourses(id)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return useMemo(() => ({ loading, error, data }), [loading, error, data]);
}
