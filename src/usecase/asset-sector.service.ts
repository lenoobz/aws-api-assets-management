import { StatusCodes } from 'http-status-codes';
import { ErrorCodes } from '../consts/errors.enum';
import { AssetSectorMongoError, AssetSectorServiceError } from '../errors/asset-sector.error';
import { SectorDetails } from '../types/entities/asset-sector.entity';
import { IAssetSectorRepo } from '../types/repositories/asset-sector.repo';

export class AssetSectorService {
  assetSectorRepo: IAssetSectorRepo;

  constructor(assetSectorRepo: IAssetSectorRepo) {
    this.assetSectorRepo = assetSectorRepo;
  }

  async getAssetSectorsByTickers(tickers: string[]): Promise<{ [ticker: string]: SectorDetails[] }> {
    console.log('get asset sectors by tickers', tickers);

    try {
      const sectors = await this.assetSectorRepo.searchAssetSectors(
        { deleted: false, enabled: true, ticker: { $in: tickers } },
        { enabled: 0, deleted: 0, createdAt: 0, updatedAt: 0 }
      );

      const resp: { [ticker: string]: SectorDetails[] } = {};

      sectors.forEach((sector) => {
        resp[sector.ticker] = sector.sectors;
      });

      return resp;
    } catch (error) {
      console.error('get asset sectors by tickers failed', error.message);

      if (error instanceof AssetSectorMongoError) {
        throw error;
      }

      throw new AssetSectorServiceError(
        error.message,
        ErrorCodes.SERVICE_SEARCH_ASSET_SECTORS_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
