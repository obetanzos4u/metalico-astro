const domain = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = import.meta.env.PUBLIC_SHOPIFY_API_VERSION;

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch({ query, variables = {} }) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
}

// 👇 Esta es la función que agregamos
export async function getProducts(first = 20) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges { node { url altText } }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            variants(first: 5) {
              edges { node { id title availableForSale } }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch({ query, variables: { first } });
  return data.products.edges.map(edge => edge.node);
}

export async function getCollectionProducts(collectionId, first = 50) {
  const query = `
    query getCollectionProducts($id: ID!, $first: Int!) {
      collection(id: $id) {
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              availableForSale
              images(first: 1) {
                edges { node { url altText } }
              }
              priceRange {
                minVariantPrice { amount currencyCode }
                maxVariantPrice { amount currencyCode }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    sku
                    quantityAvailable
                    compareAtPrice { amount currencyCode }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const gid = `gid://shopify/Collection/${collectionId}`;
  const data = await shopifyFetch({ query, variables: { id: gid, first } });
  return data.collection?.products.edges.map(edge => edge.node) ?? [];
}