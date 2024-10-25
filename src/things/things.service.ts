import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ThingsService {

  constructor(private readonly prisma: PrismaService) {
    
  }
  
  create(createThingDto: Prisma.ThingCreateInput) {
    return this.prisma.thing.create({
      data: createThingDto
    });
  }

  findAll() {
    return this.prisma.thing.findMany({
      include: {
        category: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.thing.findUnique({
      include: {
        category: true
      },
      where: {
        id: id
      }
    });
  }

  update(id: number, updateThingDto: Prisma.ThingUpdateInput) {
    return this.prisma.thing.update({
      data: updateThingDto,
      where: {
        id: id
      } 
    })
  }

  remove(id: number) {
    return this.prisma.thing.delete({
      where: {
        id: id
      }
    });
  }
}
