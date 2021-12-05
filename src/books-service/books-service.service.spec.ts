import { Test, TestingModule } from '@nestjs/testing';
import { BooksServiceService } from './books-service.service';

describe('BooksServiceService', () => {
  let service: BooksServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksServiceService],
    }).compile();

    service = module.get<BooksServiceService>(BooksServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
