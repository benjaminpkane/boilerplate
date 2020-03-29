import json

from graphene_django.utils.testing import GraphQLTestCase
from gql.schema import schema


class TestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def test_query(self):
        response = self.query(
            """
            query {
              games {
                edges {
                  node {
                    id
                    name
                    home
                    away
                    createdAt
                  }
                }
              }
            }
            """,
            op_name="game",
        )
        self.assertResponseNoErrors(response)
