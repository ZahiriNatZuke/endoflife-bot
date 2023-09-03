import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AllDetailsObj, CycleDetailsObj } from './types';

const API_ENDPOINT = 'https://endoflife.date/api';

@Injectable()
export class BotService {
  constructor(private readonly httpService: HttpService) {}

  allProducts(): Observable<AxiosResponse<string[]>> {
    return this.httpService.get(`${API_ENDPOINT}/all.json`);
  }

  allDetails(product: string): Observable<AxiosResponse<AllDetailsObj[]>> {
    return this.httpService.get(`${API_ENDPOINT}/${product}.json`);
  }

  cycleDetailOfProduct(
    product: string,
    cycle: string,
  ): Observable<AxiosResponse<CycleDetailsObj[]>> {
    return this.httpService.get(`${API_ENDPOINT}/${product}/${cycle}.json`);
  }
}
