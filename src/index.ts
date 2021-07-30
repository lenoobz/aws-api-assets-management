import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { AssetCountryMongo } from './infra/repositories/mongodb/repos/asset-country.mongo';
import { AssetDividendMongo } from './infra/repositories/mongodb/repos/asset-dividend.mongo';
import { AssetPriceMongo } from './infra/repositories/mongodb/repos/asset-price.mongo';
import { AssetSectorMongo } from './infra/repositories/mongodb/repos/asset-sector.mongo';
import { AssetMongo } from './infra/repositories/mongodb/repos/asset.mongo';
import { AssetCountryService } from './usecase/asset-country.service';
import { AssetDividendService } from './usecase/asset-dividend.service';
import { AssetPriceService } from './usecase/asset-price.service';
import { AssetSectorService } from './usecase/asset-sector.service';
import { AssetService } from './usecase/asset.service';

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const routeKey = event.routeKey;

    if (routeKey === 'GET /v1/assets') {
      const assetMongo = new AssetMongo();
      const assetService = new AssetService(assetMongo);
      body = await assetService.getAssets();
    } else if (routeKey === 'POST /v1/assets/details') {
      const assetMongo = new AssetMongo();
      const assetService = new AssetService(assetMongo);
      body = await assetService.getAssetDetailsByTickers(JSON.parse(event.body));
    } else if (routeKey === 'POST /v1/assets/countries') {
      const assetCountryMongo = new AssetCountryMongo();
      const assetCountryService = new AssetCountryService(assetCountryMongo);
      body = await assetCountryService.getAssetCountriesByTickers(JSON.parse(event.body));
    } else if (routeKey === 'POST /v1/assets/dividends') {
      const assetDividendMongo = new AssetDividendMongo();
      const assetDividendService = new AssetDividendService(assetDividendMongo);
      body = await assetDividendService.getAssetDividendsByTickers(JSON.parse(event.body));
    } else if (routeKey === 'POST /v1/assets/prices') {
      const assetPriceMongo = new AssetPriceMongo();
      const assetPriceService = new AssetPriceService(assetPriceMongo);
      body = await assetPriceService.getAssetPricesByTickers(JSON.parse(event.body));
    } else if (routeKey === 'POST /v1/assets/sectors') {
      const assetSectorMongo = new AssetSectorMongo();
      const assetSectorService = new AssetSectorService(assetSectorMongo);
      body = await assetSectorService.getAssetSectorsByTickers(JSON.parse(event.body));
    } else {
      throw new Error(`Unsupported route: "${routeKey}"`);
    }
  } catch (error) {
    statusCode = 400;
    body = error.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
