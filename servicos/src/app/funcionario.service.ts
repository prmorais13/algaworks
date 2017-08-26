export class FuncionarioService {

  ultimoId: number = 1;

  funcionarios = [{ id: 1, nome: 'Maria Fernanda'}];

  adicionar(nome: string) {
    const funcionario = {
      id: ++this.ultimoId,
      nome: nome
    };
    this.funcionarios.push(funcionario);
    console.log(JSON.stringify(this.funcionarios));
  }

  consultar() {
    return this.funcionarios;
  }
}

export class FuncionarioAbreviadoService extends FuncionarioService {
  adicionar(nome: string) {
    super.adicionar(nome.substr(0, 3) + '...');
  }
}
