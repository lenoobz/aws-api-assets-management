import { StatusCodes } from 'http-status-codes';
import { ErrorCodes } from '../consts/errors.enum';
import { AssetCountryMongoError, AssetCountryServiceError } from '../errors/asset-country.error';
import { CountryDetails } from '../types/entities/asset-country.entity';
import { IAssetCountryRepo } from '../types/repositories/asset-country.repo';

export class AssetCountryService {
  assetCountryRepo: IAssetCountryRepo;

  constructor(assetCountryRepo: IAssetCountryRepo) {
    this.assetCountryRepo = assetCountryRepo;
  }

  async getAssetCountriesByTickers(tickers: string[]): Promise<{ [ticker: string]: CountryDetails[] }> {
    console.log('get asset countries by tickers', tickers);

    try {
      const countries = await this.assetCountryRepo.searchAssetCountries(
        { deleted: false, enabled: true, ticker: { $in: tickers } },
        { enabled: 0, deleted: 0, createdAt: 0, updatedAt: 0 }
      );

      const resp: { [ticker: string]: CountryDetails[] } = {};

      countries.forEach((country) => {
        resp[country.ticker] = country.countries;
      });

      return resp;
    } catch (error) {
      console.error('get asset countries by tickers failed', error.message);

      if (error instanceof AssetCountryMongoError) {
        throw error;
      }

      throw new AssetCountryServiceError(
        error.message,
        ErrorCodes.SERVICE_SEARCH_ASSET_COUNTRIES_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
