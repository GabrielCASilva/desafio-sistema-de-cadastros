import { PersonController } from '../src/controllers/person.controller';
import { Test, TestSuite } from 'xunit.ts';
import { PersonResponseDto } from '../src/dtos/person/response.dto';
import { PersonCreateDto } from '../src/dtos/person/create.dto';
import { PersonUpdateDto } from '../src/dtos/person/update.dto';

class MockPersonService {
  public findAllReturn: any = undefined;
  public findOneReturn: any = undefined;
  public createV1Return: any = undefined;
  public createV2Return: any = undefined;
  public updateReturn: any = undefined;
  public removeReturn: any = undefined;

  public calls = {
    findAll: 0,
    findOne: [] as any[],
    createV1: [] as any[],
    createV2: [] as any[],
    update: [] as any[],
    remove: [] as any[],
  };

  async findAll() {
    this.calls.findAll++;
    return this.findAllReturn;
  }

  async findOne(id: number) {
    this.calls.findOne.push(id);
    return this.findOneReturn;
  }

  async createV1(dto: PersonCreateDto) {
    this.calls.createV1.push(dto);
    return this.createV1Return;
  }

  async createV2(dto: any) {
    this.calls.createV2.push(dto);
    return this.createV2Return;
  }

  async update(id: number, dto: PersonUpdateDto) {
    this.calls.update.push({ id, dto });
    return this.updateReturn;
  }

  async remove(id: number) {
    this.calls.remove.push(id);
    return this.removeReturn;
  }
}

export default class PersonControllerTests extends TestSuite {
  private controller: PersonController;
  private service: MockPersonService;

  private createFakePerson(id = 1): PersonResponseDto {
    return {
      id,
      nome: `Pessoa ${id}`,
      data_nascimento: '1990-01-01',
      cpf: `000.000.000-${id.toString().padStart(2, '0')}`,
    };
  }

  @Test()
  async shouldReturnAllPersons() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    const persons = [this.createFakePerson(1), this.createFakePerson(2)];
    service.findAllReturn = persons;

    const result = await controller.findAll();

    this.assert.equal(JSON.stringify(result), JSON.stringify(persons));
    this.assert.equal(service.calls.findAll, 1);
  }

  @Test()
  async shouldReturnOnePerson() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    const person = this.createFakePerson(1);
    service.findOneReturn = person;

    const result = await controller.findOne(1);

    this.assert.equal(JSON.stringify(result), JSON.stringify(person));
    this.assert.equal(JSON.stringify(service.calls.findOne), JSON.stringify([1]));
  }

  @Test()
  async shouldCreatePersonV1() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    const dto: PersonCreateDto = {
      nome: 'Ana',
      data_nascimento: '1990-01-01',
      cpf: '123.456.789-00',
    } as any;

    const response = { id: 1, ...dto } as any;
    service.createV1Return = response;

    const result = await controller.create(dto);

    this.assert.equal(JSON.stringify(result), JSON.stringify(response));
    this.assert.equal(JSON.stringify(service.calls.createV1[0]), JSON.stringify(dto));
  }

  @Test()
  async shouldCreatePersonV2() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    const dto = {
      nome: 'Ana',
      data_nascimento: '1990-01-01',
      cpf: '123.456.789-00',
      endereco: 'Rua Exemplo, 123',
    };
    const response = { id: 1, ...dto };
    service.createV2Return = response;

    const result = await controller.createV2(dto as any);

    this.assert.equal(JSON.stringify(result), JSON.stringify(response));
    this.assert.equal(JSON.stringify(service.calls.createV2[0]), JSON.stringify(dto));
  }

  @Test()
  async shouldUpdatePerson() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    const dto: PersonUpdateDto = { nome: 'Ana Atualizada' } as any;
    const response = { ...this.createFakePerson(1), nome: 'Ana Atualizada' };
    service.updateReturn = response;

    const result = await controller.update(1, dto);

    this.assert.equal(JSON.stringify(result), JSON.stringify(response));
    this.assert.equal(JSON.stringify(service.calls.update[0]), JSON.stringify({ id: 1, dto }));
  }

  @Test()
  async shouldRemovePerson() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    service.removeReturn = undefined;

    const result = await controller.remove(1);

    this.assert.equal(result, undefined);
    this.assert.equal(JSON.stringify(service.calls.remove), JSON.stringify([1]));
  }

  @Test()
  async shouldThrowErrorWhenServiceFails() {
    const service = new MockPersonService();
    const controller = new PersonController(service as any);
    service.findOne = async () => {
      throw new Error('DB fail');
    };

    let errorThrown = false;
    try {
      await controller.findOne(999);
    } catch (err) {
      errorThrown = true;
      this.assert.equal((err as Error).message, 'DB fail');
    }

    this.assert.equal(errorThrown, true);
  }
}
