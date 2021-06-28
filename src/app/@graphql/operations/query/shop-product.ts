import gql from 'graphql-tag';

export const SHOP_LAST_UNITS_OFFERS = gql`
  query productoPorOfertayStock(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $random: Boolean,
    $topPrice: Float,
    $lastUnits: Int
  ){
    shopProductsOfferLast(
      page: $page,
      itemsPage: $itemsPage,
      active: $active,
      lastUnits: $lastUnits,
      topPrice: $topPrice,
      random:$random){
      status
      message
      info {
        itemsPage
        total
        pages
      }
      shopProducts {
        id
        price
        stock
        productId
        platformId
        product {
          id
          name
          slug
          img
          released
          rating{
            value
            count
          }
          clip{
            clips{
              low
              medium
              full
            }
          }
          screenshoot
        }
        platform {
          id
          name
          slug
          active
        }
      }
    }
  }
`;

export const SHOP_PRODUCT_BY_PLATFORM = gql`
  query shopProductsPlatforms(
  $page: Int
  $itemsPage: Int
  $active: ActiveFilterEnum
  $random: Boolean
  $platform: ID!
) {
  shopProductsPlatforms(
    page: $page,
    itemsPage: $itemsPage,
    active: $active,
    platform: $platform,
    random: $random) {
    status
    message
    info {
      itemsPage
      total
      pages
    }
    shopProducts {
      id
      price
      stock
      productId
      platformId
      product {
        id
        name
        slug
        img
        released
        rating{
          value
          count
        }
        clip{
          clips{
            low
            medium
            full
          }
        }
        screenshoot
      }
      platform {
        id
        name
        slug
        active
      }
    }
  }
}`;
