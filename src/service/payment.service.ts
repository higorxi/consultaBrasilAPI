import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, VALUE_SCHEDULING} from 'src/configs/general.config';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  private readonly baseUrl = 'https://api.ezzebank.com/v2'; 

  constructor(private readonly httpService: HttpService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
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

  async createPIX({ nome, documento }: { nome: string; documento: string }): Promise<any> {

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
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YzViZmFjNy0yY2YyLTExZWYtYTM2NC00MjAxMGE2MDYwMGQiLCJpYXQiOjE3MTk1MDY4ODksImV4cCI6MTcxOTUwODY4OSwiZGF0YSI6eyJpZCI6IjdjNWJmYWM3LTJjZjItMTFlZi1hMzY0LTQyMDEwYTYwNjAwZCIsImNyZWF0ZWRBdCI6IjIwMjQtMDYtMTcgMTg6NDI6MjUiLCJhcHBfbmFtZSI6IlBvcnRhbCBDb25zdWx0YSBCcmFzIiwiYXBpX3ZlcnNpb24iOjIsInJlbW90ZUFkZHIiOiIyODA0OjI5MDQ6MTBlOjFhMzc6NWQyNTozN2M6NWRhNzplOGY0Iiwic3RhdHVzIjoiMSJ9fQ.KGgcmiKQRvZFI6G-qu6oPKdkfzMlRmxcV96bZ5OXE6s`, 
          'Content-Type': 'application/json'
        }
      }).toPromise();

      const {
        transactionId,
        external_id,
        entity,
        status,
        amount,
        calendar,
        debtor,
        additionalInformation,
        emvqrcps,
        base64image
      } = response.data;


      savedPayment.transactionId = transactionId;
      savedPayment.paymentStatus = status;
      savedPayment.additionalInformationValue = additionalInformation.value;

      return this.paymentRepository.save(savedPayment); 
    } catch (error) {
      console.error("error:", error)
      throw new Error(`Erro ao gerar QR Code PIX: ${error.message}`);
    }
  }

  async validateCPF(cpf: string): Promise<{ nome: string; dataDeNascimento: string }> {
    const url = `${this.baseUrl}/services/cpf?docNumber=${cpf}`;
  
    try {
      const response = await this.httpService.post(url, {}, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YzViZmFjNy0yY2YyLTExZWYtYTM2NC00MjAxMGE2MDYwMGQiLCJpYXQiOjE3MTk1MDY4ODksImV4cCI6MTcxOTUwODY4OSwiZGF0YSI6eyJpZCI6IjdjNWJmYWM3LTJjZjItMTFlZi1hMzY0LTQyMDEwYTYwNjAwZCIsImNyZWF0ZWRBdCI6IjIwMjQtMDYtMTcgMTg6NDI6MjUiLCJhcHBfbmFtZSI6IlBvcnRhbCBDb25zdWx0YSBCcmFzIiwiYXBpX3ZlcnNpb24iOjIsInJlbW90ZUFkZHIiOiIyODA0OjI5MDQ6MTBlOjFhMzc6NWQyNTozN2M6NWRhNzplOGY0Iiwic3RhdHVzIjoiMSJ9fQ.KGgcmiKQRvZFI6G-qu6oPKdkfzMlRmxcV96bZ5OXE6s`,
          'Content-Type': 'application/json'
        }
      }).toPromise();
  
      console.log("response", response);
  
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

}
