import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Context } from 'grammy';
import { EMPTY, Observable } from 'rxjs';
import { AllDetailsObj, CycleDetailsObj } from './types';

const API_ENDPOINT = 'https://endoflife.date/api';

@Injectable()
export class BotService {

  private readonly logger = new Logger(BotService.name);

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
  ): Observable<AxiosResponse<CycleDetailsObj>> {
    return this.httpService.get(`${API_ENDPOINT}/${product}/${cycle}.json`);
  }

  handlerError(ctx: Context) {
    return (err: any) => {
      this.logger.error(err);
      ctx.reply(
        '<i>Sorry, it seems the endoflife.date service is facing problems, please try again in a while. </i>',
        {
          parse_mode: 'HTML',
        },
      ).then();
      return EMPTY;
    };
  }

  mapAllProductResponse(input: string[]): string[][] {
    return this.splitArrayChucks<string>(
      input.map((product) => this.generateProductLink(product)),
      10,
    );
  }

  mapProductResponse(
    input: AllDetailsObj[],
    product: string
  ): string[][] {
    return this.splitArrayChucks<string>(
      input.map((detail) => this.mapDetail(detail, product)),
      5,
    ).reverse();
  }

  mapProductWithCycleResponse(
    input: CycleDetailsObj,
    product: string,
    cycle: string
  ): string {
    return this.mapCycle(input, product, cycle);
  }

  private mapDetail(
    {
      cycle,
      codename,
      eol,
      lts,
      latest,
      latestReleaseDate,
      extendedSupport,
    }: AllDetailsObj,
    product: string,
  ): string {
    return [
      `<b>product:</b> <code>${product}</code>`,
      `<b>cycle:</b> <code>${cycle}</code> ${ Boolean(codename) ? `(<i>${codename}</i>)` : '' }`,
      `<b>latest:</b> <code>${latest}</code> (<i>${latestReleaseDate}</i>)    <b>LTS:</b> ${this.generateBoolOrStr(lts)}`,
      `<b>support:</b> ${this.generateBoolOrStr(eol)}    ${this.extendedSupport(extendedSupport)}`,
    ].join('\n');
  }

  private mapCycle(
    {
      codename,
      eol,
      extendedSupport,
      latest,
      latestReleaseDate,
      lts,
    }: CycleDetailsObj,
    product: string,
    cycle: string,
  ): string {
    return [
      `<b>product:</b> <code>${product}</code>`,
      `<b>cycle:</b> <code>${cycle}</code> ${ Boolean(codename) ? `(<i>${codename}</i>)` : '' }`,
      `<b>latest:</b> <code>${latest}</code> (<i>${latestReleaseDate}</i>)    <b>LTS:</b> ${this.generateBoolOrStr(lts)}`,
      `<b>support:</b> ${this.generateBoolOrStr(eol)}    ${this.extendedSupport(extendedSupport)}`,
    ].join('\n');
  }

  private splitArrayChucks<T>(array: T[], n: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += n) {
      result.push(array.slice(i, i + n).reverse());
    }
    return result;
  }

  private generateProductLink(product: string): string {
    return `<b>>  <a href="https://t.me/share/url?url=/product ${product}">${product}</a></b>`;
  }

  private generateBoolOrStr(input: boolean | string): string {
    return typeof input === 'boolean'
      ? `<b>${input ? '❌' : '✅'}</b>`
      : `<code>${input}</code>`;
  }

  private extendedSupport(input: undefined | (boolean | string)) {
    return input !== undefined
      ? `<b>extended support:</b> ${this.generateBoolOrStr(input)}`
      : '';
  }

}
