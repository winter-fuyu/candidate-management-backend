import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dtos/create-cadidate.dto';
import { UpdateCandidateDto } from './dtos/update-candidate.dto';
import { CandidateQueryDto } from './dtos/candidate-query.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async create(dto: CreateCandidateDto) {
    let existingCandidate = await this.getExistingCandidateByEmail(dto.email);
    if (existingCandidate)
      throw new BadRequestException('Email already exists!');
    let candidate = new Candidate();
    Object.assign(candidate, dto);
    return await this.candidateRepository.save(candidate);
  }

  async update(dto: UpdateCandidateDto, id: number) {
    let candidate = await this.candidateRepository.findOne({
      where: { id: id },
    });
    if (!candidate) throw new BadRequestException('Candidate not found');
    let existingCandidate = await this.getExistingCandidateByEmail(dto.email, [
      candidate.id,
    ]);
    if (existingCandidate)
      throw new BadRequestException('Email already exists!');
    Object.assign(candidate, dto);
    if (!dto.linkedinUrl) candidate.linkedinUrl = null;
    if (!dto.githubUrl) candidate.githubUrl = null;
    if (!dto.phoneNumber) candidate.phoneNumber = null;
    return await this.candidateRepository.save(candidate);
  }

  async findMany(dto: CandidateQueryDto) {
    let query = this.candidateRepository.createQueryBuilder('candidate');
    if (dto.ids) query.andWhere('candidate.id IN (:...ids)', { ids: dto.ids });
    if (dto.value) {
      const valuePattern = `%${dto.value}%`;
      query.andWhere(
        'candidate.email ILIKE :valuePattern OR candidate.firstName ILIKE :valuePattern OR candidate.lastName ILIKE :valuePattern OR candidate.comment ILIKE :valuePattern OR candidate.phoneNumber ILIKE :valuePattern',
        {
          valuePattern,
        },
      );
    }

    let total = await query.getCount();
    let results = await query
      .skip(dto.skip ?? 0)
      .take(dto.count ?? 10)
      .orderBy('candidate.id', 'DESC')
      .getMany();
    return { total, results };
  }

  async findOne(id: number) {
    let candidate = await this.candidateRepository.findOne({
      where: { id: id },
    });
    if (!candidate) throw new BadRequestException('Candidate not found');
    return candidate;
  }
  async getExistingCandidateByEmail(email: string, excludeIds: number[] = []) {
    return await this.candidateRepository.findOne({
      where: {
        email: email,
        id: Not(In(excludeIds)),
      },
    });
  }
  async remove(id: number) {
    let candidate = await this.candidateRepository.findOne({
      where: { id: id },
    });
    if (!candidate) throw new BadRequestException('Candidate not found');
    return await this.candidateRepository.delete({ id: id });
  }
}
