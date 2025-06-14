import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import generateAlias from '../utils/generate-alias';

@Injectable()
export class ShortUrlService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShortUrlDto) {
    const { originalUrl, alias, expiresAt } = dto;
    const short = alias || generateAlias();
    const existing = await this.prisma.shortUrl.findUnique({
      where: { shortUrl: short },
    });

    if (existing) {
      throw new BadRequestException('Alias already in use');
    }

    await this.prisma.shortUrl.create({
      data: {
        originalUrl,
        shortUrl: short,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
    });

    return {
      shortUrl: `${process.env.API_HOST ?? 'http://localhost:4200'}/${short}`,
    };
  }

  async getOriginalUrl(
    short: string,
    ipAddress: string,
  ): Promise<string | null> {
    const record = await this.prisma.shortUrl.findUnique({
      where: { shortUrl: short },
    });

    if (!record) return null;

    if (record.expiresAt && new Date() > record.expiresAt) return null;

    await this.prisma.shortUrl.update({
      where: { id: record.id },
      data: { clickCount: { increment: 1 } },
    });

    await this.prisma.clickAnalytics.create({
      data: {
        shortUrlId: record.id,
        ipAddress: ipAddress,
      },
    });

    return record.originalUrl;
  }

  async getInfo(short: string) {
    const record = await this.prisma.shortUrl.findUnique({
      where: { shortUrl: short },
      select: {
        originalUrl: true,
        createdAt: true,
        clickCount: true,
      },
    });

    if (!record) {
      throw new NotFoundException('Short URL not found');
    }

    return record;
  }

  async deleteByShortUrl(short: string) {
    try {
      await this.prisma.shortUrl.delete({
        where: { shortUrl: short },
      });

      return { message: 'Short URL deleted' };
    } catch {
      throw new NotFoundException('Short URL not found');
    }
  }

  /*
   * Analitics
   */

  async getAnalytics(short: string) {
    const record = await this.prisma.shortUrl.findUnique({
      where: { shortUrl: short },
      select: {
        clickCount: true,
        clicks: {
          orderBy: { clickedAt: 'desc' },
          take: 5,
          select: {
            ipAddress: true,
            clickedAt: true,
          },
        },
      },
    });

    if (!record) throw new NotFoundException('Short URL not found');

    return {
      clickCount: record.clickCount,
      recentClicks: record.clicks,
    };
  }
}
