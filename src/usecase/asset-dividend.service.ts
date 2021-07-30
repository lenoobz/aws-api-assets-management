import { StatusCodes } from 'http-status-codes';
import { ErrorCodes } from '../consts/errors.enum';
import { AssetDividendMongoError, AssetDividendServiceError } from '../errors/asset-dividend.error';
import { AssetDividendEntity } from '../types/entities/asset-dividend.entity';
import { IAssetDividendRepo } from '../types/repositories/asset-dividend.repo';

export class AssetDividendService {
  assetDividendRepo: IAssetDividendRepo;

  constructor(assetDividendRepo: IAssetDividendRepo) {
    this.assetDividendRepo = assetDividendRepo;
  }

  async getAssetDividendsByTickers(tickers: string[]): Promise<AssetDividendEntity[]> {
    console.log('get asset dividends by tickers', tickers);

    try {
      return await this.assetDividendRepo.searchAssetDividends(
        { deleted: false, enabled: true, ticker: { $in: tickers } },
        { enabled: 0, deleted: 0, createdAt: 0, updatedAt: 0 }
      );
    } catch (error) {
      console.error('get asset dividends by tickers failed', error.message);

      if (error instanceof AssetDividendMongoError) {
        throw error;
      }

      throw new AssetDividendServiceError(
        error.message,
        ErrorCodes.SERVICE_SEARCH_ASSET_DIVIDENDS_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
