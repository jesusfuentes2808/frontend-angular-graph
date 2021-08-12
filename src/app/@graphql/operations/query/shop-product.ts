import gql from 'graphql-tag';
import {RESULT_INFO_FRAGMENT} from '../fragment/result-info'
export const SHOP_LAST_UNITS_OFFERS = gql`
  query productoPorOfertayStock(
    $page: Int,
    $itemsPage: Int,
    $active: ActiveFilterEnum,
    $random: Boolean,
    $topPrice: Float,
    $lastUnits: Int,
    $showInfo: Boolean = false,
    $showPlatform: Boolean =true,
    $relationScreens: Boolean = false
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
      info @include(if: $showInfo) {
        ...ResultInfoObject
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
  ${RESULT_INFO_FRAGMENT}
`;

export const SHOP_PRODUCT_BY_PLATFORM = gql`
  query shopProductsPlatforms(
  $page: Int,
  $itemsPage: Int,
  $active: ActiveFilterEnum,
  $random: Boolean,
  $platform: [ID!]!,
    $showInfo: Boolean = false,
    $showPlatform: Boolean =false
) {
  shopProductsPlatforms(
    page: $page,
    itemsPage: $itemsPage,
    active: $active,
    platform: $platform,
    random: $random) {
    status
    message
    info @include(if: $showInfo) {
      ...ResultInfoObject
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
  ${RESULT_INFO_FRAGMENT}
`;


export const SHOP_PRODUCT_DETAILS = gql`
  query productDetail(
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
  ){
    shopProductDetails(id: $id){
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

export const SHOP_PRODUCT_RANDOM_ITEMS = gql `
  query itemAleatorios(
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
  ){
    randomItems: shopProductsOfferLast(itemsPage: 6, random: true) {
      status
      message
      shopProducts {
        id
        price
        stock
        productId
        product {
          screenshoot
          img
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

