import { University } from "University";
import { useEffect, useMemo, useState } from "react";
import { university } from "../service/universities";

export function useUniversity(state?: string, city?: string) {
  const [data, setData] = useState<University[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  useEffect(() => {
    setLoading(true);
    university
      .getUniversities({ state, city })
      .then((res) => setData(res.universities))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [state, city]);

  return useMemo(() => ({ loading, error, data }), [loading, error, data]);
}
