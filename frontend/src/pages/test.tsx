import type { NextPage } from 'next'
import { Page } from "../components/Page"
import { useGetUsersListQuery } from '../generated/graphql'

const Test: NextPage = () => {
  const [result] = useGetUsersListQuery();

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!data) return <div>No Data!</div>

  return (
    <Page>
      <div className="box">
        <div className='content text-center'>
          <h2 className='page-title'>GraphQL Test Page</h2>
        </div>
        <div>
          {JSON.stringify(data.users)}
          {data.users?.map((user) => <li key={user.id}>{user.name}</li>)}
        </div>
      </div>
    </Page >

  )
}

export default Test


