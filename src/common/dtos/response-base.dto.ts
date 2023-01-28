import { Expose } from 'class-transformer';

export abstract class ResponseBaseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt: string;
}
