import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  UsePipes,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dtos/create-cadidate.dto';
import { UpdateCandidateDto } from './dtos/update-candidate.dto';
import { CandidateQueryDto } from './dtos/candidate-query.dto';
import { CustomParseIntPipe } from 'src/common/pipes/parse-int.pipe';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() dto: CreateCandidateDto) {
    return this.candidateService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new CustomParseIntPipe())
  update(@Param('id') id: number, @Body() dto: UpdateCandidateDto) {
    return this.candidateService.update(dto, id);
  }

  @Delete(':id')
  @UsePipes(new CustomParseIntPipe())
  delete(@Param('id') id: number) {
    return this.candidateService.remove(id);
  }
  @Get(':id')
  @UsePipes(new CustomParseIntPipe())
  findOne(@Param('id') id: number) {
    return this.candidateService.findOne(id);
  }
  @Get()
  findMany(@Query() dto: CandidateQueryDto) {
    return this.candidateService.findMany(dto);
  }
}
