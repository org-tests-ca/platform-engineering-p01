import { Request, Response } from 'express';
import { HelloService } from '../services/HelloService';

export class HelloController {
  private service = new HelloService();

  saudacao(req: Request, res: Response): Response {
    const nome = req.params.nome || 'visitante';
    return res.json({ mensagem: this.service.saudacao(nome) });
  }
}
