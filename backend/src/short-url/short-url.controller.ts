import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  HttpCode,
  Get,
  NotFoundException,
  Param,
  Res,
  Delete,
  Req,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { Request, Response } from 'express';

@Controller()
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('shorten')
  create(@Body() dto: CreateShortUrlDto) {
    return this.shortUrlService.create(dto);
  }

  @Get(':shortUrl')
  async redirect(
    @Param('shortUrl') short: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const url = await this.shortUrlService.getOriginalUrl(short, req.ip);
    if (!url) throw new NotFoundException('Short URL not found');

    return res.redirect(url);
  }

  @Get('info/:shortUrl')
  async getInfo(@Param('shortUrl') short: string) {
    return this.shortUrlService.getInfo(short);
  }

  @Delete('delete/:shortUrl')
  async delete(@Param('shortUrl') short: string) {
    return this.shortUrlService.deleteByShortUrl(short);
  }

  /*
   * Analitics
   */

  @Get('analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') short: string) {
    return this.shortUrlService.getAnalytics(short);
  }
}
