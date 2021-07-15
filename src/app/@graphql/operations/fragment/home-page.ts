import gql from "graphql-tag";

export const HOME_PAGE = gql`query shopProductsPlatforms(
  $showPlatform: Boolean = false,
  $showInfo: Boolean = false,
){

  carousel: shopProductsOfferLast(
    itemsPage: 6,
    topPrice: 30,
    random:true
  )
  {
    status
    message
    info @include(if: $showInfo){
      page
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
      platform @include(if: $showPlatform){
        id
        name
        slug
        active
      }
    }
  }

  pc: shopProductsPlatforms(
    page: 1,
    itemsPage: 4,
    #platform: $platform,
    platform: ["4"]
    random: true)
  {
    status
    message
    info @include(if: $showInfo){
      page
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
      platform @include(if: $showPlatform){
        id
        name
        slug
        active
      }
    }
  }
  ps4: shopProductsPlatforms(
    page: 1,
    itemsPage: 4,
    #platform: $platform,
    platform: ["18"]
    random: true)
  {
    status
    message
    info @include(if: $showInfo){
      page
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
      platform @include(if: $showPlatform){
        id
        name
        slug
        active
      }
    }
  }


  topPrice35: shopProductsOfferLast(
    itemsPage: 4,
    topPrice: 35,
    random:true
  )
  {
    status
    message
    info @include(if: $showInfo){
      page
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
      platform @include(if: $showPlatform){
        id
        name
        slug
        active
      }
    }
  }

}
`;
