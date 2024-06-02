import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { Spinner } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useDocumentGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/document/query'

export const DocumentsScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getDocuments, { loading, error, data }] = useDocumentGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getDocuments({ variables: { userId: userId } })
    }
  }, [userId, getDocuments])

  if (!data || loading || error) return <Spinner />

  return (
    <Layout>
      {data.documentGetListByUser.map(x => (
        <li key={x.id}>
          <Link to={`/documents/detail/${x.id}`}>{x.title}</Link>
        </li>
      ))}
    </Layout>
  )
}