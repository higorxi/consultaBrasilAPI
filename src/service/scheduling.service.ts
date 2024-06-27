import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheduling } from 'src/entity/scheduling.entity';
import { PersonalInfo } from 'src/entity/personalinfo.entity';
import { Preference } from 'src/entity/preferences.entity';
import { PaymentService } from './payment.service';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(Scheduling)
    private readonly schedulingRepository: Repository<Scheduling>,
    @InjectRepository(PersonalInfo)
    private readonly personalInfoRepository: Repository<PersonalInfo>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    private readonly paymentService: PaymentService,
  ) {}


  async teste(any: any) {
    const dadosUsuario = await this.paymentService.generateToken()

  }



  async create(
    createSchedulingDto: any,
  ): Promise<{ image: string; copiaCola: string }> {
    {
      const { pessoais, agendamento } = createSchedulingDto;

      const pixData: any = await this.paymentService.createPIX({
        nome: pessoais.nome_completo,
        documento: pessoais.cpf,
      });
      
      const personalInfo = new PersonalInfo();
      personalInfo.estado = pessoais.estado;
      personalInfo.cidade = pessoais.cidade;
      personalInfo.cpf = pessoais.cpf;
      personalInfo.estadoEmissorRg = pessoais.estado_emissor_rg;
      personalInfo.nomeCompleto = pessoais.nome_completo;
      personalInfo.dataNascimento = pessoais.data_nascimento;
      personalInfo.email = pessoais.email;
      personalInfo.telefone = pessoais.telefone;
      personalInfo.sexo = pessoais.sexo;
      personalInfo.viaRg = pessoais.via_rg;

      const savedPersonalInfo =
        await this.personalInfoRepository.save(personalInfo);

      const preference = new Preference();
      preference.postoAtendimento = agendamento.posto_atendimento;
      preference.diaPreferencial1 = agendamento.preferencia_1.dia;
      preference.turnoPreferencial1 = agendamento.preferencia_1.turno;
      preference.diaPreferencial2 = agendamento.preferencia_2.dia;
      preference.turnoPreferencial2 = agendamento.preferencia_2.turno;

      const savedPreference = await this.preferenceRepository.save(preference);


      const scheduling = new Scheduling();
      scheduling.personalInfo = savedPersonalInfo;
      scheduling.preference = savedPreference;
      scheduling.payment = pixData;
      await this.schedulingRepository.save(scheduling);

      return {
        image: pixData.base64image,
        copiaCola: pixData.emvqrcps,
      };
    }
  }

  async validateCPF(cpf: string): Promise<{ cpf: string; nome: string; dataDeNascimento: string }> {
    try {

      const dadosUsuario = await this.paymentService.validateCPF(cpf);
  
      return {
        cpf: cpf,
        nome: dadosUsuario.nome,
        dataDeNascimento: dadosUsuario.dataDeNascimento,
      };
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      throw new Error('Erro ao validar CPF');
    }
  }
  
}
