import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, VALUE_SCHEDULING, SECRET_BOT_KEY} from 'src/configs/general.config';
import { Payment } from 'src/entity/payment.entity';
import { Scheduling } from 'src/entity/scheduling.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  private readonly baseUrl = 'https://api.ezzebank.com/v2'; 

  constructor(private readonly httpService: HttpService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Scheduling)
    private readonly schedulingRepository: Repository<Scheduling>,
  ) {}

  async generateToken(): Promise<string> {
    const clientId = CLIENT_ID; 
    const clientSecret = CLIENT_SECRET; 

    const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

    const url = `${this.baseUrl}/oauth/token`;

    try {
      const response = await axios.post(
        url,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const accessToken = response.data.access_token;

      if (!accessToken) {
        throw new Error('Token de acesso não recebido');
      }

      return accessToken;
    } catch (error) {
      throw new Error(`Erro ao obter token de acesso: ${error.message}`);
    }
  }

  async createPIX({ nome, documento }: { nome: string; documento: string }): Promise<{ image: string; copiaCola: string; paymentSave: Payment }> {

    const newPayment = new Payment();
    newPayment.amount = VALUE_SCHEDULING;
    newPayment.transactionId = '';
    newPayment.additionalInformationValue = '';
    newPayment.debtorName = nome;
    newPayment.debtorDocument = documento;
    newPayment.paymentStatus = 'AUSENTE'
    const savedPayment = await this.paymentRepository.save(newPayment);

    const accessToken = await this.generateToken();
    const url = `${this.baseUrl}/pix/qrcode`;

    const payload = {
      amount: Number(VALUE_SCHEDULING), 
      payerQuestion: 'Pgto Consulta Brasil ref. agend. Poupa Tempo',
      external_id: newPayment.id,
      payer: {
        name: nome, 
        document: documento 
      }
    };

    try {
      const response = await this.httpService.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json'
        }
      }).toPromise();

      const {
        transactionId,
        status,
        additionalInformation,
        emvqrcps,
        base64image
      } = response.data;

    
      savedPayment.transactionId = transactionId;
      savedPayment.paymentStatus = status;
      savedPayment.additionalInformationValue = additionalInformation.value;

      const paymentSave = await this.paymentRepository.save(savedPayment); 

      return {
        image: base64image,
        copiaCola: emvqrcps,
        paymentSave: paymentSave
      };
    } catch (error) {
      console.error("error:", error)
      throw new Error(`Erro ao gerar QR Code PIX: ${error.message}`);
    }
  }

  async validateCPF(cpf: string): Promise<{ nome: string; dataDeNascimento: string }> {
    const url = `${this.baseUrl}/services/cpf?docNumber=${cpf}`;

    const accessToken = await this.generateToken();
    try {
       const response = await this.httpService.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).toPromise();
  
      const dataDeNascimento = new Date(response.data.BirthDate).toISOString().split('T')[0];
  
      return {
        nome: response.data.name,
        dataDeNascimento: dataDeNascimento
      };
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      throw new Error('Erro ao validar CPF');
    }
  }


  async processWebhook(responseBody: any): Promise<any> {
    try {
 
      const externalId = responseBody.external_id;

      const payment = await this.paymentRepository.findOneBy({id: externalId});

      if (!payment) {
        throw new Error('Payment not found');
      }

      payment.paymentStatus = responseBody.transactionType

      await this.paymentRepository.save(payment);

      if (responseBody.transactionType === 'RECEIVEPIX') {
        this.activateTheBot(responseBody);
      }

      return {
        status: 200,
        message: 'Webhook processed successfully',
      };
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return {
        status: 200,
        message: 'Webhook processed successfully',
      };
      throw new Error('Erro ao processar webhook');
    }
  }


  async activateTheBot(responseWebhook: any): Promise<string> {
    const botSecret = SECRET_BOT_KEY; 

    const authHeader = `Bearer ${botSecret}`;

    const url = 'http:localhost:3001/scheduling/startScheduling';

    const infosPayment = await this.paymentRepository.findOneBy({id: responseWebhook.external_id});
    
    const userInfos = await this.schedulingRepository.findOne({
      where: {
        payment: {
          id: infosPayment.id,
        },
      },
      relations: ['preference', 'personalInfo', 'payment'],
    });

    console.log("userInfos", userInfos)

    try {
      const response = await axios.post(
        url,
        userInfos,
        {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return;
    } catch (error) {
      throw new Error(`Erro ao enviar informações ao bot: ${error.message}`);
    }
  }

}
