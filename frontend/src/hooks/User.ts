import { useAuthenticateQuery } from '../generated/graphql'

export const useUser = () => {
  const [{ data }, fetchAuth] = useAuthenticateQuery();
  console.log("hook", data)
  // const [{ data }] = useAuthenticateQuery();
  let id = data?.authenticatedItem?.id
  return id;
}