import React, {Fragment} from 'react';
import { useQuery, gql } from '@apollo/client';

const COUNTRIES_QUERY = gql`
  query Counties($code: String) {
    countries(filter: {continent: {eq: $code}}) {
      name
      code
      capital
      continent {
        name
      }
    }
}
`;

export const App = () => {
  const continentCode = 'EU';
  const { data, loading } = useQuery(COUNTRIES_QUERY, { variables: {
    code: continentCode
  }});

  if (loading) {
    return <p>Loading...</p>
  }  
  const { countries } = data;

  return (
    <Fragment>
      {countries.map((c, i) => (
        <div key={i}>
          {c.name} - {c.capital} - {c.continent.name}
        </div>
        ))
      }
    </Fragment>)
  };
