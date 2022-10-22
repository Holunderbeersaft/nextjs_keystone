import { createClient, dedupExchange, cacheExchange, fetchExchange } from "urql";
import { makeOperation } from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import { authExchange } from '@urql/exchange-auth';



const url = "http://localhost:3000/api/graphql/";

export const client = createClient({
  url,
  exchanges: [devtoolsExchange, dedupExchange, cacheExchange,
    authExchange({
      addAuthToOperation: ({ authState, operation }: any) => {
        if (!authState || !authState.token) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`,
            },
          },
        });
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'FORBIDDEN',
        );
      },
      getAuth: async ({ authState }) => {
        if (!authState && typeof window !== "undefined") {
          const token = localStorage.getItem('token');
          // console.log("token", token)

          if (token) {
            return { token };
          }
          return null;
        }

        //logout();

        return null;
      },
    }),
    fetchExchange
  ]
});