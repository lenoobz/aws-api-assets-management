export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 'API-AM-500',
  COLLECTION_NOT_FOUND = 'API-AM-1',

  // ASSET MONGO
  MONGO_SEARCH_ASSETS_FAILED = 'API-AM-100',

  // ASSET SERVICE
  SERVICE_SEARCH_ASSETS_FAILED = 'API-AM-200',

  // ASSET SECTOR MONGO
  MONGO_SEARCH_ASSET_SECTORS_FAILED = 'API-AM-300',

  // ASSET SECTOR SERVICE
  SERVICE_SEARCH_ASSET_SECTORS_FAILED = 'API-AM-400',

  // ASSET PRICE MONGO
  MONGO_SEARCH_ASSET_PRICES_FAILED = 'API-AM-500',

  // ASSET PRICE SERVICE
  SERVICE_SEARCH_ASSET_PRICES_FAILED = 'API-AM-600',

  // ASSET DIVIDEND MONGO
  MONGO_SEARCH_ASSET_DIVIDENDS_FAILED = 'API-AM-700',

  // ASSET DIVIDEND SERVICE
  SERVICE_SEARCH_ASSET_DIVIDENDS_FAILED = 'API-AM-800',

  // ASSET COUNTRY MONGO
  MONGO_SEARCH_ASSET_COUNTRIES_FAILED = 'API-AM-900',

  // ASSET COUNTRY SERVICE
  SERVICE_SEARCH_ASSET_COUNTRIES_FAILED = 'API-AM-1000'
}

export enum ErrorMessages {
  COLLECTION_NOT_FOUND = 'collection not found',
  INTERNAL_SERVER_ERROR = 'internal server error'
}
