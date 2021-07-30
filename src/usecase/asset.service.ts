import { StatusCodes } from 'http-status-codes';
import { ErrorCodes } from '../consts/errors.enum';
import { AssetMongoError, AssetServiceError } from '../errors/asset.error';
import { AssetDetailsEntity, AssetEntity } from '../types/entities/asset.entity';
import { IAssetRepo } from '../types/repositories/asset.repo';

export class AssetService {
  assetRepo: IAssetRepo;

  constructor(assetRepo: IAssetRepo) {
    this.assetRepo = assetRepo;
  }

  async getAssets(): Promise<AssetEntity[]> {
    console.log('get assets');

    try {
      const assets = await this.assetRepo.searchAssets(
        { deleted: false, enabled: true },
        { enabled: 0, deleted: 0, createdAt: 0, updatedAt: 0 }
      );

      return assets.map((asset) => ({ ticker: asset.ticker, name: asset.name }));
    } catch (error) {
      console.error('get assets failed', error.message);

      if (error instanceof AssetMongoError) {
        throw error;
      }

      throw new AssetServiceError(
        error.message,
        ErrorCodes.SERVICE_SEARCH_ASSETS_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAssetDetailsByTickers(tickers: string[]): Promise<{ [ticker: string]: AssetDetailsEntity }> {
    console.log('get asset details by tickers', tickers);

    try {
      const assets = await this.assetRepo.searchAssets(
        { deleted: false, enabled: true, ticker: { $in: tickers } },
        { enabled: 0, deleted: 0, createdAt: 0, updatedAt: 0 }
      );

      const resp: { [ticker: string]: AssetDetailsEntity } = {};

      assets.forEach((asset) => {
        resp[asset.ticker] = asset;
      });

      return resp;
    } catch (error) {
      console.error('get asset details by tickers failed', error.message);

      if (error instanceof AssetMongoError) {
        throw error;
      }

      throw new AssetServiceError(
        error.message,
        ErrorCodes.SERVICE_SEARCH_ASSETS_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
