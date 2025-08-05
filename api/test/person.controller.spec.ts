import { Test, TestSuite } from 'xunit.ts';
import { PersonCreateV2Dto } from 'src/dtos/person/create-v2.dto';
import { PersonController } from '../src/controllers/person.controller';
import { ValidationPipe } from '@nestjs/common';

export default class PersonControllerTests extends TestSuite {
  @Test()
  async shouldCreatePersonV2Successfully() {
    const mockService = new MockPersonService();
    const controller = new PersonController(mockService as any);

    const validPayload = {
      nome: 'Ana',
      sexo: 'FEMININO',
      email: 'ana@example.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-00',
      celular: '+55 11 99999-8888',
    };

    const mockCreatedPerson = { id: 1, ...validPayload };
    mockService.returnValues.createV2 = mockCreatedPerson;

    const validatedDto = await new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }).transform(validPayload, { type: 'body', metatype: PersonCreateV2Dto });

    const result = await controller.createV2(validatedDto);

    this.assert.equal(JSON.stringify(result), JSON.stringify(mockCreatedPerson));
    this.assert.equal(mockService.calls.createV2.length, 1);
    this.assert.equal(JSON.stringify(mockService.calls.createV2[0]), JSON.stringify(validatedDto));
  }

  @Test()
  async shouldThrowIfEnderecoMissingInV2() {
    const invalidPayload = {
      nome: 'Ana',
      sexo: 'FEMININO',
      email: 'ana@example.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '123.456.789-00',
      celular: '+55 11 99999-8888',
    };

    let errorThrown = false;
    try {
      await new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }).transform(invalidPayload, { type: 'body', metatype: PersonCreateV2Dto });
    } catch (err) {
      errorThrown = true;
      const response = typeof err.getResponse === 'function' ? err.getResponse() : err.message;
      let messages: string[] = [];

      if (typeof response === 'string') {
        messages = [response];
      } else if (Array.isArray(response.message)) {
        messages = response.message;
      } else if (typeof response.message === 'string') {
        messages = [response.message];
      }

      const found = messages.some((msg) => msg.toLowerCase().includes('endereco'));
      this.assert.equal(found, true, 'Erro deve mencionar que o endereco é obrigatório');
    }
    this.assert.equal(errorThrown, true);
  }
}

export class MockPersonService {
  public calls = {
    createV1: [] as any[],
    createV2: [] as any[],
    findAll: 0,
    findOne: [] as any[],
    update: [] as any[],
    remove: [] as any[],
  };

  public returnValues = {
    createV1: null as any,
    createV2: null as any,
    findAll: null as any,
    findOne: null as any,
    update: null as any,
    remove: null as any,
  };

  async createV1(dto: any) {
    this.calls.createV1.push(dto);
    if (this.returnValues.createV1 instanceof Error) {
      throw this.returnValues.createV1;
    }
    return this.returnValues.createV1;
  }

  async createV2(dto: any) {
    this.calls.createV2.push(dto);
    if (this.returnValues.createV2 instanceof Error) {
      throw this.returnValues.createV2;
    }
    return this.returnValues.createV2;
  }

  async findAll() {
    this.calls.findAll++;
    if (this.returnValues.findAll instanceof Error) {
      throw this.returnValues.findAll;
    }
    return this.returnValues.findAll;
  }

  async findOne(id: number) {
    this.calls.findOne.push(id);
    if (this.returnValues.findOne instanceof Error) {
      throw this.returnValues.findOne;
    }
    return this.returnValues.findOne;
  }

  async update(id: number, dto: any) {
    this.calls.update.push({ id, dto });
    if (this.returnValues.update instanceof Error) {
      throw this.returnValues.update;
    }
    return this.returnValues.update;
  }

  async remove(id: number) {
    this.calls.remove.push(id);
    if (this.returnValues.remove instanceof Error) {
      throw this.returnValues.remove;
    }
    return this.returnValues.remove;
  }
}
