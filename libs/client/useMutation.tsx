import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

export default function useMutation(
  url: string
): [(data: any) => void, UseMutationState] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    return;
  }
  return [mutation, { loading, data, error }];
}
