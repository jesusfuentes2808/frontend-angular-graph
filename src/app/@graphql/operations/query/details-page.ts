import gql from "graphql-tag";

export const DETAILS_PAGE = gql`query DetailsPageInfo(
  $id: Int!
  $showPlatform: Boolean = true,
  $relationScreens: Boolean = true,
  $showInfo: Boolean = false,
){

  randomItems: shopProductsOfferLast(
    itemsPage: 6,
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


  details: shopProductDetails(id: $id){
    status
    message
    shopProduct {
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
        screenshoot @include(if: $relationScreens)
      }
      platform @include(if: $showPlatform){
        id
        name
        slug
        active
      }
      relationalProducts @include(if: $relationScreens){
        id
        platform{
          id
          name
        }
      }
    }
  }

}
`;
